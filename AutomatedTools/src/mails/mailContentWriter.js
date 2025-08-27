import fs from "fs/promises";
import path from "path";

export const writeHtmlFile=async(html)=>{
    const filePath = path.resolve("src/mails/mailContent.js");
    await fs.writeFile(filePath,`
export const mailHtml=(data)=>{
    return \`
        ${html}  
    \`
}
`)
}