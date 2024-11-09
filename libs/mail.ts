import nodemailer from "nodemailer";

export const sendEmail = async (options: MailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Hotel Valhalla" <${process.env.SENDER_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.text,
    html: options.body,
  };

  await transporter.sendMail(mailOptions);
};
