import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    like:{
        type:Boolean,
        default:false
    },
    dislike:{
        type:Boolean,
        default:false
    },


},{timestamps: true});

const Like = mongoose.models.likes||mongoose.model("Like",likeSchema);

export default Like;