import mongoose, { Schema } from "mongoose";

//global variable
export const genderEnum = {
    male : "Male",
    female : "Female"
}

//user schema
const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        minLength : [3 , "First name must be at least 3 characters long"],
        maxLength : [30 , "First name must be at most 30 characters long"]
    },
    lastName : {
        type : String,
        required : true,
        minLength : [3 , "Last name must be at least 3 characters long"],
        maxLength : [30 , "Last name must be at most 30 characters long"]
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true, //to avoid case sensitivity throw search
        unique : true
    },
    //password can has white spaces => avoid using trim
    password : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        enum : {
            values : Object.values(genderEnum), //return array => ["male" , "female"]
            message : "gender is required"
        },
        default : genderEnum.male // if it male => error bec. of case sensitivity
    },
    phone : String,

    confirmEmail : Date //Boolean || Date //is Date exist => email is confirmed 
} , 
    {timestamps : true});


//model
export const userModel = mongoose.models.User || mongoose.model("User" , userSchema);