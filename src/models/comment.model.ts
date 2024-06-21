import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:[true,"please provide a comment"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"please provide a user"]
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:[true,"please provide a post"]
    }
},{timestamps: true});

const Comment = mongoose.models.comments ||mongoose.model("Comment",commentSchema);

export default Comment;