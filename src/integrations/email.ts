import { Resend, type Attachment } from "resend";

export async function sendEmail({
  from,
  to,
  subject,
  html,
  attachments,
}: {
  from?: string;
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Attachment[];
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const resolvedFrom = from || process.env.DEFAULT_FROM_EMAIL;

  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!resolvedFrom) {
    throw new Error("DEFAULT_FROM_EMAIL is not configured.");
  }

  const resend = new Resend(resendApiKey);
  const { error } = await resend.emails.send({
    from: `Sunstar Foundation Awards <${resolvedFrom}>`,
    to: to,
    bcc: [
      "martijn.verhulst@sunstar.com",
      "valentine.onah@sunstar.com",
      "marga.ortiz@sunstar.com",
    ],
    subject: `${subject}`,
    html: html || "Your html didn't work",
    attachments,
  });

  if (error) {
    throw new Error(error.message);
  }
}
