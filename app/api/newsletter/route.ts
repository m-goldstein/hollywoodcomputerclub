import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const defaultSegmentId = "67fa2818-ecbe-491c-a555-d70d1aacdfc1";
const defaultFromEmail =
  "Hollywood Computer Club <hello@hollywoodcomputerclub.com>";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

function splitName(name: string): { firstName?: string; lastName?: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return {};
  }

  const [firstName, ...lastNameParts] = parts;

  return {
    firstName,
    ...(lastNameParts.length > 0
      ? { lastName: lastNameParts.join(" ") }
      : {}),
  };
}

function createWelcomeEmail(name: string) {
  const firstName = splitName(name).firstName;
  const greeting = firstName ? `Hello ${firstName},` : "Hello,";
  const escapedGreeting = escapeHtml(greeting);

  return {
    subject: "Welcome to Hollywood Computer Club",
    text: `${greeting}

TRANSMISSION RECEIVED.

You are on the Hollywood Computer Club update list.

Stay peeled for concise dispatches about upcoming meetups, demo calls, repair nights, venue notes, and any date, room, or setup changes before the next gathering.

Bring curiosity. Bring a machine if you have one. Bring a question if you do not.

Hollywood Computer Club
Hollywood, Florida
`,
    html: `<!doctype html>
<html>
  <body style="margin:0;background:#f7f7ef;color:#111;font-family:'Courier New',Courier,monospace;font-size:16px;line-height:1.5;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f7ef;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#fffff7;border:1px solid #111;">
            <tr>
              <td style="padding:18px;">
                <p style="margin:0 0 14px;font-weight:700;">HOLLYWOOD COMPUTER CLUB</p>
                <p style="margin:0 0 18px;color:#8a2600;font-weight:700;">TRANSMISSION RECEIVED</p>
                <p style="margin:0 0 14px;">${escapedGreeting}</p>
                <p style="margin:0 0 14px;">You are on the Hollywood Computer Club update list.</p>
                <p style="margin:0 0 14px;">Stay peeled for concise dispatches about upcoming meetups, demo calls, repair nights, venue notes, and any date, room, or setup changes before the next gathering.</p>
                <p style="margin:0 0 18px;">Bring curiosity. Bring a machine if you have one. Bring a question if you do not.</p>
                <p style="margin:0;border-top:1px dashed #111;padding-top:12px;color:#555;">Hollywood Computer Club // Hollywood, Florida</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? defaultFromEmail;
  const segmentId = process.env.RESEND_SEGMENT_ID ?? defaultSegmentId;
  const topicId = process.env.RESEND_TOPIC_ID;

  if (!apiKey) {
    return NextResponse.json(
      { message: "Newsletter signup is not configured yet." },
      { status: 503 },
    );
  }

  if (!segmentId && !topicId) {
    return NextResponse.json(
      { message: "Newsletter destination is not configured yet." },
      { status: 503 },
    );
  }

  let body: { email?: unknown; name?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.contacts.create({
    email,
    unsubscribed: false,
    ...(name ? splitName(name) : {}),
    ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
    ...(topicId ? { topics: [{ id: topicId, subscription: "opt_in" }] } : {}),
  });

  if (error) {
    const duplicate =
      "statusCode" in error &&
      error.statusCode === 409;

    if (!duplicate) {
      return NextResponse.json(
        { message: "We could not add you right now. Please try again later." },
        { status: 502 },
      );
    }
  }

  const welcomeEmail = createWelcomeEmail(name);
  const { error: emailError } = await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: welcomeEmail.subject,
    text: welcomeEmail.text,
    html: welcomeEmail.html,
  });

  if (emailError) {
    console.error("Failed to send newsletter welcome email", {
      name: emailError.name,
      message: emailError.message,
      statusCode:
        "statusCode" in emailError ? emailError.statusCode : undefined,
    });
  }

  return NextResponse.json({
    message: "You're on the list. Watch for meeting notes and club updates.",
  });
}
