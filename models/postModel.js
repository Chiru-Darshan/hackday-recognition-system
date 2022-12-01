const mongoose = require('mongoose')

const postSchema = mongoose.Schema({

    created_by_id : {
        type: mongoose.Schema.Types.ObjectId,
        required:[true],
        ref:'User'
    },
    created_for_id : {
        type: mongoose.Schema.Types.ObjectId,
        required:[true],
        ref:'User'
    },
    content : {
        type: String,
        require:[true]
    },

}, {timestamps:true})


module.exports = mongoose.model('Post', postSchema)