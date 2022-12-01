const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

console.log(User)



const registerUser = asyncHandler(async(req, res)=>{

    let {email, name, password} = req.body
    if(!name || !password || !email)
    {
        res.status(400)
        throw new Error('please provide all fields')
    }

    const userExists =await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('User Already Exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword)

    const user = await User.create(
        {
            name: name,
            password: hashedPassword,
            email : req.body.email,
            employeeId: req.body.employeeId,
           
        }

    )

    if(user){
        res.status(201)
        res.json(
            {
                _id: user._id,
                name : user.name,
                email: user.email,
                employeeId: user.employeeId,
                profile_pic: user.profile_pic,
                token : generateToken(user._id)
            }
        )
    }


})

const loginUser = asyncHandler(async(req, res)=>{

    let {email, password } = req.body
    console.log(`email :${email} and pass : ${password}`)

    const user =await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password)))
    {
        res.status(200)
        res.json({
            id: user.id,
            name: user.name,
            img_path : user.profile_pic,
            token : generateToken(user._id),
    })
    
    }
    else{
            res.status(401)
            throw new Error('Invalid Credentials')
        
    }
    
})

const getMe = asyncHandler(async(req, res)=>{
    const users = await User.find()

    let filteredData = users.map((data)=>{
        return {
            "id": data._doc["_id"],
            "name": data._doc["name"],
            "img_path": data._doc["profile_pic"]
        }
    }
    )

    

    res.status(200).json(filteredData)
})


const generateToken = (id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    )
}

module.exports ={
    registerUser,
    loginUser,
    getMe
}