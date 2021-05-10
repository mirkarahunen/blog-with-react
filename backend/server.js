const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const app = express()
const PORT = 5000

const userRoute = require('./routes/user_routes')
const imageRoute = require('./routes/images_routes')
const postRoute = require('./routes/posts_routes')
const commentRoute = require('./routes/comments_routes')
const replyRoute = require('./routes/reply_routes')

// Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(fileUpload())
app.use(express.static('uploads/images'))

// Routes
// User
app.post('/api/getUser', userRoute.getUser)

// Images
app.get('/api/getImage', imageRoute.getImage)
app.post('/api/postImage', imageRoute.postImage)
app.post('/api/uploadImages', imageRoute.postImages)

// Posts
app.get('/api/getPosts', postRoute.getPosts)
app.post('/api/newPost', postRoute.newPost)
app.post('/api/getPost/:id', postRoute.getPostWithID)
app.delete('/api/deletePost', postRoute.deletePost)

// Comments
app.post('/api/getComments/:id', commentRoute.getCommentsByID)
app.post('/api/postComment', commentRoute.postNewComment)

// Replies
app.get('/api/getReplies', replyRoute.getRepliesByID)
app.post('/api/postReply', replyRoute.postNewReply)

// Connect to express server

app.listen(PORT, (error) => {
    if(error) console.log(error);
    console.log('App listening on port ' + PORT);
})