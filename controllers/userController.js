const express = require("express");
const bcrypt = require("bcrypt")

// we need our User model
const User = require("../models/users"); // you do not have to .js
const router = express.Router();

// router.get("/", (req,res) => {
//    res.send("USER CONTROLLER WORKS")
// })

router.get("/register", (req,res) => {
   res.render("users/register.ejs")
});

router.post("/register", (req,res) => {
   // encrypt passwords, use bcrypt library, import the library at the top of our file and first things we need to generate salt
   const salt = bcrypt.genSaltSync(10)
   // salt is a random garbage we add to our encrypted passwords
   // the number we pass to genSaltSync determines how much salt we are adding, the higher the number the more secure, but the longer its takes
   // generate the actual hashed password
   // console.log(req.body) // worked
   req.body.password = bcrypt.hashSync(req.body.password, salt)
   // console.log(req.body) // worked

   // see if somebody else already has this username
   User.findOne({username: req.body.username}, (err,userExists) => {
      if(userExists){
         res.send("That's UserName is Taken")  // need to render back to signup page
      }  else  {
         User.create(req.body,  (err, createdUser) =>{
            // console.log(createdUser) // worked
            // res.send("user created") // worked //need to render back to signup page
            req.session.currentUser = createdUser
            res.redirect("/services")
         }); 
      }
   });
});

router.get("/signin", (req,res) => {
   res.render("users/signin.ejs")
});

router.post("/signin", (req,res) =>{
   // we need to get the user with that name
   User.findOne({username: req.body.username}, (err,foundUser) => {
      if(foundUser){
         // if they do exist, wer need to compare their passwords using bcrypt's compareSync function
         const validLogIn = bcrypt.compareSync(req.body.password, foundUser.password)
         // compareSync returns true if they match and false if they don't match
         // if the password match, log then in
         if(validLogIn){
            req.session.currentUser = foundUser
            console.log('validLogIn', req.session)
            // we are letting session know that we have longed in
            // res.send("User logged in")
            res.redirect("/services")
         }  else{
            // if they don't match, send a message
            res.send("Invalid Username or Password")
            // res.redirect("/users/signin")
         }
      }  else{
         // if they don't exist, we need to send a message
         res.send("Invalid Username or Password")
         // res.redirect("/users/signin")
      }
   });
});

// DESTROY session route
router.get("/signout", (req, res) => {  
   // this destroy's the session
   console.log("sign-out", req.session)
   req.session.destroy()
      res.redirect("/users/signin")
});
module.exports = router