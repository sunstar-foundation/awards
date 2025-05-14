export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidLink(link: string): boolean {
  if (!link) return false;

  try {
    const url = new URL(link.startsWith("http") ? link : `https://${link}`);

    const isHttp = url.protocol === "http:" || url.protocol === "https:";
    const hasValidHost = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(url.hostname);

    return isHttp && hasValidHost;
  } catch {
    return false;
  }
}
