
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.route.js'
import cors from "cors"


const app = express();
app.use(express.json())
dotenv.config();
app.use(cookieParser())
app.use(cors({
}))

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port 5000")
})

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected successfully")
})

app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)

