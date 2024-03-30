import nodemailer from 'nodemailer'


//send mail
export const sendOTP = async (email: string, name: string,topic:string) => {
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

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify Your Account ✔",
      text: `Your OTP is`,
      html: `<b>
        <h2 style="color: #3498db;">Verify Your Account</h2>
        <p style="font-size: 12px;">Hi ${name}... We're thrilled to have you onboard. To complete your signup process, please use the following One-Time Password (OTP): </p>
        <p style="font-size: 15px; font-weight: bold; color: #2ecc71;">Your OTP is </p>
        <p style="font-size: 12px;">If you have any questions or need further assistance, feel free to reach out to our support team. We're here to help you every step of the way!</p>
        <p style="font-size: 12px margin-top 3px;">Thank you again for choosing CareerCrafter. We look forward to helping you achieve your goals.</p>

        
      </b>
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email has been sent to ${email}`, info.response);
      }
    });

    return { status: true,  };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
