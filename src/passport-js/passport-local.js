import * as response from '../utils/response.util'

//success login
export const successLogin = async (req, res) => {
    return response.sendSuccess(res,200,'loggedin',[req.user])
}

//failure login
export const failureLogin = async (req, res) => {
    return response.sendSuccess(res,401,'logged failure')
}