const nodemailer = require("nodemailer");
const otpTemplate = require("../templates/otp.template");

const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Doodot" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for DooDot Registration",
      text: `Welcome to DooDot! Your OTP verification code is: ${otp}. This code will expire in 5 minutes. Please do not share it with anyone.`,
      html: otpTemplate(otp),
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error while sending mail: ", error);
    throw error;
  }
};

module.exports = { sendOTPEmail };
