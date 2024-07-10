const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/authGuard');
const { post } = require('./dashboardRoutes');

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
      console.log(userData);
  
      const user = userData.get({ plain: true });
      console.log(user);  
  
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;