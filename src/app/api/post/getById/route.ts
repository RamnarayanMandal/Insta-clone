import { connect } from "@/dbConfig/dbConfig";
import Post from '@/models/post.model'
import { NextRequest,NextResponse } from "next/server";
import { getDataFromTheToken } from "@/app/helpers/getDataFromTheToken";

export async function GET(request:NextRequest){
    await connect()
    try {
        const postId = request.nextUrl.searchParams.get("id");

        const post = await Post.findOne({_id:postId})
        if(!post){
            return NextResponse.json({
                message: "Post not found",
                sucesss:false,
                status: 404,
            })
        }
        return NextResponse.json({
            message: "Post found",
            sucesss:true,
            status: 200,
            data:post
        })
       
    } catch (error:any) {
        return NextResponse.json({error:error.message,sucess:false}, { status: 500 })
    }

}