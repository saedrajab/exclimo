import { z } from "zod";
import { site } from "@/lib/site";

export const rideRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Please keep names under 100 characters."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a phone number.")
    .max(25, "That phone number looks too long.")
    .regex(/^\+?[\d\s().-]+$/, "Phone numbers can only contain digits, spaces and + ( ) - ."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email so we can send your quote.")
    .max(200, "That email address looks too long.")
    .pipe(z.email("That email address doesn't look right.")),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a pickup date."),
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Please choose a pickup time."),
  pickup: z
    .string()
    .trim()
    .min(3, "Please enter a pickup location.")
    .max(300, "Please keep the pickup location under 300 characters."),
  mapLink: z
    .string()
    .trim()
    .max(500, "Please keep the map link under 500 characters.")
    .refine(
      (v) => v === "" || /^https?:\/\/\S+\.\S+/i.test(v),
      "That link doesn't look right. Paste the share link from your maps app."
    ),
  dropoff: z
    .string()
    .trim()
    .min(3, "Please enter a drop-off location.")
    .max(300, "Please keep the drop-off location under 300 characters."),
  passengers: z.coerce
    .number("How many passengers are riding?")
    .int()
    .min(1, "At least one passenger is required.")
    .max(14, "For groups over 14, please call us."),
  kids: z.coerce
    .number("How many children are riding?")
    .int()
    .min(0)
    .max(10, "For that many children, please call us."),
  bags: z.coerce
    .number("How many bags are you bringing?")
    .int()
    .min(0)
    .max(20, "For that much luggage, please call us."),
  airline: z.string().trim().max(80, "Please keep the airline under 80 characters."),
  flight: z.string().trim().max(20, "Flight numbers are short, like UA 482."),
  notes: z.string().trim().max(1000, "Please keep notes under 1,000 characters."),
  stops: z
    .array(z.string().trim().max(300, "Please keep each stop under 300 characters."))
    .max(5, "For more than 5 stops, please call us."),
});

export type RideRequest = z.infer<typeof rideRequestSchema>;
export type RideRequestInput = z.input<typeof rideRequestSchema>;

/** Field order used to focus the first invalid input after a failed submit. */
export const fieldOrder = [
  "name",
  "phone",
  "email",
  "date",
  "time",
  "pickup",
  "mapLink",
  "stops",
  "dropoff",
  "passengers",
  "kids",
  "bags",
  "airline",
  "flight",
  "notes",
] as const;

export type FieldErrors = Partial<Record<(typeof fieldOrder)[number], string>>;

/** Map a zod error to one message per top-level field. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as (typeof fieldOrder)[number] | undefined;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export function buildRideRequestSubject(data: RideRequest): string {
  return `Ride request: ${data.name}, ${data.date}`;
}

/** Plain-text body shared by the server email and the mailto fallback. */
export function buildRideRequestLines(data: RideRequest): string[] {
  return [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    ``,
    `Pickup date: ${data.date}`,
    `Pickup time: ${data.time}`,
    `Pickup location: ${data.pickup}`,
    ...(data.mapLink ? [`Pickup map link: ${data.mapLink}`] : []),
    ...data.stops.filter(Boolean).map((stop, i) => `Stop ${i + 1}: ${stop}`),
    `Drop-off location: ${data.dropoff}`,
    ``,
    `Passengers: ${data.passengers}`,
    `Children: ${data.kids}`,
    `Bags: ${data.bags}`,
    data.airline ? `Airline: ${data.airline}` : "",
    data.flight ? `Flight number: ${data.flight}` : "",
    data.notes ? `Notes: ${data.notes}` : "",
  ].filter((line, i, arr) => line !== "" || arr[i - 1] !== "");
}

/**
 * Build the mailto: URL that opens the visitor's own email app with the
 * request pre-filled. Used as a fallback when server-side sending is
 * unavailable; nothing is sent until the visitor presses send.
 */
export function buildRideRequestMailto(data: RideRequest): string {
  const subject = encodeURIComponent(buildRideRequestSubject(data));
  const body = encodeURIComponent(buildRideRequestLines(data).join("\n"));
  return `${site.emailHref}?subject=${subject}&body=${body}`;
}
