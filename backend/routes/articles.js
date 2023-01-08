const express = require('express');
const { schema } = require('../models/Blogs');
const {getBlog, getSingleBlog, createBlog, deleteBlog, updateBlog} = require('../controllers/blogController')


// Creating the router
const router = express.Router();

// get all blog article
router.get('/', getBlog);


// get a single blog article
router.get('/:id', getSingleBlog);


// POST a new blog article
router.post('/', createBlog);


// DELETE a blog article
router.delete('/:id', deleteBlog)


// UPDATE a blog article
router.patch('/:id', updateBlog);


module.exports.router = router;