var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcryptjs');
const User = require('@model/userModel'); 


/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Manager Login', layout: false });
});

//COMPANY LOGIN
router.post('/company-login',  passport.authenticate('local', {
  successRedirect: session.returnTo || '/sales',
  failureRedirect: '/', 
})); 

/* GET login page. */
router.get('/admin', function(req, res, next) {
  res.render('admin-login', { title: 'Admin Login', layout: false });
});

//LOGIN
router.post('/login',  passport.authenticate('local', {
  successRedirect: session.returnTo || '/dashboard',
  failureRedirect: '/', 
})); 
 
passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' }, 
  async (email, password, done) => {
    try {
      const user = await User.findOne({  email: email });
 
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const passwordMatch = await user.comparePassword(password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }  
 
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Passport serialization/deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

//LOGOUT 
router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect(req.session.returnTo || '/');
  });
}); 

module.exports = router;
