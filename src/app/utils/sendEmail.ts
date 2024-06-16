import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production' ? true : false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'shariarn85@gmail.com',
      pass: 'bzzc fncm mwln qrdy',
    },
  });

  await transporter.sendMail({
    from: '"Shariar Islam 👻" <shariarn85@gmail.com>', // sender address
    to: to, // list of receivers
    subject: 'Change your password', // Subject line
    text: 'Forgot the password? Change it within 10 minutes', // plain text body
    html: html, // html body
  });
};
