
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import upload from 'express-fileupload'
import { notFound , errorHandler } from './middlewares/errorHandler.js';
import { __filename , __dirname } from './utils/pathHelper.js'



const app = express();
const PORT = process.env.PORT || 3000;
 

app.use(upload())
app.use(express.json())
dotenv.config();
 
app.use("/uploads" ,express.static(__dirname + '/uploads'));
app.use('/user' , userRouter)
 
app.use(notFound)
app.use(errorHandler)



app.listen(PORT  , () => {

    connectDB();
    console.log('running server in port : ' , PORT);
}) 
 