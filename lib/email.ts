import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/lib/site";
import {
  buildRideRequestLines,
  buildRideRequestSubject,
  type RideRequest,
} from "@/lib/booking";

type Transport = { transporter: Transporter; isTestInbox: boolean };

let cached: Transport | null = null;

async function getTransport(): Promise<Transport> {
  if (cached) return cached;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    const port = Number(SMTP_PORT ?? 465);
    cached = {
      transporter: nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      }),
      isTestInbox: false,
    };
    return cached;
  }

  if (process.env.NODE_ENV !== "production") {
    // No SMTP configured in development: use nodemailer's Ethereal sandbox.
    // Messages are captured at ethereal.email and never delivered.
    const account = await nodemailer.createTestAccount();
    console.warn(
      "[booking] SMTP_* env vars not set — using an Ethereal test inbox. Emails are captured, not delivered."
    );
    cached = {
      transporter: nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: { user: account.user, pass: account.pass },
      }),
      isTestInbox: true,
    };
    return cached;
  }

  throw new Error(
    "SMTP is not configured — set SMTP_HOST, SMTP_USER and SMTP_PASS (see .env.example)."
  );
}

/** Send a ride request to the dispatch inbox. Throws if sending fails. */
export async function sendBookingEmail(data: RideRequest): Promise<void> {
  const { transporter, isTestInbox } = await getTransport();

  const to = process.env.BOOKING_TO_EMAIL ?? site.email;
  const from = process.env.BOOKING_FROM_EMAIL ?? process.env.SMTP_USER ?? site.email;

  const info = await transporter.sendMail({
    from: `"${site.name} Website" <${from}>`,
    to,
    replyTo: `"${data.name}" <${data.email}>`,
    subject: buildRideRequestSubject(data),
    text: buildRideRequestLines(data).join("\n"),
  });

  if (isTestInbox) {
    console.warn("[booking] Ethereal preview:", nodemailer.getTestMessageUrl(info));
  }
}
