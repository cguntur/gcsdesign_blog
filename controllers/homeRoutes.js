const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

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
      logged_in: req.session.logged_in  
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
          id: req.params.id,
      },
      include: [
          {
              model: Comment,
              //join of joined data
              include: [
                  {
                      model: User,
                      attributes: ["id", "name"],
                  },
              ],
          },
          {
              model: User,
              attributes: ["id", "name"],
          },
      ],
  });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
      logged_in_user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });
   
    res.render('dashboard', {
      ...user,
      logged_in: true,
      logged_in_user_id: req.session.user_id
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/comment', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const commentData = await Comment.findAll().catch((err) => {
      res.json(err);
    });

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('post', { 
      ...comments, 
      logged_in: req.session.logged_in  
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

  module.exports = router;