require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const exlayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

const moduleAlias = require('module-alias');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
 
const logger = require('morgan');
const moment = require('moment');

  


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
app.use(session({ store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI,collectionName: 'sessions' }),
secret: 'sriamman',resave: false,saveUninitialized: false,
cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));


moduleAlias.addAliases({
  '@model'  :  __dirname + '/src/models',
  '@controller' :  __dirname + '/src/controllers',  
  '@upload'  :  __dirname + '/public/uploads',
})  

var db = require('@model/config');
 
var indexController = require('@controller/indexController');
var dashboardController = require('@controller/dashboardController'); 
var productionsController  = require('@controller/productionsController');
var salesController  = require('@controller/salesController');
var tasksController = require('@controller/tasksController'); 
var settingsController  = require('@controller/settingsController');
var customersController  = require('@controller/customersController');
var companyController  = require('@controller/companyController');
var staffsController  = require('@controller/staffsController'); 
var filesController  = require('@controller/filesController'); 


app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));



app.use(exlayouts);
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

app.use((req, res, next) => {
   if (req.user) {
    res.locals.user = req.user; 
  } else {
    res.locals.user = null;  
  }
  res.locals.moment = moment;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


function isAuthenticated(req, res, next) { 
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
 

app.use('/', indexController);
app.use('/dashboard',isAuthenticated, dashboardController); 
app.use('/productions',isAuthenticated, productionsController);
app.use('/sales',isAuthenticated, salesController);
app.use('/tasks',isAuthenticated, tasksController); 
app.use('/settings',isAuthenticated, settingsController);
app.use('/customers',isAuthenticated, customersController);
app.use('/company',isAuthenticated, companyController);
app.use('/staffs',isAuthenticated, staffsController); 
app.use('/files',isAuthenticated, filesController); 

// error handler
app.use(function(err, req, res, next) {  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; 
  res.status(err.status || 500);
  res.render('error', { title: 'Error', layout: true });
});

module.exports = app;
