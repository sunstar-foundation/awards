export const WDHA_DEADLINE = "2026-01-15T23:59:59+02:00";
export const EDHF_DEADLINE = "2027-09-15T23:59:59+02:00";

export function isAwardClosed(deadline: string | Date) {
  // Allow exploring forms in development, or when a public override is set
  // AND the site is being built as a Vercel preview (prevents accidental prod exposure)
  if (
    process.env.NODE_ENV === "development" ||
    (process.env.NEXT_PUBLIC_AWARDS_OPEN_OVERRIDE === "true" &&
      process.env.VERCEL_ENV === "preview")
  ) {
    return false;
  }
  try {
    const d = typeof deadline === "string" ? new Date(deadline) : deadline;

    // Ensure we have a valid Date instance and that it's a valid time
    if (!(d instanceof Date) || Number.isNaN(d.getTime())) {
      return false;
    }

    return new Date() > d;
  } catch {
    return false;
  }
}
