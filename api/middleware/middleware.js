// Imports
const Users = require('../users/users-model');
const { getUserPosts, getById } = require('../users/users-model');
const yup = require('yup');

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`)
  next();
}

async function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(user => {
      if (user == null) {
        next({status: 404, message: '/not found/i'});
      } else {
        req.user = user;
        next();
      };
    })
    .catch(next);
}

function validateUser(req, res, next) {
  const name = req.body.name;

  if (name == null) {
    next({status: 400, message: '/missing required name/i'});
  } else {
    next();
  };
}

const postSchema = yup.object({
  text: yup.string().trim().required(),
})

async function validatePost(req, res, next) {
  try {
    const validPost = await postSchema.validate(req.body);
    req.body = validPost;
    next();
  } catch(err) {
    next({status: 400, message: '/missing required text/i'});
  };
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};
