import nodemailer from "nodemailer";
const { OTP_EMAIL, OTP_PASS } = process.env;
export const SendEmail = async (
  email: string,
  subject: string,
  text: string
) => {
  let sender = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
      user: OTP_EMAIL,
      pass: OTP_PASS,
    },
  });

  sender.verify((error, success) => {
    if (error) {
      console.log("error");
      console.log(error);
    } else {
      console.log("ready");
    }
  });

  await sender.sendMail({
    from: OTP_EMAIL,
    to: email,
    subject: subject,
    html: `<b>${text}</b>`,
  });
};
