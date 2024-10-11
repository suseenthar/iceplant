const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('@model/userModel');

/* GET users listing. */
router.get('/list', function(req, res, next) {
  res.send('respond with a resource');
}); 
module.exports = router;
