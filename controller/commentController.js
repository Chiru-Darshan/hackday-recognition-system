
const Comment = require('../models/commentModel')
const asyncHandler = require('express-async-handler')

const getComments = asyncHandler( async(req, res)=>{
    const comments = await Comment.find()
    res.status(200).json(comments)
})


const createComment = asyncHandler(async(req, res)=>{

    console.log("request body")
    console.log(req.body)

    let {postId, commenterId, comment} = req.body

    if(!postId || !commenterId || !comment){
        throw new Error('Please provide all the details')
    }

    let commentOb = await Comment.create({
       postId,
       commenterId,
       comment
    })

   if(!commentOb){
    throw new Error('Server side Error')
   }

   res.status(201)
   res.json(commentOb)
}
)

module.exports ={
    getComments,
    createComment,
}