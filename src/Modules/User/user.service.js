import * as dbService  from "../../DB/dbService.js";
import { successResponse } from "../../Utils/successResponse.utils.js";
import { userModel } from "../../DB/Models/user.model.js";
import { decrypt } from "../../Utils/encryption.utils.js";
import jwt from "jsonwebtoken"; 
import { verifyToken } from "../../Utils/token.utils.js";

export const getSingleUser = async (req , res , next) => {

    const { authorization } = req.headers;

    //const token = authorization.split(" ")[1];

    //const { _id : id } = jwt.decode(token);

    const decoded = verifyToken({token : authorization});

    console.log(decoded); //return payload has _id


    
    const user = await dbService.findById({
        model : userModel , 
        id : {_id : decoded._id}
    });

    if(!user)
        return next(new Error("User not found", {cause : 404}));

    

    //user{}
    user.phone = decrypt(user.phone);

    return successResponse({
        res , 
        statusCode : 200,    
        message: "User fetched successfully", 
        data: user
    });

    
};