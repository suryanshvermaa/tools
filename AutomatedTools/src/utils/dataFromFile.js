import express from "expresspro";
import {readPdfText} from "pdf-text-reader"
import fs from "fs/promises"
import xlsx from "node-xlsx";

async function xlsxReader(filePath){
    const data=xlsx.parse(filePath);
    const finalData=data[0].data.map((data)=>([data.join(" | ")])).join("\n").slice(0,500);
    return finalData;
}
async function fsRead(filePath){
    const data=await fs.readFile(filePath,"utf-8");
    return data;
}

async function pdfRead(filePath){
    const data=await readPdfText({url: filePath});
    return data;
}

export const readFile=async(filePath)=>{
    const extArr=filePath.split(".");
    const ext=extArr[extArr.length-1];
    
    switch(ext){
        case "csv":
            return await fsRead(filePath);
        case "tsv":
            return await fsRead(filePath);
        case "txt":
            return await fsRead(filePath);
        case "html":
            return await fsRead(filePath);
        case "pdf":
            return await pdfRead(filePath);
        case "xlsx":
            return await xlsxReader(filePath);
        default:
            throw new express.AppError("This file not supported",400)
    }
}