const express = require('express')
const router =express.Router()


const {protect} = require('../middleware/authMiddleware')
const {getLikesByPostId, createLike, deleteAllLikes} = require('../controller/likesController')

router.route('/').get(getLikesByPostId).post(createLike).delete(deleteAllLikes)


module.exports = router