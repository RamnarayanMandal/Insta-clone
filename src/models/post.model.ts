import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please provide a title"]
    },
    description:{
        type:String,
        required:[true,"please provide a description"]
    },
    image:{
        type:String,
       
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"please provide an author"]
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
   
},{timestamps:true})

const Post = mongoose.models.Post || mongoose.model("Post",postSchema);

export default Post;