const express = require("express")
const router = express.Router() // have to be capital "R"
const Service =require("../models/services.js")

// CUSTOM MIDDLEWARE TO REQUIRE AUTHENTICATION ON ROUTES
const authRequired = (req,res, next) => {
   if (req.session.currentUser){ // this one can exits anywhere in our files record. this block of code in  middleware so we'll have access to this object from any where and we can refer that any were in our routes,you can even use in server.js to no need to import
      // a user is signed in
      next()
      // next is part of express, it does what it says. i.e, go on to the next thing
   } else{
      // if there is no user
      res.send("you must be logged in to do that!")
   }
}

// app.get("/seed", async (req, res) => {
//    const newServices = 
//    [
//       {
//          service: "hairCuts",
//          description: "men",
//          price: 20,
//          qty: 1,

//       },
//       {
//          service: "hairCuts",
//          description: "women",
//          price: 30,
//          qty: 1,
//       },
//       {
//          service: "hairColor",
//          description: "men",
//          price: 20,
//          qty: 1,
//       }
//    ]

// INDEX
router.get("/", async (req,res) => {
   console.log("Index route working before")
   let services = await Service.find({});
   console.log("services", services);
   res.render("index.ejs", {allServices: services});
   console.log("after")
}) 

// NEW
router.get("/new", (req,res) => {
   res.render("new.ejs")
})

// SHOW
router.get("/:id", async (req,res) => {
   Service.findById(req.params.id, (err, foundService) => {

      res.render("show.ejs",{
         singleService: foundService
      })
   })
   
})

//CREATE (POST)
   router.post("/",(req,res) => {
      Service.create(req.body, (error, createdService) => {
         if(error){
            console.log("error", error)
            res.send(error)
         }  else{
            res.redirect("/services")
         }
      });

   })

// DELETE (or DESTROY)
   router.delete("/:id", (req,res) =>{
      // res.send('deleting item') //  working
      Service.findByIdAndRemove(req.params.id, (err, data) =>{
         if(err){
            console.log(err)
         }  else{
            res.redirect("/services");
         }
      });
   });

// EDIT 
   router.get("/:id/edit", (req,res) =>{
      Service.findById(req.params.id, (err, foundServices) =>{
         res.render("edit.ejs", {EditService: foundServices }
         );
      });
   });
  
//UPDATE
router.put("/:id", (req,res) =>{
   Service.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) =>{
      // res.send(updatedModel) worked
      res.redirect("/services"); // back to index page
   });
});

 
module.exports = router
