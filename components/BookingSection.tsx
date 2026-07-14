"use client";

import { useState, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import { site } from "@/lib/site";
import {
  buildRideRequestMailto,
  fieldOrder,
  rideRequestSchema,
  toFieldErrors,
  type FieldErrors,
} from "@/lib/booking";
import { sendRideRequest } from "@/lib/actions";
import {
  ClockIcon,
  IconHover,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/animated-icons";
import { Reveal } from "@/components/Reveal";

const inputCls =
  "h-12 w-full rounded-[18px] border border-transparent bg-canvas px-4 text-[15px] placeholder:text-mute focus:outline-2 focus:outline-ink aria-[invalid=true]:border-[#b00004]";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  pickup: string;
  mapLink: string;
  dropoff: string;
  passengers: string;
  kids: string;
  bags: string;
  airline: string;
  flight: string;
  notes: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  pickup: "",
  mapLink: "",
  dropoff: "",
  passengers: "1",
  kids: "0",
  bags: "0",
  airline: "",
  flight: "",
  notes: "",
};

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
        {required && (
          <span aria-hidden className="text-[#b00004]">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-mute">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-[#b00004]">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cloud">
        {icon}
      </span>
      <span>
        <span className="block text-xs font-medium uppercase tracking-[0.15em] text-mute">
          {label}
        </span>
        <span className="mt-0.5 block font-medium">{value}</span>
      </span>
    </>
  );
  return (
    <IconHover>
      {href ? (
        <a href={href} className="flex items-center gap-4">
          {body}
        </a>
      ) : (
        <div className="flex items-center gap-4">{body}</div>
      )}
    </IconHover>
  );
}

export function BookingSection() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [stops, setStops] = useState<string[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState<false | "sent" | "mailto">(false);
  const [sending, setSending] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  // Honeypot — hidden from humans; a filled value means a bot submitted the form.
  const [company, setCompany] = useState("");

  const set =
    (key: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (company) {
      // Silently accept bot submissions without sending anything.
      setSubmitted("sent");
      return;
    }

    const parsed = rideRequestSchema.safeParse({ ...values, stops });
    if (!parsed.success) {
      const next = toFieldErrors(parsed.error);
      setErrors(next);
      const firstInvalid = fieldOrder.find((key) => next[key]);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    setErrors({});
    setServerMessage(null);
    setSending(true);
    try {
      const result = await sendRideRequest({ ...values, stops });
      if (result.ok) {
        setSubmitted("sent");
        return;
      }
      if (result.fieldErrors) {
        setErrors(result.fieldErrors);
        const firstInvalid = fieldOrder.find((key) => result.fieldErrors?.[key]);
        if (firstInvalid) document.getElementById(firstInvalid)?.focus();
        return;
      }
      if (!result.fallback) {
        setServerMessage(result.message ?? "Something went wrong. Please call us.");
        return;
      }
      // Server-side sending unavailable — open the visitor's email app instead.
      setSubmitted("mailto");
      window.location.href = buildRideRequestMailto(parsed.data);
    } catch {
      setSubmitted("mailto");
      window.location.href = buildRideRequestMailto(parsed.data);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-24" aria-labelledby="contact-heading">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-10 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Contact info */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-mute">
                Contact
              </p>
              <h2 id="contact-heading" className="display mt-6 text-5xl sm:text-6xl lg:text-7xl">
                Request
                <br />
                your ride.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-mute">
                Send your trip details and we&apos;ll reply with a personal,
                all-inclusive quote, usually within the hour. We don&apos;t charge
                anything until your trip is confirmed.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-12 space-y-8">
              <ContactRow
                icon={<PhoneIcon size={22} />}
                label="Phone, 24/7"
                value={site.phone}
                href={site.phoneHref}
              />
              <ContactRow
                icon={<MailIcon size={22} />}
                label="Email"
                value={site.email}
                href={site.emailHref}
              />
              <ContactRow
                icon={<MapPinIcon size={22} />}
                label="Office"
                value={site.address.full}
              />
              <ContactRow
                icon={<ClockIcon size={22} />}
                label="Hours"
                value="Around the clock, every day"
              />
            </Reveal>
          </div>

          {/* Booking request form */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div id="book" className="scroll-mt-28 bg-cloud p-6 sm:p-10">
              {submitted ? (
                <div aria-live="polite" className="py-10 text-center">
                  <p className="display text-4xl">
                    {submitted === "sent" ? "Request received." : "Almost there."}
                  </p>
                  <p className="mx-auto mt-4 max-w-md leading-relaxed text-mute">
                    {submitted === "sent" ? (
                      <>
                        Your ride request is on its way to our dispatch team.
                        We&apos;ll reply to{" "}
                        <strong className="font-medium text-ink">{values.email}</strong>{" "}
                        with your personal quote, usually within the hour. In a
                        hurry? Call{" "}
                        <a href={site.phoneHref} className="font-medium text-ink underline underline-offset-4">
                          {site.phone}
                        </a>
                        .
                      </>
                    ) : (
                      <>
                        Your email app just opened with your ride request. Hit send
                        and we&apos;ll come back with your quote. If it didn&apos;t
                        open, email{" "}
                        <a href={site.emailHref} className="font-medium text-ink underline underline-offset-4">
                          {site.email}
                        </a>{" "}
                        or call{" "}
                        <a href={site.phoneHref} className="font-medium text-ink underline underline-offset-4">
                          {site.phone}
                        </a>
                        .
                      </>
                    )}
                  </p>
                  <button
                    type="button"
                    className="mt-8 h-12 rounded-full bg-ink px-8 font-medium text-canvas"
                    onClick={() => setSubmitted(false)}
                  >
                    Edit my request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="display text-3xl">Ride request</h3>
                  <p className="mt-2 text-sm text-mute">
                    Fields marked <span className="text-[#b00004]">*</span> are
                    required.
                  </p>

                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="company">Company (leave this blank)</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Full name" required error={errors.name}>
                      <input
                        id="name"
                        className={inputCls}
                        autoComplete="name"
                        value={values.name}
                        onChange={set("name")}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                    </Field>
                    <Field id="phone" label="Phone" required error={errors.phone}>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        className={inputCls}
                        autoComplete="tel"
                        value={values.phone}
                        onChange={set("phone")}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                      />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field id="email" label="Email" required error={errors.email}>
                        <input
                          id="email"
                          type="email"
                          inputMode="email"
                          className={inputCls}
                          autoComplete="email"
                          value={values.email}
                          onChange={set("email")}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                      </Field>
                    </div>
                    <Field id="date" label="Pickup date" required error={errors.date}>
                      <input
                        id="date"
                        type="date"
                        className={inputCls}
                        value={values.date}
                        onChange={set("date")}
                        aria-invalid={!!errors.date}
                        aria-describedby={errors.date ? "date-error" : undefined}
                      />
                    </Field>
                    <Field id="time" label="Pickup time" required error={errors.time}>
                      <input
                        id="time"
                        type="time"
                        className={inputCls}
                        value={values.time}
                        onChange={set("time")}
                        aria-invalid={!!errors.time}
                        aria-describedby={errors.time ? "time-error" : undefined}
                      />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field id="pickup" label="Pickup location" required error={errors.pickup}>
                        <input
                          id="pickup"
                          className={inputCls}
                          placeholder="Address, airport or landmark"
                          value={values.pickup}
                          onChange={set("pickup")}
                          aria-invalid={!!errors.pickup}
                          aria-describedby={errors.pickup ? "pickup-error" : undefined}
                        />
                      </Field>
                    </div>

                    <div className="sm:col-span-2">
                      <Field
                        id="mapLink"
                        label="Pickup map link"
                        error={errors.mapLink}
                        hint="Optional. Paste a share link from Google Maps, Apple Maps or any maps app to pin your exact pickup spot."
                      >
                        <input
                          id="mapLink"
                          inputMode="url"
                          className={inputCls}
                          placeholder="https://maps.app.goo.gl/..."
                          value={values.mapLink}
                          onChange={set("mapLink")}
                          aria-invalid={!!errors.mapLink}
                          aria-describedby={errors.mapLink ? "mapLink-error" : undefined}
                        />
                      </Field>
                    </div>

                    {stops.map((stop, i) => (
                      <div key={i} className="sm:col-span-2">
                        <Field id={`stop-${i}`} label={`Stop ${i + 1}`}>
                          <div className="flex gap-2">
                            <input
                              id={`stop-${i}`}
                              className={inputCls}
                              placeholder="Optional stop along the way"
                              value={stop}
                              onChange={(e) =>
                                setStops((s) =>
                                  s.map((v, j) => (j === i ? e.target.value : v))
                                )
                              }
                            />
                            <button
                              type="button"
                              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-canvas"
                              aria-label={`Remove stop ${i + 1}`}
                              onClick={() => setStops((s) => s.filter((_, j) => j !== i))}
                            >
                              <X size={16} aria-hidden />
                            </button>
                          </div>
                        </Field>
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <button
                        type="button"
                        className="flex h-10 items-center gap-2 rounded-full border border-hairline px-5 text-sm font-medium hover:border-ink disabled:cursor-not-allowed disabled:opacity-40"
                        disabled={stops.length >= 5}
                        onClick={() => setStops((s) => [...s, ""])}
                      >
                        <Plus size={15} aria-hidden /> Add a stop
                      </button>
                    </div>

                    <div className="sm:col-span-2">
                      <Field id="dropoff" label="Drop-off location" required error={errors.dropoff}>
                        <input
                          id="dropoff"
                          className={inputCls}
                          placeholder="Address, airport or landmark"
                          value={values.dropoff}
                          onChange={set("dropoff")}
                          aria-invalid={!!errors.dropoff}
                          aria-describedby={errors.dropoff ? "dropoff-error" : undefined}
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-3 gap-5 sm:col-span-2">
                      <Field id="passengers" label="Passengers" required error={errors.passengers}>
                        <input
                          id="passengers"
                          type="number"
                          min={1}
                          max={14}
                          inputMode="numeric"
                          className={inputCls}
                          value={values.passengers}
                          onChange={set("passengers")}
                        />
                      </Field>
                      <Field id="kids" label="Children" hint="Car seats on request" error={errors.kids}>
                        <input
                          id="kids"
                          type="number"
                          min={0}
                          max={10}
                          inputMode="numeric"
                          className={inputCls}
                          value={values.kids}
                          onChange={set("kids")}
                        />
                      </Field>
                      <Field id="bags" label="Bags" error={errors.bags}>
                        <input
                          id="bags"
                          type="number"
                          min={0}
                          max={20}
                          inputMode="numeric"
                          className={inputCls}
                          value={values.bags}
                          onChange={set("bags")}
                        />
                      </Field>
                    </div>

                    <Field
                      id="airline"
                      label="Airline"
                      hint="For airport trips, so we can track your flight"
                      error={errors.airline}
                    >
                      <input
                        id="airline"
                        className={inputCls}
                        placeholder="e.g. United"
                        value={values.airline}
                        onChange={set("airline")}
                      />
                    </Field>
                    <Field id="flight" label="Flight number" error={errors.flight}>
                      <input
                        id="flight"
                        className={inputCls}
                        placeholder="e.g. UA 482"
                        value={values.flight}
                        onChange={set("flight")}
                      />
                    </Field>

                    <div className="sm:col-span-2">
                      <Field id="notes" label="Notes" error={errors.notes}>
                        <textarea
                          id="notes"
                          rows={3}
                          maxLength={1000}
                          className="w-full rounded-[18px] border border-transparent bg-canvas px-4 py-3 text-[15px] placeholder:text-mute focus:outline-2 focus:outline-ink"
                          placeholder="Anything we should know: extra luggage, accessibility, a special occasion…"
                          value={values.notes}
                          onChange={set("notes")}
                        />
                      </Field>
                    </div>
                  </div>

                  {serverMessage && (
                    <p
                      role="alert"
                      className="mt-6 rounded-[18px] bg-canvas px-4 py-3 text-sm font-medium text-[#b00004]"
                    >
                      {serverMessage}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    aria-busy={sending}
                    className="mt-8 h-12 w-full rounded-full bg-ink font-medium text-canvas transition-transform hover:scale-[1.01] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
                  >
                    {sending ? "Sending…" : "Send ride request"}
                  </button>
                  <p className="mt-3 text-center text-xs text-mute">
                    Your request goes straight to our dispatch inbox, and a real
                    person replies with your quote. We don&apos;t charge anything
                    until your trip is confirmed.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
