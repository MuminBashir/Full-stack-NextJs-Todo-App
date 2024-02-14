import { errorHandler } from "@/middlewares/error"
import User from "@/models/user"
import {
  generateToken,
  connectDB,
  setCookie,
  matchPassword,
} from "@/utils/features";
import { NextRequest } from "next/server"

export async function POST (req:NextRequest){
    try {
        const {email,password} = await req.json()
        if(!email || !password){
            return errorHandler(400,'Fill all the input fields')
        }

        await connectDB();

        let user = await User.findOne({email}).select("+password")

        let isMatch = await matchPassword(password, user?.password || "")
       
        if(!user || !isMatch){
            return errorHandler(404,"Incorrect Email or Password")
        }

        const token = generateToken(user?._id)

        return Response.json({success: true, user, message: `Welcome back, ${user.name}`}, {
            status:200,
            headers: {'Set-Cookie': setCookie(token || "")}
        })
       
    } catch (error: unknown) {
        if(error instanceof Error){
            return errorHandler(500,error.message)
        }else{
            return errorHandler(500,'Internal server error')
        }
    }
}