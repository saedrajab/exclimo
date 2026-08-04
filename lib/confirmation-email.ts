import { site } from "@/lib/site";
import type { RideRequest } from "@/lib/booking";

/**
 * Content for the confirmation copy sent to the person who submitted the
 * booking form. The dispatch-inbox body lives in lib/booking.ts; this module
 * is customer-facing, so it carries the brand voice and the HTML layout.
 */

/** Escape user input before interpolating it into the HTML body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * "2026-08-12" to "Wednesday, August 12, 2026". Formatted in UTC so the
 * calendar date the visitor picked never shifts with the server timezone.
 */
function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

/** "09:30" to "9:30 AM". */
function formatTime(value: string): string {
  const [hours, minutes] = value.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return value;
  const period = hours < 12 ? "AM" : "PM";
  const hour = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour}:${String(minutes).padStart(2, "0")} ${period}`;
}

/** Trip recap as label/value pairs, shared by the text and HTML bodies. */
function recapRows(data: RideRequest): [string, string][] {
  const stops = data.stops.filter(Boolean);
  const rows: [string, string][] = [
    ["Pickup", `${formatDate(data.date)} at ${formatTime(data.time)}`],
    ["From", data.pickup],
  ];
  stops.forEach((stop, i) => {
    rows.push([stops.length > 1 ? `Stop ${i + 1}` : "Stop", stop]);
  });
  rows.push(["To", data.dropoff]);
  rows.push(["Vehicle", data.vehicleType]);
  rows.push(["Passengers", String(data.passengers)]);
  if (data.kids > 0) rows.push(["Children", String(data.kids)]);
  if (data.bags > 0) rows.push(["Bags", String(data.bags)]);
  if (data.airline) rows.push(["Airline", data.airline]);
  if (data.flight) rows.push(["Flight", data.flight]);
  if (data.notes) rows.push(["Notes", data.notes]);
  return rows;
}

const INTRO =
  "Our staff is reviewing your request and will reply with a personal, all-inclusive quote, usually within the hour. Nothing is charged until your trip is confirmed.";

const PREHEADER = "We have your trip details. Your personal quote is on its way.";

export function buildConfirmationSubject(data: RideRequest): string {
  const firstName = data.name.split(" ")[0];
  return `We received your ride request, ${firstName}`;
}

export function buildConfirmationText(data: RideRequest): string {
  return [
    `Thank you for choosing ${site.name}.`,
    ``,
    INTRO,
    ``,
    `YOUR REQUEST`,
    ...recapRows(data).map(([rowLabel, rowValue]) => `${rowLabel}: ${rowValue}`),
    ``,
    `Need to reach us sooner?`,
    `Call ${site.phone} or ${site.phoneAlt}, any time of day.`,
    site.email,
    ``,
    site.legalName,
    site.address.full,
    `Serving ${site.region}`,
  ].join("\n");
}

/**
 * Table-based layout with inline styles: the only markup that renders
 * predictably across Outlook, Gmail and Apple Mail. Bebas Neue is not
 * available to mail clients, so the display type falls back to the same
 * condensed stack declared in app/globals.css.
 */
export function buildConfirmationHtml(data: RideRequest): string {
  const labelStyle =
    "font:400 11px/1.6 Helvetica,Arial,sans-serif;letter-spacing:0.18em;text-transform:uppercase;color:#58585a;";
  const valueStyle = "font:400 15px/1.6 Helvetica,Arial,sans-serif;color:#111111;";

  // Label stacked above value, mirroring ContactRow in the booking section.
  // A two-column table would force long addresses into a narrow column on
  // phones; stacking reads the same at every width.
  const rows = recapRows(data)
    .map(
      ([rowLabel, rowValue]) => `
                    <tr>
                      <td style="padding:0 0 16px;">
                        <p style="margin:0 0 3px;${labelStyle}">${escapeHtml(rowLabel)}</p>
                        <p style="margin:0;${valueStyle}">${escapeHtml(rowValue)}</p>
                      </td>
                    </tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${escapeHtml(buildConfirmationSubject(data))}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;">
<div style="display:none;font-size:1px;color:#f5f5f5;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${PREHEADER}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f5;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;">
        <tr>
          <td style="padding:36px 40px 0;">
            <p style="margin:0;font:700 18px/1 'Arial Narrow',Arial,sans-serif;letter-spacing:0.34em;text-transform:uppercase;color:#111111;">${site.name}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 40px 0;">
            <h1 style="margin:0;font:400 52px/0.92 'Arial Narrow',Impact,sans-serif;text-transform:uppercase;color:#111111;">Request<br />received.</h1>
            <p style="margin:20px 0 0;font:400 16px/1.65 Helvetica,Arial,sans-serif;color:#58585a;">Thank you for choosing ${site.name}, ${escapeHtml(data.name.split(" ")[0])}. ${INTRO}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f5f5;">
              <tr>
                <td style="padding:28px 28px 16px;">
                  <p style="margin:0 0 20px;${labelStyle}">Your request</p>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="background-color:#111111;">
                  <a href="${site.phoneHref}" style="display:inline-block;padding:16px 32px;font:500 14px/1 Helvetica,Arial,sans-serif;letter-spacing:0.06em;color:#ffffff;text-decoration:none;">Call ${site.phone}</a>
                </td>
              </tr>
            </table>
            <p style="margin:18px 0 0;font:400 14px/1.6 Helvetica,Arial,sans-serif;color:#58585a;">Prefer to write? Reply to this email or reach us at <a href="${site.emailHref}" style="color:#111111;text-decoration:underline;">${site.email}</a>. Our second line is <a href="${site.phoneAltHref}" style="color:#111111;text-decoration:underline;">${site.phoneAlt}</a>.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px 40px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="border-top:1px solid #e5e5e5;padding-top:24px;">
                  <p style="margin:0;font:400 12px/1.7 Helvetica,Arial,sans-serif;color:#9e9ea0;">${site.legalName}<br />${site.address.full}<br />Available around the clock, serving ${escapeHtml(site.region)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
