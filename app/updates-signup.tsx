"use client";

import { FormEvent, useState } from "react";

type SignupState = "idle" | "submitting" | "success" | "error";

export function UpdatesSignup() {
  const [state, setState] = useState<SignupState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setState("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          name: formData.get("name"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Signup failed.");
      }

      form.reset();
      setState("success");
      setMessage(
        payload.message ??
          "You're on the list. Watch for meeting notes and club updates.",
      );
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
      );
    }
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input
          autoComplete="name"
          name="name"
          placeholder="Optional"
          type="text"
        />
      </label>
      <label>
        <span>Email</span>
        <input
          autoComplete="email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </label>
      <button disabled={state === "submitting"} type="submit">
        {state === "submitting" ? "Adding..." : "Get Updates"}
      </button>
      <p className="signup-note">
        Opt in for meeting dates, venue notes, show-and-tell calls,
        restoration nights, and occasional club announcements. No spam, and you
        can unsubscribe from any email. Email data collected here is never
        shared or sold with third-party data brokers.
      </p>
      <p
        aria-live="polite"
        className={`signup-message ${state === "error" ? "is-error" : ""}`}
      >
        {message}
      </p>
    </form>
  );
}
