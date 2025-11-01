import { create, findOne } from "../../DB/dbService.js";
import { userModel } from "../../DB/Models/user.model.js";
import { successResponse } from "../../Utils/successResponse.utils.js";
//import bcrypt from "bcryptjs";
import { hash , compare} from "../../Utils/hash.utils.js"
import { encrypt , decrypt } from "../../Utils/encryption.utils.js"
//import jwt from "jsonwebtoken";
import { signToken } from "../../Utils/token.utils.js";
//import { sign } from "jsonwebtoken";



//asyncHandler function is used with old express version
export const signup = async (req , res, next) => {
    
        const {firstName , lastName , email , password, gender, phone} = req.body;

        //check if email already exists 
       // const user = await userModel.findOne({email});
        if(await findOne({model : userModel , filter : {email}}))
             return next(new Error("Email already exists", {cause : 409}));
        //409 conflict => duplicate entry in DB

        //hashing
        const hashedPassword = await hash({plainText : password });

        //encrypt phone number
        const encryptedPhone = encrypt(phone);

        const user = await create({
            model : userModel,
            data : [{
                firstName,
                lastName,
                email,
                password: hashedPassword,
                gender,
                phone: encryptedPhone
            }]
            
        });

//        return res.status(201).json({message : "User created successfully", user});
          return successResponse({res ,statusCode : 201, message : "User created successfully", data : user});
}

//asyncHandler function is used with old express version
export const login = async (req , res, next) => {
    
        const {email , password} = req.body;

        const user = await findOne({
            model : userModel , 
            filter : {email}
        }); 
        
        if(!user)
            return next(new Error("Invalid email or password", {cause : 401}));// 401 => unauthorized
        
        //compare hash => check password
        if( !( await compare({plainText : password , hash : user.password}) ) )
            return next(new Error("Invalid credentials", {cause : 401}));
        
        

        const accessToken = signToken({
            payload : {_id : user._id},
            options : {
                expiresIn : "1d",
                issuer: "Sara7a App",
                subject: "Authentication",
            }
        
        });

        const refreshToken = signToken({
            payload : {_id : user._id},
            options : {
                expiresIn : "7d",
                issuer: "Sara7a App",
                subject: "Authentication",
            }
        
        }); 



        return successResponse({
            res,
            statusCode : 200,
            message : "User logged in successfully", 
            data : {accessToken , refreshToken}
        });
};