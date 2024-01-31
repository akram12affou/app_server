import { Schema, model } from "mongoose";

const userSchema = new Schema({
   name :{
    type:String,
  
   },
   email : {
    type: String,

   },
   password : {
    type: String,

   }
})
const userModel = model('user' , userSchema)
export default userModel;