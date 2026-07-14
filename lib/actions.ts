"use server";

import { headers } from "next/headers";
import {
  rideRequestSchema,
  toFieldErrors,
  type FieldErrors,
} from "@/lib/booking";
import { sendBookingEmail } from "@/lib/email";
import { site } from "@/lib/site";

export type SendRideRequestResult =
  | { ok: true }
  | { ok: false; fieldErrors?: FieldErrors; fallback?: boolean; message?: string };

const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Per-instance in-memory limiter — enough to blunt casual abuse on a single
// server; swap for a shared store if the site is ever deployed multi-instance.
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

export async function sendRideRequest(input: unknown): Promise<SendRideRequestResult> {
  // Honeypot — report success so bots learn nothing, send nothing.
  if (
    input !== null &&
    typeof input === "object" &&
    "company" in input &&
    (input as { company?: unknown }).company
  ) {
    return { ok: true };
  }

  const parsed = rideRequestSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const forwarded = (await headers()).get("x-forwarded-for");
  const ip = (forwarded ?? "unknown").split(",")[0].trim();
  if (isRateLimited(ip)) {
    return {
      ok: false,
      message: `Too many requests from this connection. Please call ${site.phone} instead.`,
    };
  }

  try {
    await sendBookingEmail(parsed.data);
    return { ok: true };
  } catch (error) {
    console.error("[booking] email send failed:", error);
    return { ok: false, fallback: true, message: "Our booking inbox is briefly unreachable." };
  }
}
