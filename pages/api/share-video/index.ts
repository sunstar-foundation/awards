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
      //to: ["martijn.verhulst@sunstar.com"],
      to: [email],
      subject: `Shared Video Link - ${firstName} ${lastName}`,
      html: `
        <h1>
            Shared Video Link for Submission ID: ${submissionId}
        </h1>
        <p>Submission ID: ${submissionId}</p>
        <p>Video URL: ${videoUrl}</p>
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
