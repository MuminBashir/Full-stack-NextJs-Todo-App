import { checkToken } from "@/middlewares/auth";
import { errorHandler } from "@/middlewares/error"
import User from "@/models/user"
import { connectDB } from "@/utils/features";
import { cookies } from "next/headers";
import { NextRequest } from "next/server"

export async function GET (req: NextRequest){
    try {
        const cookieStore = cookies()
        const token = cookieStore.get('token')

        if(!token){
            return Response.json({success: false, user:{}, message:"Please Login first"}, {
                status:401,
            })
        }

        const _id = checkToken(token.value)

        
        await connectDB();

        let user = await User.findById(_id)

        if(!user){
            return Response.json({success: false, user:{},message:"Please Login first"}, {
                status:404,
            })
        }

        return Response.json({success: true, user}, {
            status:200,
        })
       
    } catch (error: unknown) {
        if(error instanceof Error){
            return errorHandler(500,error.message)
        }else{
            return errorHandler(500,'Internal server error')
        }
    }
}