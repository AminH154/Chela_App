
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js';
import cors from "cors";
import {app,server} from './lib/socket.js'; 




app.use(express.json({ limit: '5mb' }));
dotenv.config();
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

server.listen(process.env.PORT,()=>{
    console.log("Server is running on port 5000")
})

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected successfully")
})

app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)

