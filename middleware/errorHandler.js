const { stack } = require("../routes/contactroute")

const errHandler =(err,req,res,next)=>{
    const statusCode = res.statusCode? res.statusCode :500
    switch (statusCode) {
        case 400:
            res.json({
                title: "Validation failed",
                message: err.message,
                stackTrace:err.stack})
            break;
            case 404:
            res.json({
                title: "Not found",
                message: err.message,
                stackTrace:err.stack})
                break;
                case 403:
            res.json({
                title: "forbidden",
                message: err.message,
                stackTrace:err.stack})
            break;
            case 401:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace:err.stack})
            break;
            case 500:
            res.json({
                title: "Server error",
                message: err.message,
                stackTrace:err.stack})
            break;
        default:
            console.log("All Good no error")
            break;
    }
   
}

module.exports = errHandler