const Post = require('../models/Post');

const createPost = async (req, res, next) => {
  try {
    const { title, content, excerpt, coverImage, category, tags } = req.body;

    const post = await Post.create({
      title,
      content,
      excerpt,
      coverImage,
      category,
      tags,
      author: req.user._id
    });

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const pageSize = 12; 
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword 
      ? {
          title: {
            $regex: req.query.keyword, 
            $options: 'i', 
          },
        }
      : {};

    const count = await Post.countDocuments({ ...keyword });

    const posts = await Post.find({ ...keyword })
      .populate('author', 'name')
      .limit(pageSize) 
      .skip(pageSize * (page - 1)) 
      .sort({ createdAt: -1 });

    res.json({ 
      posts, 
      page, 
      pages: Math.ceil(count / pageSize), 
      totalPosts: count 
    });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name bio');
    
    if (post) {
      res.json(post);
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('Not authorized to perform this action');
      }

      post.title = req.body.title || post.title;
      post.content = req.body.content || post.content;
      post.category = req.body.category || post.category;
      post.coverImage = req.body.coverImage || post.coverImage;
      post.excerpt = req.body.excerpt || post.excerpt;
      post.tags = req.body.tags || post.tags;

      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('Not authorized to perform this action');
      }

      await post.deleteOne();
      res.json({ message: 'Post removed successfully' });
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
