import Post from "@/models/post.model"
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    await connect();
    try {
        const reqBody=await request.json()
        const {title,description,author}=reqBody
        if(!title ||!description ||!author){
            return NextResponse.json({
                message:"Please provide all the required fields",
                success:false,
                status:400,
            })
        }
        const post=new Post({title,description,author})
        const result =await post.save()

        if(!result){
            return NextResponse.json({
                message:"Post not created",
                success:false,
                status:500,
            })
        }

        return NextResponse.json({
            message:"Post created successfully",
            success:true,
            status:200,
            result
        })
    } catch (error:any) {
        return NextResponse.json({
            message:error.message,
            success:false,
            status:500,
        })
    }
}
