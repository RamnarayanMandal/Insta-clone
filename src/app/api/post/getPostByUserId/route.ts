import Post from "@/models/post.model"
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    await connect()
    try {
        const userId = await request.nextUrl.searchParams.get("id")

        const posts = await Post.find({author:userId})
        return NextResponse.json({
            posts,
            success:true,
            status:200
        })
    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            success:false,
            status:500
        })
    }
}