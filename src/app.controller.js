import authRouter from "./Modules/Auth/auth.controller.js";
import userRouter from "./Modules/User/user.controller.js";
import messageRouter from "./Modules/Messages/message.controller.js";
import connectDB from "./DB/connection.js";
import { globalErrorHanndler } from "./Utils/errorHandling.utils.js";

const bootstrap = async (app , express) => {
    
    app.use(express.json());

    connectDB();
    
    app.use("/api/auth" , authRouter);
    app.use("/api/user" , userRouter);
    app.use("/api/message" , messageRouter);

    app.all("/*dummy" , (req , res, next) => {
      return next(new Error("Not Found Handler!!", {cause : 404}));
      //return res.status(404).json({message : "Route not found"});  
    });
    
    //global error handler middleware
    app.use(globalErrorHanndler);
}

export default bootstrap;