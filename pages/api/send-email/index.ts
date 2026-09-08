import { sendEmail } from "@/integrations/email";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "15mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { firstName, lastName, email, type } = req.body;
  const cv = type === "EDHF" ? req.body.cv : null;
  const attachments = cv?.content
    ? [
        {
          filename: cv.fileName,
          content: cv.content,
          contentType: cv.contentType,
        },
      ]
    : undefined;

  try {
    await sendEmail({
      from: process.env.DEFAULT_FROM_EMAIL,
      to: [email],
      subject: `${type} Nomination Form - ${req.body.nominee.value === "1" ? req.body.nomineeFirstName : req.body.firstName} ${req.body.nominee.value === "1" ? req.body.nomineeLastName : req.body.lastName}`,
      attachments,
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
          ${
            req.body.nominee.value === "1"
              ? `
            <p><strong>Nominee First Name:</strong> ${req.body.nomineeFirstName}</p>
            <p><strong>Nominee Last Name:</strong> ${req.body.nomineeLastName}</p>
            <p><strong>Nominee Address Line:</strong> ${req.body.nomineeAddressLine}</p>
            <p><strong>Nominee Email:</strong> ${req.body.nomineeEmail}</p>
             <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
          `
              : ""
          }

          <p><strong>Is Certified Hygienist:</strong> ${req.body.isCertifiedHygienist === true ? "Yes" : "No"}</p>
          <p><strong>Graduation:</strong> ${req.body.graduation?.label}</p>
          <p><strong>Referral:</strong> ${req.body.referal?.label}</p>
          <p><strong>Category:</strong> ${req.body.category?.label}</p>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

          <p><strong>1. Individual Impact</strong><br><em>How has the nominee assisted individuals in living a healthier life through their work in the selected category?</em><br>${req.body.howDidTheNomineeAssistedIndividualLives}</p>
          <p><strong>2. Community Impact and Leadership</strong><br><em>How has the nominee made a positive impact on the community of their selected category?</em><br>${req.body.howDidTheNomineeMadePositiveImpact}</p>
          <p><strong>3. Signature Achievement in Clinical Work</strong><br><em>When in private practice, what has been the nominee's greatest achievement?</em><br>${req.body.whatHasBeenTheNomineeGreatestAchievement}</p>
          <p><strong>4. Professional Excellence and Distinction</strong><br><em>Of what accomplishment in the nominee's hygiene career are they most proud?</em><br>${req.body.whatIsTheNomineeMostProudOf}</p>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

          ${type === "EDHF" ? `<p><strong>CV:</strong> ${cv?.fileName ? `Attached (${cv.fileName})` : "Not provided"}</p>` : ""}
          <p><strong>Accepted Privacy Policy:</strong> ${req.body.acceptedPrivacyPolicy === true ? "Yes" : "No"}</p>
        </div>
      `,
    });

    //create a link to share the video for the nominee only for WDHA

    if (type === "WDHA") {
      await sendEmail({
        from: process.env.DEFAULT_FROM_EMAIL,
        to: [email],
        subject: `${req.body.nominee.value === "1" ? `Shared Video Link for the Nomination of ${req.body.nomineeFirstName} ${req.body.nomineeLastName}` : "Shared Video Link for your Nomination"} - ${firstName} ${lastName}`,
        html: `
          <div style="max-width:600px; margin:0 auto; padding:24px; font-family:Arial, sans-serif; font-size:14px; color:#333; background:#fff; border:1px solid #ddd; border-radius:8px;">
            <h2 style="font-size:20px; margin-bottom:16px; color:#111;">${req.body.nominee.value === "1" ? `Shared Video Link for the Nomination of ${req.body.nomineeFirstName} ${req.body.nomineeLastName}` : "Shared Video Link for your Nomination"}</h2>

            <p>Hello <strong>${firstName} ${lastName}</strong>,</p>
            ${req.body.nominee.value === "1" ? `<p>Thank you for nominating <strong>${req.body.nomineeFirstName} ${req.body.nomineeLastName}</strong></p>` : ` <p>Thank you for your nomination.</p>`}
            
            ${
              req.body.nominee.value === "1"
                ? ` Part of the nomination is a 1-minute video, in which the nominee further explains their nomination.
              We would like to ask the nominee to share this video with us, using the link below. Thank you!`
                : `<p>
              Part of your nomination is a 1-minute video, in which you further explain your nomination. We would like to ask you to share this video with us, using the link below. Thank you!
              </p>`
            }

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
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Error sending email",
      error: true,
    });
  }
}
