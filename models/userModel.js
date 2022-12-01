const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type : String,
        required : [true, 'Please provide name']
    },
    password:{

        type: String,
        required:[true, 'Please provide Password']
    },
    email : {
        type: String,
        required:[true, 'Please provide email']
    },
    profile_pic:{
        type: String
    },
    employeeId :{
        type: Number,
        required:[true, 'Please provide employee number']
    }
}, { timestamps: true})

module.exports= mongoose.model('User',userSchema )