const { request, response } = require('express');
const mongoose = require('mongoose');
const { schema } = require('../models/Blogs');


// get all blogs
const getBlog = async (request, response) => {
    const blog = await schema.find({}).sort({createAt: -1});
    response.status(200).json(blog);
}


// get a single blog
const getSingleBlog = async (request, response) => {
    const {id} = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: "No such article!"});
    } else {
        const blog = await schema.findById(id);

        if (!blog) {
            return response.status(404).json({error: "No such article found"});
        } else {
            response.status(200).json(blog);
        }
    }
}

// Create a blog
const createBlog = async (request, response) => {
    const {title, content, description, category} = request.body;

    try {
        const blog = await schema.create({title, content, description, category});
        response.status(200).json(blog);
    } catch (e) {
        response.status(400).json({e: e.message});
    }
};

// Delete a blog
const deleteBlog = async (request, response) => {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: "No such article!"});
    } else {
        const blog = await schema.findOneAndDelete({_id: id});

        if (!blog) {
            return response.status(404).json({error: "No such article found"});
        } else {
            response.status(200).json(blog);
        }
    }
};

// Update blog
const updateBlog = async (request, response) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: "No such article!"});
    } else {
        const blog = await schema.findOneAndUpdate({_id: id}, {
            ...request.body,
        });

        if (!blog) {
            return response.status(404).json({error: "No such article found"});
        } else {
            response.status(200).json(blog);
        }
    }
}

module.exports = {
    getBlog: getBlog,
    getSingleBlog: getSingleBlog,
    createBlog: createBlog,
    deleteBlog: deleteBlog,
    updateBlog: updateBlog,
};