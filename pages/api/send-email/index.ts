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
      to: ["martijn.verhulst@sunstar.com"],
      subject: `${type} Nomination Form - ${req.body.firstName} ${req.body.lastName}`,
      html: `
        <h1>${type} Nomination Form</h1>
        <p>Nominee: ${req.body.nominee.value}</p>
        <p>Country: ${req.body.country?.label}</p>
        <p>First Name: ${req.body.firstName}</p>
        <p>Last Name: ${req.body.lastName}</p>
        <p>Address Line: ${req.body.addressLine}</p>
        <p>Email: ${req.body.email}</p>
        <p>Is Certified Hygienist: ${req.body.isCertifiedHygienist}</p>
        <p>Graduation: ${req.body.graduation?.label}</p>
        <p>Referal: ${req.body.referal?.label}</p>  
        <p>Category: ${req.body.category?.label}</p>
        <p>How did the nominee assisted individual lives: ${req.body.howDidTheNomineeAssistedIndividualLives}</p>
        <p>How did the nominee made positive impact: ${req.body.howDidTheNomineeMadePositiveImpact}</p>
        <p>What has been the nominee greatest achievement: ${req.body.whatHasBeenTheNomineeGreatestAchievement}</p>
        <p>What is the nominee most proud of: ${req.body.whatIsTheNomineeMostProudOf}</p>
        <p>Accepted Privacy Policy: ${req.body.acceptedPrivacyPolicy}</p>
        <p>Is not full time dental employee: ${req.body.isNotFullTimeDentalEmployee}</p>
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
