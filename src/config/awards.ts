export const WDHA_DEADLINE = "2026-01-15T23:59:59+02:00";
export const EDHF_DEADLINE = "2027-09-15T23:59:59+02:00";

export function isAwardClosed(deadline: string | Date) {
  // In development allow exploring forms regardless of deadlines
  if (process.env.NODE_ENV === "development") {
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
