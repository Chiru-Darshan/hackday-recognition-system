const express = require('express')
const router =express.Router()

const {getPosts, createPost} = require('../controller/postController')
const {getAllPosts, getAllPostsByCreatedId, getAllPostsByCreatedForId}  = require('../controller/genericController')

const {protect} = require('../middleware/authMiddleware')

console.log()
router.route('/').get(getPosts).post(createPost)
router.route('/all').get(getAllPosts)
router.route('/created_by_id/:id').get(getAllPostsByCreatedId )
router.route('/created_for_id/:id').get(getAllPostsByCreatedForId )

module.exports = router