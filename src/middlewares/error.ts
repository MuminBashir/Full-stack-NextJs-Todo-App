export const errorHandler = async(status:number, msg:string)=>{ 
  return Response.json({success: false, message: msg},{status})
}