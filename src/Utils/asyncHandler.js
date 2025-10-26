
//we use asyncHandler function with old express version

// export const asyncHandler = (fn) =>{ 
//    return (req, res, next) =>{
//        fn(req, res, next).catch((err)=>{
//            return next (new Error(err, {cause : err.status || 500}));
            //using global error handler
//        });
//    }
//};
