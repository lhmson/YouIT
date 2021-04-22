import express from "express";
import mongoose from "mongoose";

import Post from "../models/post_CuteTN.js";

// GET posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        // server error occurs
        res.status(500).json({ message: error.message });
    }
};

// GET posts/:id
export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            res.status(404).json(`Cannot find a post with id ${id}`);
            return;
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST posts/
export const createPost = async (req, res) => {
    const post = req.body;

    // new post shouldn't have an _id in it
    if (post._id) {
        res.status(400).json("New post mustn't have _id field");
        return
    }

    const newPost = new Post({
        ...post,
        userId: req.userId,
    });

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT posts/
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creatorId, selectedFile, tags, likes } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = {
        creatorId,
        title,
        message,
        tags,
        selectedFile,
        likes,
        _id: id,
    };

    await Post.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    await Post.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    // auth
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    const post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, {
        new: true,
    });

    res.json(updatedPost);
};