const router = require('express').Router();
const { Post, User, Comment } = require('../models');
//const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll().catch((err) => {
      res.json(err);
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      //logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

  module.exports = router;