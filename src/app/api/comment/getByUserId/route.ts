import Comment from "@/models/comment.model";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request:NextRequest){
    await connect()
    try {
        const userId = request.nextUrl.searchParams.get("id");

        if(!userId) {
            return NextResponse.json({
                message: "User id is required",
                success: false,
                status: 400,
            })
        }
        const comments = await Comment.find({
            user:userId})
        
        if(!comments){
            return NextResponse.json({
                message: "Comments not found",
                success: false,
                status: 404,
            })
        }
        return NextResponse.json({
            comments,
            success: true,
            status: 200,
        })
       
    } catch (errors:any) {
        return NextResponse.json({
            message: errors.message,
            success: false,
            status: 500,
        })
    }
}