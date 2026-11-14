import type { ContactMessage } from "@portfolio/shared";
import type { Config } from "./config";

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Sends the "new message from your website" notification through Resend's
 * HTTPS API. (Render's free plan blocks outgoing SMTP, so plain SMTP/Gmail
 * would not work there.) Replying to the email replies to the visitor.
 */
export async function sendContactNotification(
  config: Config,
  msg: ContactMessage,
): Promise<{ sent: true } | { sent: false; reason: string }> {
  if (!config.RESEND_API_KEY) {
    return { sent: false, reason: "RESEND_API_KEY is not set" };
  }

  const subject = msg.subject ? `Portfolio: ${msg.subject}` : `Portfolio: new message from ${msg.name}`;
  const text = [
    `Name: ${msg.name}`,
    `Email: ${msg.email}`,
    msg.subject ? `Subject: ${msg.subject}` : null,
    "",
    msg.message,
    "",
    "Reply to this email to answer them directly.",
  ]
    .filter((l) => l !== null)
    .join("\n");

  const html = `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;color:#1c1c1a">
    <p style="font-size:13px;color:#6b6b66;margin:0 0 16px">New message from your portfolio website</p>
    <table style="font-size:15px;border-collapse:collapse;margin-bottom:16px">
      <tr><td style="padding:2px 12px 2px 0;color:#6b6b66">Name</td><td><strong>${escapeHtml(msg.name)}</strong></td></tr>
      <tr><td style="padding:2px 12px 2px 0;color:#6b6b66">Email</td><td><a href="mailto:${escapeHtml(msg.email)}">${escapeHtml(msg.email)}</a></td></tr>
      ${msg.subject ? `<tr><td style="padding:2px 12px 2px 0;color:#6b6b66">Subject</td><td>${escapeHtml(msg.subject)}</td></tr>` : ""}
    </table>
    <div style="font-size:15px;line-height:1.6;white-space:pre-wrap;border-left:3px solid #2f6b4f;padding:4px 0 4px 14px">${escapeHtml(msg.message)}</div>
    <p style="font-size:13px;color:#6b6b66;margin-top:24px">Reply to this email to answer ${escapeHtml(msg.name)} directly.</p>
  </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.CONTACT_FROM_EMAIL,
        to: [config.CONTACT_TO_EMAIL],
        reply_to: msg.email,
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { sent: false, reason: `Resend responded ${res.status}: ${body.slice(0, 300)}` };
    }
    return { sent: true };
  } catch (err) {
    return { sent: false, reason: err instanceof Error ? err.message : String(err) };
  }
}
