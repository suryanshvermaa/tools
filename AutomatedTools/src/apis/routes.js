import express from 'expresspro';
import { generateData, getData } from './data.controller.js';
import { generateMail, getMail, sendMail, updateMail } from './mail.controller.js';
import upload from "../middlewares/multer.js"
const appRouter=express.Router();

appRouter
.post('/jsonData',upload.single('file'),generateData)
.post('/generateMail',generateMail)
.post('/sendMail',upload.array('files',4),sendMail)
.get('/getMail',getMail)
.put('/updateMail',updateMail)
.get('/getData',getData)

export default appRouter;