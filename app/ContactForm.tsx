"use client";

import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

const contactEndpoint = "https://formsubmit.co/ajax/chiragaparadh@gmail.com";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
  }, []);

  const resetStatusLater = () => {
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => setStatus("idle"), 6000);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const honey = String(data.get("_honey") ?? "").trim();

    if (honey) return;

    setStatus("sending");

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _replyto: email,
          _subject: `Portfolio message from ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!response.ok) throw new Error("Message delivery failed");

      setStatus("success");
      form.reset();
      window.dispatchEvent(new CustomEvent("contact:sent", { detail: { message: "Message away!" } }));
      resetStatusLater();
    } catch {
      setStatus("error");
      resetStatusLater();
    }
  };

  const isSending = status === "sending";

  return (
    <div className={`contact-form-shell is-${status}`}>
      {(status === "sending" || status === "success") && (
        <span className="sent-plane" aria-hidden="true">➤</span>
      )}
      <div className="contact-form-heading">
        <span aria-hidden="true">✦</span>
        <div>
          <p>Send a note</p>
          <strong>I read every message.</strong>
        </div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-row">
          <label>
            <span>Your name</span>
            <input name="name" type="text" autoComplete="name" placeholder="Jane Doe" required disabled={isSending} />
          </label>
          <label>
            <span>Your email</span>
            <input name="email" type="email" autoComplete="email" placeholder="jane@example.com" required disabled={isSending} />
          </label>
        </div>
        <label>
          <span>Your message</span>
          <textarea name="message" rows={5} placeholder="Hi Chirag, I’d like to talk about…" required disabled={isSending} />
        </label>
        <label className="form-honey" aria-hidden="true">
          Leave this empty
          <input name="_honey" type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <div className="contact-form-footer">
          <p className={`contact-form-status is-${status}`} role="status" aria-live="polite">
            {status === "sending" && "Folding the plane…"}
            {status === "success" && "Message sent. I’ll get back to you soon."}
            {status === "error" && "The plane got lost. Please try once more."}
            {status === "idle" && "Your note goes straight to my inbox."}
          </p>
          <button className="button button--dark contact-submit" type="submit" disabled={isSending}>
            {isSending ? "Sending" : "Send message"}
            <span className="paper-plane" aria-hidden="true">➤</span>
          </button>
        </div>
      </form>
    </div>
  );
}
