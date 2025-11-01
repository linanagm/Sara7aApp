import { verifyToken } from "../Utils/token.utils.js";
import { userModel } from "../DB/Models/user.model.js";
import * as dbService  from "../DB/dbService.js";

export const authenticationMiddleware = async(req , res , next) => {
    const { authorization } = req.headers;
    
        const decoded = verifyToken({token : authorization});
    
    //    console.log(decoded); //return payload has _id
    
    
        
        const user = await dbService.findById({
            model : userModel , 
            id : {_id : decoded._id}
        });
    
        if(!user)
            return next(new Error("User not found", {cause : 404}));

        req.user = user;
        next();
    
}