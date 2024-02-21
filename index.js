const express = require('express');
const app = express();
const cors=require('cors');
const port=8000;
app.use(cors())
const urlRouter = require('./routes/url');
const {connectToDatabase}=require('./connection');
connectToDatabase('mongodb://localhost:27017/short-url').then((res)=>{
    if(res){
        console.log('Database Connect established successfully');
    }
}).catch((err)=>console.log({err : err, message:'failed to connect to database'})); 
app.use(express.json());
app.use("/url", urlRouter);

app.listen(port,()=>console.log('Server started at PORT:',port));