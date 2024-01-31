import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
const app = express();
dotenv.config();
app.use('/user' , userRouter)
const PORT = process.env.PORT;
app.listen(PORT || 3000 , () => {
    connectDB()
    console.log('running server in port : ' , PORT);
}) 
 