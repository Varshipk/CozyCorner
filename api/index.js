import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
const app =express();
app.use(express.json());
mongoose
.connect(process.env.MONGODB)
.then(()=>{
    console.log("DB is connected");
})
.catch((e)=>{
    console.log(e);
})
app.listen(3000,()=>{
    console.log("server is running on 3000");
})

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter)
