import fs from "fs/promises"
import path from "path";

async function init(){
    const data=await fs.readFile(path.resolve("data.csv"),"utf-8");
    console.log(data);
}

init()