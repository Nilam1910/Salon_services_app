const express = require("express");
const bcrypt = require("bcrypt")

// we need our User model
const User = require("../models/users") // you do not have to .js


const router = express.Router();

router.get("/", (req,res) => {
   res.send("USER CONTROLLER WORKS")
})

router.get("/register", (req,res) => {
   res.render("users/register.ejs")
})

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
         User.create(req.body, (err, createdUser) =>{
            console.log(createdUser)
            res.send("user created") //need to render back to signup page
         })
      }
   })

})

module.exports = router