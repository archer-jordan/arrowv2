import nodemailer from "nodemailer";

// Initiate nodemailer
const transporter = nodemailer.createTransport({
  service: "Mailgun",
  auth: {
    pass: process.env.MAIL_PASSWORD,
    user: process.env.MAIL_USER,
  },
});

export default transporter;
