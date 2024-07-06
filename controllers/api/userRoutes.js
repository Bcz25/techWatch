const router = require('express').Router();
const { User } = require('../../models');


// Create a new user with the password hashed.
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      users_name: req.body.users_name,
      password: req.body.password,
    });
    // Save the session and log the user in.
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      // Send the new user data back to the client.
      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(500).render("ERR", { errorMessage: err.message });
  }
});


// Route to log the user into their account.
router.post("/login", async (req, res) => {
  try {
    // Find the user by their email address.
    const user = await User.findOne({ where: { email: req.body.email } });
    // If the user was not found, send an error.
    if (!user) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }
    // Check if the entered password matches the stored password.
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // If the password was invalid, send an error.
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    // If the password was valid, log the user in.
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.users_name = user.users_name;
      req.session.logged_in = true;

      res.status(200).json({ user: user, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logs user out of account.
router.post("/logout", async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
  
  module.exports = router;
  