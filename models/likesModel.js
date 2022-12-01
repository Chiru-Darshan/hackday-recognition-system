const mongoose = require('mongoose')

const likesSchema = mongoose.Schema({
    postId : {
        type: mongoose.Schema.Types.ObjectId,
        required : [true],
        ref : 'Post'
        },
        likedBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true],
            ref : 'User'
        }
}, {timestamps:true})

module.exports = mongoose.model('Likes',likesSchema )