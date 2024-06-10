const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/authGuard');

router.get('/post/:id', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [{ model: User }, { model: Post }],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render('comments', {
        ...comments,
        logged_in: req.session.logged_in
      });;
  } catch (err) {
    res.status(500).json(err);
  }
});

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