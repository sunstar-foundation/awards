import { sendEmail } from "@/integrations/email";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nominee, country, firstName, lastName, addressLine, email, type } =
    req.body;

  try {
    await sendEmail({
      from: process.env.DEFAULT_FROM_EMAIL,
      to: [email],
      subject: `${type} Nomination Form - ${req.body.firstName} ${req.body.lastName}`,
      html: `
        <h1>${type} Nomination Form</h1>
        <p>Submission ID: ${req.body.uniqueId}</p>
        <p>Is not full time dental employee: ${req.body.isNotFullTimeDentalEmployee === true ? "Yes" : "No"}</p>
        <p>Nominee: ${req.body.nominee.label}</p>
        <p>Country: ${req.body.country?.label}</p>
        <p>First Name: ${req.body.firstName}</p>
        <p>Last Name: ${req.body.lastName}</p>
        <p>Address Line: ${req.body.addressLine}</p>
        <p>Email: ${req.body.email}</p>
        <p>Is Certified Hygienist: ${req.body.isCertifiedHygienist === true ? "Yes" : "No"}</p>
        <p>Graduation: ${req.body.graduation?.label}</p>
        <p>Referal: ${req.body.referal?.label}</p>  
        <p>Category: ${req.body.category?.label}</p>
        <p>How did the nominee assisted individual lives: ${req.body.howDidTheNomineeAssistedIndividualLives}</p>
        <p>How did the nominee made positive impact: ${req.body.howDidTheNomineeMadePositiveImpact}</p>
        <p>What has been the nominee greatest achievement: ${req.body.whatHasBeenTheNomineeGreatestAchievement}</p>
        <p>What is the nominee most proud of: ${req.body.whatIsTheNomineeMostProudOf}</p>
        <p>Accepted Privacy Policy: ${req.body.acceptedPrivacyPolicy === true ? "Yes" : "No"}</p>
       
        `,
    });

    //create a link to share the video for the nominee
    await sendEmail({
      from: process.env.DEFAULT_FROM_EMAIL,
      to: [email],
      subject: `Shared Video Link for your Nomination - ${firstName} ${lastName}`,
      html: `<h1>Shared Video Link for your Nomination</h1>
      <p>Hello ${firstName} ${lastName},</p>
      <p>Thank you for your nomination.</p>
      <p>We would like to ask you to share a video link with us. This video link will be used for the nomination process.</p>
              <a href="${process.env.NEXT_PUBLIC_DOMAIN}/share-video?submissionId=${req.body.uniqueId}&firstName=${firstName}&lastName=${lastName}&email=${email}">Click here to share your video</a>
      
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
