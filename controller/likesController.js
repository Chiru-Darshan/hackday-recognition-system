const Like = require('../models/likesModel')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')


const createLike=asyncHandler(async(req, res)=>{
    let {postId, likedBy } = req.body
    if(!postId || !likedBy){
        throw new Error('Please provide all fields')
    }



    let like =await Like.create({
        postId,
        likedBy
    })

    console.log(JSON.stringify(like))
    await res.status(201).json(like)
})

const getLikesByPostId =asyncHandler( async(req, res)=>{
    res.status(200).json({message: 'like created'})
})

const deleteAllLikes =asyncHandler( async(req, res)=>{
    let response = await Like.deleteMany()
    res.status(200).json(response)
}

)

module.exports ={
    createLike,
    getLikesByPostId,deleteAllLikes
}