import nodemailer from 'nodemailer'
import 'dotenv/config'

export const transporter=await nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.MY_EMAIL,
        pass:process.env.MY_PASSWORD
    }
});
