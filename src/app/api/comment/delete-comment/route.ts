import Comment from "@/models/comment.model";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";

export async function DELETE(request:NextRequest){
    await connect();
    try {
        const commentId=request.nextUrl.searchParams.get("id")
        if(!commentId){
            return NextResponse.json({error:"Comment id is required"},{status:400})
        }
        const comment = await Comment.findOneAndDelete({_id:commentId})
        return NextResponse.json({
            comment,
            success:true,
            status:200,
            message:"Comment deleted successfully"
        })
        } catch (error:any) {
            return NextResponse.json({
                error:error.message,
                success:false,
                status:500,
                message:"Something went wrong"
            })
        
        }
}