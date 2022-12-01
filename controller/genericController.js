
const Comment = require('../models/commentModel')
const Post = require('../models/postModel')
const User = require('../models/userModel')
const Likes = require('../models/likesModel')
const asyncHandler = require('express-async-handler')


const getAllPosts = asyncHandler( async(req, res)=>{

    console.log('called')
    let posts = await Post.find().sort({createdAt: -1})
    let postsResult = []
    let usersDetails =[]
    let users = []
    let newPosts = []

    const getUserDetails =(id)=>{
        return usersDetails[usersDetails.findIndex(data => data.id = id )]
    }

    const getUserDetailsFullFledged = asyncHandler(async(id)=>{
        // console.log('users '+ JSON.stringify(usersDetails))
        if (users.includes(id)  && false)
            {
                console.log('returned from here : '+"id :"+id+"    " + JSON.stringify(getUserDetails(id)))
                return getUserDetails(id)  

            }
        else{
            let user = await User.findById(id)
       
                let rawUser = {
                    id : id,
                    name: user.name,
                    img_path: user.profile_pic
                }
                users.push(id)
                usersDetails.push(rawUser)

                return rawUser

        }
        
    })

    for (let i=0;i< posts.length ; i++){
        // console.log(`iteration : ${i}`)
        let comments = await Comment.find({postId: posts[i]._id})
        // console.log(comments)
        let newComments = []

        for (let j=0; j< comments.length; j++){

            // console.log(`for ${i}:${j} ${comments[j]['commenterId'].toString()}`)
            id = comments[j]['commenterId'].toString()
            // console.log(`commenerId : ${id}`)
            let rawUser = await getUserDetailsFullFledged(id)

            let newComment =  {...comments[j]._doc, commenterId: rawUser}
            newComments.push(newComment)
            
        }

        let newPost = {...posts[i]._doc, comments: newComments }
        newPosts.push(newPost)
        
    }
    // console.log('current post :')
    // console.log(newPosts)
    for (let i=0; i< newPosts.length; i++){
        // console.log('test')
        // console.log(newPosts[i])
        let createdById = newPosts[i]["created_by_id"].toString()
        let createdForId = newPosts[i]["created_for_id"].toString()
        createdByIdUser = await getUserDetailsFullFledged(createdById)
        createdForIdUser =await  getUserDetailsFullFledged(createdForId)
        // console.log('users')
        // console.log(createdByIdUser)
        // console.log(createdForIdUser)

        let newPost = {...newPosts[i], created_by_id:createdByIdUser}
        // console.log('after test') 
        newPost = {...newPost,created_for_id:createdForIdUser }

        let likes = await Likes.find({postId: newPosts[i]._id})
        let likesDetails = []
        if (likes){
            for (let x=0;x< likes.length;x++)
            {

                let id =likes[x]['likedBy']
                // console.log(`id : ${id}`)
                // console.log(likes[x])
                let user = await  getUserDetailsFullFledged(id)
                let newLike = {...likes[x]._doc, likedBy: user}
                likesDetails.push(newLike)
            }
            newPost['likes'] = likesDetails

        }
        else{
            newPost['likes'] = []
        }


        // console.log(newPost)
        postsResult.push(newPost)
    }
   
    res.status(200).json(postsResult)

})

const getAllPostsByCreatedId = asyncHandler( async(req, res)=>{

    let created_by_id = req.params.id

    let posts = await Post.find({created_by_id:created_by_id}).sort({createdAt: -1})
    let postsResult = []
    let usersDetails =[]
    let users = []
    let newPosts = []

    const getUserDetails =(id)=>{
        return usersDetails[usersDetails.findIndex(data => data.id = id )]
    }

    const getUserDetailsFullFledged = asyncHandler(async(id)=>{
        // console.log('users '+ JSON.stringify(usersDetails))
        if (users.includes(id)  && false)
            {
                console.log('returned from here : '+"id :"+id+"    " + JSON.stringify(getUserDetails(id)))
                return getUserDetails(id)  

            }
        else{
            let user = await User.findById(id)
       
                let rawUser = {
                    id : id,
                    name: user.name,
                    img_path: user.profile_pic
                }
                users.push(id)
                usersDetails.push(rawUser)

                return rawUser

        }
        
    })

    for (let i=0;i< posts.length ; i++){
        // console.log(`iteration : ${i}`)
        let comments = await Comment.find({postId: posts[i]._id})
        // console.log(comments)
        let newComments = []

        for (let j=0; j< comments.length; j++){

            // console.log(`for ${i}:${j} ${comments[j]['commenterId'].toString()}`)
            id = comments[j]['commenterId'].toString()
            // console.log(`commenerId : ${id}`)
            let rawUser = await getUserDetailsFullFledged(id)

            let newComment =  {...comments[j]._doc, commenterId: rawUser}
            newComments.push(newComment)
            
        }

        let newPost = {...posts[i]._doc, comments: newComments }
        newPosts.push(newPost)
        
    }
    // console.log('current post :')
    // console.log(newPosts)
    for (let i=0; i< newPosts.length; i++){
        // console.log('test')
        // console.log(newPosts[i])
        let createdById = newPosts[i]["created_by_id"].toString()
        let createdForId = newPosts[i]["created_for_id"].toString()
        createdByIdUser = await getUserDetailsFullFledged(createdById)
        createdForIdUser =await  getUserDetailsFullFledged(createdForId)
        // console.log('users')
        // console.log(createdByIdUser)
        // console.log(createdForIdUser)

        let newPost = {...newPosts[i], created_by_id:createdByIdUser}
        // console.log('after test') 
        newPost = {...newPost,created_for_id:createdForIdUser }

        let likes = await Likes.find({postId: newPosts[i]._id})
        let likesDetails = []
        if (likes){
            for (let x=0;x< likes.length;x++)
            {

                let id =likes[x]['likedBy']
                // console.log(`id : ${id}`)
                // console.log(likes[x])
                let user = await  getUserDetailsFullFledged(id)
                let newLike = {...likes[x]._doc, likedBy: user}
                likesDetails.push(newLike)
            }
            newPost['likes'] = likesDetails

        }
        else{
            newPost['likes'] = []
        }


        // console.log(newPost)
        postsResult.push(newPost)
    }
   
    res.status(200).json(postsResult)

})


const getAllPostsByCreatedForId = asyncHandler( async(req, res)=>{

    let created_for_id = req.params.id

    let posts = await Post.find({created_for_id:created_for_id}).sort({createdAt: -1})
    let postsResult = []
    let usersDetails =[]
    let users = []
    let newPosts = []

    const getUserDetails =(id)=>{
        return usersDetails[usersDetails.findIndex(data => data.id = id )]
    }

    const getUserDetailsFullFledged = asyncHandler(async(id)=>{
        // console.log('users '+ JSON.stringify(usersDetails))
        if (users.includes(id)  && false)
            {
                console.log('returned from here : '+"id :"+id+"    " + JSON.stringify(getUserDetails(id)))
                return getUserDetails(id)  

            }
        else{
            let user = await User.findById(id)
       
                let rawUser = {
                    id : id,
                    name: user.name,
                    img_path: user.profile_pic
                }
                users.push(id)
                usersDetails.push(rawUser)

                return rawUser

        }
        
    })

    for (let i=0;i< posts.length ; i++){
        // console.log(`iteration : ${i}`)
        let comments = await Comment.find({postId: posts[i]._id})
        // console.log(comments)
        let newComments = []

        for (let j=0; j< comments.length; j++){

            // console.log(`for ${i}:${j} ${comments[j]['commenterId'].toString()}`)
            id = comments[j]['commenterId'].toString()
            // console.log(`commenerId : ${id}`)
            let rawUser = await getUserDetailsFullFledged(id)

            let newComment =  {...comments[j]._doc, commenterId: rawUser}
            newComments.push(newComment)
            
        }

        let newPost = {...posts[i]._doc, comments: newComments }
        newPosts.push(newPost)
        
    }
    // console.log('current post :')
    // console.log(newPosts)
    for (let i=0; i< newPosts.length; i++){
        // console.log('test')
        // console.log(newPosts[i])
        let createdById = newPosts[i]["created_by_id"].toString()
        let createdForId = newPosts[i]["created_for_id"].toString()
        createdByIdUser = await getUserDetailsFullFledged(createdById)
        createdForIdUser =await  getUserDetailsFullFledged(createdForId)
        // console.log('users')
        // console.log(createdByIdUser)
        // console.log(createdForIdUser)

        let newPost = {...newPosts[i], created_by_id:createdByIdUser}
        // console.log('after test') 
        newPost = {...newPost,created_for_id:createdForIdUser }

        let likes = await Likes.find({postId: newPosts[i]._id})
        let likesDetails = []
        if (likes){
            for (let x=0;x< likes.length;x++)
            {

                let id =likes[x]['likedBy']
                // console.log(`id : ${id}`)
                // console.log(likes[x])
                let user = await  getUserDetailsFullFledged(id)
                let newLike = {...likes[x]._doc, likedBy: user}
                likesDetails.push(newLike)
            }
            newPost['likes'] = likesDetails

        }
        else{
            newPost['likes'] = []
        }


        // console.log(newPost)
        postsResult.push(newPost)
    }
   
    res.status(200).json(postsResult)

})


module.exports ={
    getAllPosts,
    getAllPostsByCreatedId,
    getAllPostsByCreatedForId
}