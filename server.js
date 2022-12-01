const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 7000

const path = require('path')


const {connectDB} = require('./config/db')
connectDB()
const app = express()
const goals = require('./routes/goalsRoutes')
const users = require('./routes/userRoutes')
const posts = require('./routes/postRoutes')
const comments = require('./routes/commentRoutes')
const likes = require('./routes/likesRoutes')
const {errorHandler} = require('./middleware/errorHandler')

app.use(cors({
    origin : "*"
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use('/api/goals', goals)
app.use('/user', users)
app.use('/api/posts', posts)
app.use('/api/comment', comments)
app.use('/api/like', likes)

app.use(errorHandler)
app.use(express.static('public'))

__dirname = path.resolve()
app.use(express.static(path.join(__dirname, '/build')))

app.use("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname,"build", "index.html" ))
})




const server =app.listen(port,()=>{
    console.log(`server running on ${port}`)
})


const io = require('socket.io')(server)
io.on('connection', (socket)=>{
    console.log(`new connection : ${socket.id}`)

    socket.on('comment', (data)=>{
        console.log(data)
        data.time = Date()
        socket.broadcast.emit('comment', data)
    })

   socket.on('newPost', (data)=>{
    console.log('new Post Created '+ data)
    socket.broadcast.emit('newPost', data)
   })

})

io.on('disconnection', (socket)=>{
    console.log(`disconnected from client : ${socket.id}`)
})