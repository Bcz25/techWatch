const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/authGuard');

router.get('/', withAuth, async (req, res) => {
    try {
      // Get all posts and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['userName'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('home', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
   try {
     const postData = await Post.findByPk(req.params.id, {
       include: [
         {
           model: Comment,
           attributes: ['id', 'text', 'author'], // Adjust attributes as needed
         },
         {
           model: User,
           attributes: ['userName'],
         }
       ],
     });
 
     if (!postData) {
       res.status(404).json({ message: 'No post found with this id!' });
       return;
     }
 
     const post = postData.get({ plain: true });
 
     // Assuming your Post model includes the author's userName as 'author'
     // If not, you might need to adjust how you're passing the author's name
     res.render('post', {
       post,
       comments: post.Comments, // Assuming the association is named 'Comments'
       logged_in: req.session.logged_in
     });
   } catch (err) {
     console.error(err);
     res.status(500).json(err);
   }
});

router.get('/login', async (req, res) => {
    try {
      res.render('login');
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/signup', async (req, res) => {
    try {
      res.render('signup');
    } catch (err) {
      res.status(500).json(err);
    }
});





module.exports=router;