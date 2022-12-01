
const Post = require('../models/postModel')
const asyncHandler = require('express-async-handler')

const getPosts = asyncHandler(async (req, res)=>{
    console.log('posts got called')
    let posts = await Post.find()

    res.status(200)
    res.json(posts)
})

const createPost = asyncHandler(async (req, res)=>{
    let {created_by_id, created_for_id, content} = req.body

    if(!created_by_id || !created_for_id || !content){
        throw new Error('Please Provide all fields')
    }

    let post =await  Post.create(
        {
            "created_by_id": created_by_id,
            "created_for_id": created_for_id,
            "content": content
        }
    )

    if(!post){
        throw new Error('Server Side Error')
    }

    res.status(201)
    res.json(post)
})



module.exports = {
    getPosts,
    createPost
}


