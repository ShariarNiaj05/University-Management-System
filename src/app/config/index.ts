import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  send_mail_user: process.env.SEND_MAIL_USER,
  send_mail_pass: process.env.SEND_MAIL_PASS,
  clodinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  clodinary_api_key: process.env.CLOUDINARY_API_KEY,
  clodinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  clodinary_url: process.env.CLOUDINARY_URL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
};
