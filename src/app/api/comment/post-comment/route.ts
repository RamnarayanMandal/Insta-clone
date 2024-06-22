import Comment from "@/models/comment.model";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request:NextRequest){
    await connect();
    const {comment,userId, PostId} = await request.json();
 if(!comment ||!userId ||!PostId){
     return NextResponse.json({
         success:false,
         message:"Please provide comment,userId and PostId",
         status:400
     },)
 }
   
    try {
        const newComment = new Comment({
            comment,
            user:userId,
            post:PostId,
        });
        await newComment.save();
        return NextResponse.json({
            success: true,
            comment: newComment,
            status: 201,
        });
    } catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            status: 500,
        });
    }

}