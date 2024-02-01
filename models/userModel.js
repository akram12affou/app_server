import { Schema, model } from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new Schema({
    
   username :{
    type:String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
    unique: true,
   },

   email : {
    type: String,
    required : true,
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
   },

   password : {
    type: String,
    required : true,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
   },

   avatar:{
    type:String,
   }

});

userSchema.pre("save", async  function (next) {
    if (!this.isModified("password")) {
      next();
    };
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
  };

userSchema.methods.comparePassword =  async function (password)  {
    return await bcrypt.compare(password, this.password);
  };

const userModel = model('user' , userSchema)
export default userModel;