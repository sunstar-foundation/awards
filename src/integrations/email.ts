import { Resend } from "resend";

export async function sendEmail({
  from,
  to,
  subject,
  html,
}: {
  from?: string;
  to: string | string[];
  subject: string;
  html: string;
}) {
  //if from is not provided, use the default email
  if (!from) {
    from = process.env.DEFAULT_FROM_EMAIL;
  }

  const resend = new Resend(`${process.env.RESEND_API_KEY}`);
  await resend.emails.send({
    from: `Sunstar Foundation Awards <${from}>`,
    to: to,
    bcc: [
      "martijn.verhulst@sunstar.com",
      "dejan.eric@sunstar.com",
      "marga.ortiz@sunstar.com",
    ],
    subject: `${subject}`,
    html: html || "Your html didn't work",
  });
}
