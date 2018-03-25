var express = require('express'),
    app = express();
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({
    extended: false
});
var model = require('../model/user_model');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var fs = require('fs');
var formidable = require('formidable');
var path = require('path')

module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        res.render('Index.ejs');
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/edit',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/login',
        failureRedirect: '/signup',
        failureFlash: true,
        successFlash: 'You can now Sign-in!' 
    }));

    app.get('/profile/edit', isLoggedIn, function (req, res) {
        res.render('edit.ejs', {
            user: req.user
        });
    });

    app.get('/profile', function (req, res) {
        res.render('profic.ejs');
    });

    app.get('/works', function (req, res) {
        res.render('feed.ejs');
    });

    app.get('/contact', function (req, res) {
        res.render('contact.ejs');
    });

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
