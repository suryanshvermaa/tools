import data_extractor from "../gemini/data_extractor.js";
import fs from "fs/promises";
import path from "path";
import express from "expresspro";
import {readFile} from "../utils/dataFromFile.js"

const filePath=path.resolve("src/data/data.json")

/**
 *
 * @param {import("expresspro").Request} req
 * @param {import("expresspro").Response} res
 * @param {import("expresspro").Response} next
 */
export const generateData = express.asyncHandler(async (req, res) => {
    const data = req.body?.data||"";
    if(!data&&!req.file) throw new express.AppError("Please provide data or file",400);
    const fileData=req.file?(await readFile(req.file.path)):"";
    const jsonData=await data_extractor(data||fileData);
    const extractedData = jsonData.replace(/```json\s*([\s\S]*?)\s*```/, "$1");
    await fs.writeFile(filePath,extractedData,(err)=>{
        console.log(err.message);
        throw new express.AppError(err,400);
    })
    const respData=[];
    for(let data of JSON.parse(extractedData)){
        respData.push(data);
    }
    express.resp(res,201,"data is converted successfully",{respData});
});

export const getData=express.asyncHandler(async (req, res) => {
    const data=await fs.readFile(filePath,"utf-8");
    const jsonData=JSON.parse(data);
    express.resp(res,200,"data fetched successfully!",{data:jsonData});
})