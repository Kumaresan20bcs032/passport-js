//@ commonly handling response to send back to client
export const sendSuccess=(res,statusCode,message,body)=>{
    const response={
        'statusCode':statusCode,
        'status':true,
        'message':message,
        'data':body
    }
    res.status(statusCode).json(response)
}

export const sendError=(res,statusCode,message)=>{
    const response={
        'statusCode':statusCode,
        'status':true,
        'message':message
    }
    res.status(statusCode).json(response)
}