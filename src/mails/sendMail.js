import {transporter} from "../config/index.js";
import { mailHtml } from "./mailContent.js";

const sendMail=async(data,subject,attachments,htmlContent)=>{
    await transporter.sendMail({
        from:process.env.MY_EMAIL,
        to:data.email,
        subject:subject,
        html:htmlContent,
        attachments:[
            ...attachments
        ]
    });
}

export const mail=async(data,subject,attachments)=>{
    try {
        for(let user of data){
            await sendMail(user,subject,attachments,mailHtml(user));
        }
    } catch (error) {
        console.log(error.message);
    }
}
