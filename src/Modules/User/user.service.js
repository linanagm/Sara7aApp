import { successResponse } from "../../Utils/successResponse.utils.js";
import { decrypt } from "../../Utils/encryption.utils.js";

export const getSingleUser = async (req , res , next) => {

    
    

    //user{}
    req.user.phone = decrypt(req.user.phone);

    return successResponse({
        res , 
        statusCode : 200,    
        message: "User fetched successfully", 
        data: {user: req.user}
    });

    
};