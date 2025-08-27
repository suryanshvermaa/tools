import express from 'expresspro';
import 'dotenv/config';
import appRouter from './apis/routes.js';

const app=express();
app.use(express.cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',appRouter)

//health route
app.get('/health',express.asyncHandler(async(req,res)=>{
    express.resp(res,200,'healthy',{});
}));

app.use(express.error)

const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('server is running on port',port);
})