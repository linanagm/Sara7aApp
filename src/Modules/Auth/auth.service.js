import { create, findOne } from "../../DB/dbService.js";
import { userModel } from "../../DB/Models/user.model.js";
import { successResponse } from "../../Utils/successResponse.utils.js";
import bcrypt from "bcryptjs";
import { hash , compare} from "../../Utils/hash.utils.js";

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

        const user = await create({
            model : userModel,
            data : [{
                firstName,
                lastName,
                email,
                password: hashedPassword,
                gender,
                phone
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
        
        // const isMatch = await bcrypt.compare(password , user.password)
        // if(!isMatch)
        //     return next(new Error("Invalid credentials", {cause : 401}));

        //return res.status(200).json({message : "User logged in successfully", user});
        return successResponse({
            res,
            statusCode : 200,
            message : "User logged in successfully", 
            data : user
        });
};