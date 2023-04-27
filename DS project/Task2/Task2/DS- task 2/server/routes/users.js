require('dotenv').config();
var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage})
const Post = require("../models/Post")
const Comment = require("../models/Comment")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*POST registered User to database*/
router.post('/api/register/', (req, res, next) => {

  // Hashes the password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  //Used as a reference for the findOne function's new syntax:
  //https://stackoverflow.com/questions/75586474/mongoose-stopped-accepting-callbacks-for-some-of-its-functions

  //Check if Username with the same name already exists
  User.findOne( {username: req.body.username})
  .then((foundUser) => {
    //If the username is already taken, send error status and message
    if(foundUser) {
      console.log("Account with this name already exists")
      return res.status(403).send("Error: Account with this name already exists");
    } else {
      new User({
        username: req.body.username,
        password: hash
      }).save((err) => {
        if(err) return next(err);
        console.log("Account created successfully")
        return res.redirect("/users/login/")
      })
    }

  })
});

// Post route for the login
router.post('/api/login/', upload.none(), (req, res, next) => {


  //Use findOne function to find the user
  User.findOne( {username: req.body.username})
    .then((foundUser) => {
      //If the user does not exist, send status 403 and errormessage
      if(!foundUser){

        return res.status(403).json({message: "Login failed :("})
      } else{
        // Compare if the password given in the login form matches with the user in the database
        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) =>{
          if(err) throw err;
          //If the password matches, create jwt payload and token
          if(isMatch) {
            const jwtPayload = {
              username: foundUser.username
            }
            jwt.sign(
              jwtPayload,
              process.env.SECRET,
              {
                expiresIn: 120
              },
              (err, token) => {
                console.log(err)
                res.json({success: true, token})
              }
            );
          }
        })
      }
    })
    
});


//Post route for submitting book

router.post('/api/submitpost/', (req, res, next) => {
  
  Post.findOne( {post: req.body.post})
  .then((foundPost) => {
    //If the book has already been sent, send error status and message
    if(foundPost) {
      console.log("This Book already exists")
      return res.status(403).send("Error: This book already exists");
    } else {
      new Post({
        user: req.body.user,
        post: req.body.post,
        clicked: false
      }).save((err) => {
        if(err) return next(err);
        console.log("Book posted successfully")
      })
    }

  })
  

});

//Post route for submitting a comment
router.post('/api/submitcomment/', (req, res, next) =>{
  //Use id of the post to find the post
  Post.findOne( {_id: req.body.postid})
  .then((foundPost) => {
      console.log(req.body.comment)
      console.log(req.body.postid)
      console.log(req.body.user)

      new Comment({
        user: req.body.user,
        postid: req.body.postid,
        comment: req.body.comment
      }).save((err) => {
        if(err) return next(err);
        console.log("Comment created successfully")
      })

  })
});


//Get route for showing all the posts
router.get('/api/posts/', (req, res, next) => {
  Post.find({})
  .then((foundPost) =>{
    console.log(foundPost)
    res.json(foundPost)
  })
});


//Get route for showing all the comments
router.get('/api/comments/', (req, res, next) => {
  Comment.find({})
  .then((foundComment) =>{
    console.log(foundComment)
    res.json(foundComment)
  })
});


module.exports = router;
