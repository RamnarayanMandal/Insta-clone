import Post from "@/models/post.model"
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest){
    await connect();
    try {
        const postId=request.nextUrl.searchParams.get("id")

        if(!postId){
            return NextResponse.json({error:"Post id is required"},{status:400})
        }

        const post=await Post.findByIdAndDelete(postId)

        if(!post){
            return NextResponse.json({error:"Post not found"},{status:404})
        }
        return NextResponse.json({message:"Post deleted successfully",success:true,status:200})
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}