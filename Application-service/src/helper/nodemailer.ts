import nodemailer from "nodemailer";
import { IApplication } from "../utils/interface/interface";

//send mail
export const sendMail = async (
  applicationData: IApplication,
  status: boolean
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const rejected = `
    <b>
    <p style="font-size: 12px;">Hi ${applicationData?.name}... We hope this email finds you well. We want to take a moment to express our appreciation for your interest in the ${applicationData?.postName} role at ${applicationData?.company} and for taking the time to apply.
    </p>
    <p style="font-size: 12px;">After careful consideration of all the applications we received, we regret to inform you that we have chosen to move forward with other candidates whose qualifications more closely align with the requirements of the position.</p>
    <p style="font-size: 12px margin-top 3px;">Thank you once again for considering ${applicationData?.company} as a potential employer. We genuinely appreciate your interest, and we hope our paths may cross again in the future.
    </p>  
    <p>
    Best regards,
CEO
<br>
${applicationData?.company}
    </p>  
  </b>
`;
    const accepted = `
<b>
<p style="font-size: 12px;">Hi ${applicationData?.name}... We hope this email finds you well. We are pleased to inform you that your application for the  ${applicationData?.postName} role at ${applicationData?.company} has been reviewed, and we are impressed with your qualifications and experience.

</p>
<p style="font-size: 12px;">We would like to invite you to the next stage of our recruitment process, which is an interview to further discuss your background, skills, and fit for the role. The interview will be conducted by our Interviewer Panel and will update date and time ASAP.
</p>
<p style="font-size: 12px margin-top 3px;">We look forward to meeting you and discussing the opportunity further.

</p>   

<p>
Best regards,
<br>
CEO
<br>
${applicationData?.company}
</p>  
</b>
`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: applicationData?.email,
      subject: `Your application to ${applicationData?.company} `,
      // text: `Your OTP is`,
      html: status ? accepted : rejected,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(
          `Email has been sent to ${applicationData?.email}`,
          info.response
        );
      }
    });

    return { status: true };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
