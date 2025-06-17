import { sendEmail } from "@/integrations/email";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { firstName, lastName, email, type } =
    req.body;

  try {
    await sendEmail({
      from: process.env.DEFAULT_FROM_EMAIL,
      to: [email],
      subject: `${type} Nomination Form - ${req.body.firstName} ${req.body.lastName}`,
      html: `
        <div style="max-width:600px; margin:0 auto; padding:24px; font-family:Arial, sans-serif; font-size:14px; color:#333; background:#fff; border:1px solid #ddd; border-radius:8px;">
          <h2 style="font-size:20px; margin-bottom:20px; color:#111;">${type} Nomination Form</h2>

          <p><strong>Submission ID:</strong> ${req.body.uniqueId}</p>
          <p><strong>I am not a full-time employee of a dental products distributor or manufacturer which market products compete with SUNSTAR's product line:</strong> ${req.body.isNotFullTimeDentalEmployee === true ? "Yes" : "No"}</p>
          <p><strong>I agree for Sunstar affiliates and distributors to use my details for marketing purposes:</strong> ${req.body.agreesForNomineeInformationToBeMarketed === true ? "Yes" : "No"}</p>
          <p><strong>Nominee:</strong> ${req.body.nominee.label}</p>
          <p><strong>Country:</strong> ${req.body.country?.label}</p>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

          <p><strong>First Name:</strong> ${req.body.firstName}</p>
          <p><strong>Last Name:</strong> ${req.body.lastName}</p>
          <p><strong>Address Line:</strong> ${req.body.addressLine}</p>
          <p><strong>Email:</strong> ${req.body.email}</p>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

          <p><strong>Is Certified Hygienist:</strong> ${req.body.isCertifiedHygienist === true ? "Yes" : "No"}</p>
          <p><strong>Graduation:</strong> ${req.body.graduation?.label}</p>
          <p><strong>Referral:</strong> ${req.body.referral?.label}</p>
          <p><strong>Category:</strong> ${req.body.category?.label}</p>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

          <p><strong>How did the nominee assist individual lives:</strong><br>${req.body.howDidTheNomineeAssistedIndividualLives}</p>
          <p><strong>How did the nominee make positive impact:</strong><br>${req.body.howDidTheNomineeMadePositiveImpact}</p>
          <p><strong>What has been the nominee's greatest achievement:</strong><br>${req.body.whatHasBeenTheNomineeGreatestAchievement}</p>
          <p><strong>What is the nominee most proud of:</strong><br>${req.body.whatIsTheNomineeMostProudOf}</p>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

          <p><strong>Accepted Privacy Policy:</strong> ${req.body.acceptedPrivacyPolicy === true ? "Yes" : "No"}</p>
        </div>
      `,
    });

    //create a link to share the video for the nominee only for WDHA

    if (type === "WDHA") {
      await sendEmail({
        from: process.env.DEFAULT_FROM_EMAIL,
        to: [email],
        subject: `Shared Video Link for your Nomination - ${firstName} ${lastName}`,
        html: `
          <div style="max-width:600px; margin:0 auto; padding:24px; font-family:Arial, sans-serif; font-size:14px; color:#333; background:#fff; border:1px solid #ddd; border-radius:8px;">
            <h2 style="font-size:20px; margin-bottom:16px; color:#111;">Shared Video Link for your Nomination</h2>

            <p>Hello <strong>${firstName} ${lastName}</strong>,</p>

            <p>Thank you for your nomination.</p>

            <p>Part of your nomination is a 1-minute video, in which you further explain your nomination. We would like to ask you to share this video with us, using the link below. Thank you!</p>

            <p>Please click the button below to upload or share your video with us:</p>

            <div style="margin: 24px 0;">
              <a href="${process.env.NEXT_PUBLIC_DOMAIN}/share-video?submissionId=${req.body.uniqueId}&firstName=${firstName}&lastName=${lastName}&email=${email}" 
                style="display:inline-block; padding:12px 20px; background-color:#007BFF; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold;">
                📹 Share Your Video
              </a>
            </div>

            <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
            <p style="word-break:break-all; color: #555;">
              ${process.env.NEXT_PUBLIC_DOMAIN}/share-video?submissionId=${req.body.uniqueId}&firstName=${firstName}&lastName=${lastName}&email=${email}
            </p>
            
          </div>
        `,
      });
    }

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
