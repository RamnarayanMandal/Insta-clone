import Post from "@/models/post.model"
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request:NextRequest){
    await connect();
    try {
        const reqBody=await request.json()
        const {title,description}=reqBody
        const postId=request.nextUrl.searchParams.get("id")

        const post = await Post.findOneAndUpdate({_id:postId},{
            title,
            description,

        }, { new: true })

        
        return NextResponse.json({
            message:"Post created successfully",
            success:true,
            status:200,
            post
        })
    } catch (error:any) {
        return NextResponse.json({
            message:error.message,
            success:false,
            status:500
        })
    }
}