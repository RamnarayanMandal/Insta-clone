import Comment from "@/models/comment.model";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request:NextRequest){
    await connect()
    try {
        const postId = request.nextUrl.searchParams.get("id");
        if (!postId){
            return NextResponse.json({
                message: "Post id is required",
                sucesss:false,
                status: 400,
            })
        }
        const comments = await Comment.find({post:postId})
        if(!comments){
            return NextResponse.json({
                message: "Post not found",
                sucesss:false,
                status: 404,
            })
        }
        return NextResponse.json({
            comments,
            success:true,
            status:200,
            message:"get comments successfully"
        })
        } catch (error:any) {
            return NextResponse.json({
                error:error.message,
                success:false,
                status:500
            })
        
}}