const express = require('express');
const { getAllPosts, getUserById, createPost, deletePost } = require('../controllers/postController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router
    .get('/posts/', verifyToken ,getAllPosts)
    .get('/user/:id',verifyToken ,getUserById);
    
router
    .post('/post/',verifyToken ,createPost)

    
router
    .delete('/post/', verifyToken, deletePost)
    
module.exports = router;
