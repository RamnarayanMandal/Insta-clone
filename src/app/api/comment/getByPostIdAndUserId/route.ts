import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Comment from "@/models/comment.model";

import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  await connect();

  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  const userId = searchParams.get("userId");

  console.log("Post ID:", postId);
  console.log("User ID:", userId);

  if (!postId || !userId) {
    return NextResponse.json(
      {
        error: "Post id and User id are required",
        success: false,
      },
      { status: 400 }
    );
  }

  try {
    const comments = await Comment.aggregate([
      {
        $match: {
          post:new mongoose.Types.ObjectId(postId),
          user:new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $lookup: {
          from: "posts",
          localField: "post",
          foreignField: "_id",
          as: "postDetails",
        },
      },
      {
        $unwind: "$postDetails",
      },
      {
        $project: {
          _id: 1,
          comment: 1,
          createdAt: 1,
          userDetails: {
            _id: 1,
            name: 1,
            email: 1,
          },
          postDetails: {
            _id: 1,
            title: 1,
          },
        },
      },
    ]);

    console.log("Fetched Comments:", comments);

    if (comments.length === 0) {
      return NextResponse.json(
        {
          error: "Comments not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        comments,
        success: true,
        message: "Comments retrieved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving comments:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve comments",
        success: false,
      },
      { status: 500 }
    );
  }
}
