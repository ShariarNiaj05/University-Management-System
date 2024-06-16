import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production' ? true : false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: `${config.send_mail_user}`,
      pass: `${config.send_mail_pass}`,
    },
  });

  await transporter.sendMail({
    from: `${config.send_mail_user}`, // sender address
    to: to, // list of receivers
    subject: 'Forgot the password? Change it within 10 minutes', // Subject line
    text: '', // plain text body
    html: html, // html body
  });
};
