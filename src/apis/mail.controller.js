import path from "path";
import express from "expresspro";
import fs from "fs/promises";
import mail_writer from "../gemini/mail_writer.js";
import {writeHtmlFile} from "../mails/mailContentWriter.js"
import { mail } from "../mails/sendMail.js";
import { mailHtml } from "../mails/mailContent.js";

const filePath=path.resolve("src/data/data.json");

export const generateMail=express.asyncHandler(async(req,res)=>{
    let {prompt}=req.body;
    if(!prompt) throw new express.AppError("prompt is required",400);
    const jsonData=await fs.readFile(filePath,"utf-8");
    const sampleData=JSON.parse(jsonData)[0];
    prompt+="\n here is data ->"+JSON.stringify(sampleData);
    const email=await mail_writer(prompt);
    const extractedEmail = email.replace(/```html\s*([\s\S]*?)\s*```/, "$1");
    await writeHtmlFile(extractedEmail);
    express.resp(res,200,"success",{email:extractedEmail})
});

export const sendMail=express.asyncHandler(async(req,res)=>{
    const {subject}=req.body;
    if(!subject) throw new express.AppError("All fields are required",400);
    const files=req.files;
    const attachments=[];
    const fileInfo=files?.map((file)=>({
        originalName: file.originalname,
        mimeType: file.mimetype,
        path: file.path,
    }))||[];
    for(let file of fileInfo){
        attachments.push({
            fileName: file.originalName,
            path: file.path
        })
    }
    const data=await fs.readFile(filePath,"utf-8");
    const jsonData=JSON.parse(data);
    await mail(jsonData,subject,attachments);
    express.resp(res,200,"mailing sucessful",{data:jsonData,attachments,fileInfo});
})


export const getMail=express.asyncHandler(async(req,res)=>{
    const data=mailHtml();
    express.resp(res,200,"mail fetched successfully",{mail:data});
})

export const updateMail=express.asyncHandler(async(req,res)=>{
    const {mail}=req.body;
    if(!mail) throw new express.AppError("Mail is required!",400);
    await writeHtmlFile(mail);
    express.resp(res,200,"mail updated successfully",{mail});
})