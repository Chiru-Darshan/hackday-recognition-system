const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        required: [true],
        ref : 'Post'
    },
    commenterId :{
        type : mongoose.Schema.Types.ObjectId,
        required: [true],
        ref : 'User'
    },
    comment :{
        type: String,
        required : [true]
    }
}, {timestamps:true})

module.exports = mongoose.model('Comment', commentSchema)