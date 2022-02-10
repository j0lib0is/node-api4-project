const express = require('express');
// Router
const { Router } = require('express');
const router = Router();
// Imports
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
// Middleware
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

router.get('/', (req, res, next) => {
  // ✅ RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then(users => {
      res.json(users);
    })
    .catch(next);
});

router.get('/:id', validateUserId, (req, res, next) => {
  // ✅ RETURN THE USER OBJECT
  // This needs a middleware to verify user id
  res.json(req.user);
});

router.post('/', validateUser, (req, res, next) => {
  // ✅ RETURN THE NEWLY CREATED USER OBJECT
  // This needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then(newUser => {
      res.json(newUser);
    })
    .catch(next);
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // ✅ RETURN THE FRESHLY UPDATED USER OBJECT
  // This needs a middleware to verify user id...
  // ...and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(next);
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // ✅ RETURN THE FRESHLY DELETED USER OBJECT
  // This needs a middleware to verify user id
  const user = req.user;

  Users.remove(req.params.id)
    .then(count => {
      res.json(user);
    })
    .catch(next);
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // This needs a middleware to verify user id
  Users.getUserPosts(req.user.id)
    .then(posts => {
      console.log(posts);
      res.json(posts);
    })
    .catch(next);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // ✅ RETURN THE NEWLY CREATED USER POST
  // This needs a middleware to verify user id...
  // ...and another middleware to check that the request body is valid
  const postInfo = {...req.body, user_id: req.user.id};

  Posts.insert(postInfo)
    .then(newPost => {
      res.json(newPost);
    })
    .catch(next);
});

// Error handling middleware
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customError: 'Something went wrong in development',
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;
