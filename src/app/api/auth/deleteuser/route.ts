import { checkToken } from "@/middlewares/auth";
import { errorHandler } from "@/middlewares/error"
import User from "@/models/user"
import {
  generateToken,
  connectDB,
  setCookie,
  matchPassword,
} from "@/utils/features";
import { cookies } from "next/headers";
import { NextRequest } from "next/server"
import { isObjectIdOrHexString } from "mongoose";
import Todo from "@/models/todo";


export async function DELETE (req:NextRequest){
    try {
        const cookieStore = cookies()
        const token = cookieStore.get('token')

        if(!token){
            return errorHandler(401,"Please login first!")
        }

        const userId = checkToken(token.value)

        if(!isObjectIdOrHexString(userId)){
            return errorHandler(400,"Invalid Token Id")
        }

        connectDB()

        const user = await User.findById(userId)

        if(!user){
            return errorHandler(401,"Couldn't delete the account")
        }

        user.todos.map(async(todoId)=>{
            const todo = await Todo.findById(todoId) 
            await todo?.deleteOne()
        })

        await user.deleteOne()

        return Response.json(
          { success: true, message: `Profile deleted successfully` },
          {
            status: 200,
            headers: { "Set-Cookie": setCookie("") },
          }
        );
       
    } catch (error: unknown) {
        if(error instanceof Error){
            return errorHandler(500,error.message)
        }else{
            return errorHandler(500,'Internal server error')
        }
    }
}