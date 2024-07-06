const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/authGuard');

router.post('/post/:id', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.params.id,
      });
  
      res.json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;