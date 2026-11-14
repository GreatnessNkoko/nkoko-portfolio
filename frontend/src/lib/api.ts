import type { ContactMessageInput, ContactResponse } from "@portfolio/shared";

/**
 * In production the website calls its own /api path, which Vercel forwards
 * to the Render backend (see vercel.json). VITE_API_URL can point
 * straight at the backend instead.
 */
const API_BASE = ((import.meta.env.VITE_API_URL as string | undefined) ?? "").replace(/\/+$/, "");

/** Render's free plan sleeps when idle: start waking it as soon as someone visits. */
export function wakeApi(): void {
  fetch(`${API_BASE}/api/healthz`, { cache: "no-store" }).catch(() => {});
}

export async function sendContactMessage(input: ContactMessageInput): Promise<ContactResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(90_000),
    });
    const body = (await res.json().catch(() => null)) as ContactResponse | null;
    if (body && typeof body.ok === "boolean") return body;
    return { ok: false, error: `The server could not be reached (error ${res.status}).` };
  } catch {
    return { ok: false, error: "The server could not be reached. Check your connection and try again." };
  }
}
