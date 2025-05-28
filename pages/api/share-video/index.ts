import { sendEmail } from "@/integrations/email";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { submissionId, videoUrl, firstName, lastName, email } = req.body;

  try {
    await sendEmail({
      from: process.env.DEFAULT_FROM_EMAIL,
      to: [email],
      subject: `Shared Video Link - ${firstName} ${lastName}`,
      html: `
          <div style="max-width:600px; margin:0 auto; padding:24px; font-family:Arial, sans-serif; font-size:14px; color:#333; background:#fff; border:1px solid #ddd; border-radius:8px;">
            <h2 style="font-size:20px; margin-bottom:16px; color:#111;">
              🎥 Shared Video Link Confirmation
            </h2>

            <p><strong>Submission ID:</strong> ${submissionId}</p>

            <p>Thank you, <strong>${firstName} ${lastName}</strong>, for submitting your video as part of the nomination process.</p>

            <p>Here is the link we received:</p>

            <div style="margin: 16px 0; word-break:break-all;">
              <a href="${videoUrl}" style="color:#007BFF;">${videoUrl}</a>
            </div>

            <p>If you need to update or re-upload the video, feel free to use the original video submission link.</p>

          </div>
        `,
    });
    return res
      .status(200)
      .json({ message: "Email sent successfully", error: false });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Error sending email", error: true });
  }
}
