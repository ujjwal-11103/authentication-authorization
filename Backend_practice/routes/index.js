var express = require('express');
var router = express.Router();

const userModel = require('./users')
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require("passport-local")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Home Page
router.get('/register', function (req, res, next) {
  res.render('register');
});

// Profile
router.get("/profile", isLoggedIn, function (reqq, res) {
  res.render('profile');
})

// login status checking
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/register');
}


// Register
router.post('/register', (req, res) => {

  // Extract username and password from the request body
  const { username, password } = req.body;

  // Create a new user object with the provided username
  const newUser = new userModel({ username: username });

  // Register the new user with Passport's register method
  userModel.register(newUser, password, (err, user) => {
    if (err) {
      // Handle registration errors (e.g., username already exists)
      console.error('Error registering user:', err);
      return res.status(500).send('Error registering user');
    }

    // If registration is successful, authenticate the user
    passport.authenticate('local')(req, res, () => {
      res.redirect('/profile'); // Redirect to the profile page after successful registration
    });
  });
});


// login

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/register',
}));


// Logout
router.get('/logout', (req, res) => {

  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect('/register');
  });

});


module.exports = router;
