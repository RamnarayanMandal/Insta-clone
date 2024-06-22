import Comment from "@/models/comment.model";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";

export async function PATCH(request:NextRequest){
    await connect();
    try {
        const reqBody = await request.json()
        const {comment}=reqBody
        if(!comment){
            return NextResponse.json({ error: "Comment is required" }, { status: 400 })
        }
        const commentId=request.nextUrl.searchParams.get("id")
        if(!commentId){
            return NextResponse.json({ error: "Comment id is required" }, { status: 400 })
        }

        const updatedComment = await Comment.findOneAndUpdate({_id:commentId},{
            comment,
        }, { new: true })

        return NextResponse.json({
            message:"Comment updated successfully",
            success:true,
            status:200,
            updatedComment
        })
    } catch (error:any) {
        return NextResponse.json({
            message:error.message,
            success:false,
            status:500,
        })
    
    }}