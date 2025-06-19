import fs from "fs";
export const emailsData=(fileName)=>{
    return new Promise((resolve, reject)=>{
        fs.readFile(fileName, 'utf8', (err, data) => {
            if(err){
                reject(err);
            }
            const objData=JSON.parse(data);
            resolve(objData);
        });
    });
}