const errorHandler =(err, req, res, next)=>{
    const status = res.statusCode || 500
    // console.log(res)
    res.status(status)
    res.json(
        {
            message : err.message,
            stack : err.stack
        }
    )
    
}


module.exports = {
    errorHandler,
} 