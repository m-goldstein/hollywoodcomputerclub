import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const defaultSegmentId = "67fa2818-ecbe-491c-a555-d70d1aacdfc1";

function splitName(name: string) {
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

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
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
    properties: {
      source: "website_landing_page",
    },
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

  return NextResponse.json({
    message: "You're on the list. Watch for meeting notes and club updates.",
  });
}
