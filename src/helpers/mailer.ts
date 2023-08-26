import nodemailer from 'nodemailer'
import User from '../models/userModel'
import bcrypt from 'bcryptjs'

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_URL,
    port: 2525,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASS
    }
  });

  export const sendEmail = async ({email, emailType, userId}: any) =>{
    try {
        // create a hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        }
        if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        const mailOptions = {
            from: 'sjbuzzz@getPossibleMiddlewareFilenames.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'VVerify your email': 'Rest your password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${emailType === 'VERIFY'? 'verify your email': 'reset your password'}</p>`
        }

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailOptions;

    } catch (error: any) {
        throw new Error(error.message)
    }
  }