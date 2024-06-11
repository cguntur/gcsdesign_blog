const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
      res.status(400).json(err);
  }
});

// UPDATE post
router.put("/:id", async (req, res) => {
  try {
      const updatePost = await Post.update(req.body, {
          where: {
              id: req.params.id,
          },
      });
      return res.status(200).json(updatePost);
  } catch (err) {
      console.log(err);
      return res.status(500).json(err);
  }
});

//Delete Post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletePost) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;