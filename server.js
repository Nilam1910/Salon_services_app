const express = require("express");
const app = express();
const Service = require("./models/services.js");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

const session = require("express-session")
// Environment Variable
require("dotenv").config() // you have to be obey the variable of the port
// console.log(require("dotenv").config()) //just to check
// console.log(process.env) // check error and its working
const PORT = process.env.PORT // check in bottom too
// SETUP MONGOOSE

const mongoURI = process.env.MONGODB_URI
                               // ip:address// data if you have
// const mongoURI = "mongodb+srv://admin:aSkNil290123@atlascluster.kpjr5bk.mongodb.net/salon_services?retryWrites=true&w=majority"
const SESSTION_SECRET = process.env.SESSTION_SECRET
console.log("Here is the session secret")
console.log(SESSTION_SECRET)

mongoose.connect(mongoURI);
mongoose.connection.once("open", () => {
   console.log("Connected to Mongo"); 
}); 

//MIDDLEWARE
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const salonController = require("./controllers/salonController.js")
// goes to router "/services" plus whatever routes are inside the controller
app.use("/services" , salonController); // its just peel route for you mean all services route goe to salonController 

const userController = require("./controllers/userController.js")
app.use("/users", userController)
app.use(session({
   secret: SESSTION_SECRET,
   resave: false, // https://www.npmjs.com/package/express-session#resave
   saveUninitialized: false
}))

// ROUTE MAIN
app.get("/", (req,res) => {
   const today = new Date();
   res.send(`
      <h1>Welcome! To Elite Threading and Hair Salon</h1>
      <h2>833 E Algonquin Rd</h2>
      <h2>Schaumburg</h2>
      <h2>IL-60173</h2>
      <h2>Phone: ###-###-####</h2>
      <h3>${today}</h3>
   `);
})

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

//    try {
//       const seedItems = await Service.create(newServices)
//       res.send(seedItems)
//    }  catch (err) {
//       res.send(err.message)
//    }
// }) used once

// // INDEX
// app.get("/services", async (req,res) => {
//    console.log("Index route working before")
//    let services = await Service.find({});
//    console.log("services", services);
//    res.render("index.ejs", {allServices: services});
//    console.log("after")
// }) 

// NEW
// app.get("/services/new", (req,res) => {
//    res.render("new.ejs")
// })

// // SHOW
// app.get("/services/:id", async (req,res) => {
//    Service.findById(req.params.id, (err, foundService) => {

//       res.render("show.ejs",{
//          singleService: foundService
//       })
//    })
   
// })

// //CREATE (POST)
//    app.post("/services",(req,res) => {
//       Service.create(req.body, (error, createdService) => {
//          if(error){
//             console.log("error", error)
//             res.send(error)
//          }  else{
//             res.redirect("/services")
//          }
//       });

//    })

// // DELETE
//    app.delete("/services/:id", (req,res) =>{
//       // res.send('deleting item') //  working
//       Service.findByIdAndRemove(req.params.id, (err, data) =>{
//          if(err){
//             console.log(err)
//          }
//          res.redirect("/services");
//       });
//    });

// // EDIT 
//    app.get("/services/:id/edit", (req,res) =>{
//       Service.findById(req.params.id, (err, foundServices) =>{
//          res.render("edit.ejs", {EditService: foundServices }
//          );
//       });
//    });

  
// //UPDATE
// app.put("/services/:id", (req,res) =>{
//    Service.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) =>{
//       // res.send(updatedModel) worked
//       res.redirect("/services"); // back to index page
//    });
// });

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});





// {/* <h2><%= allServices[i].description %></h2>
//             <h2><%= allServices[i].price %></h2>
//             <h2><%= allServices[i].qty %></h2>  */}

// ************ for index

            // <form action="/services/<%=allServices[i].id%>?_method=DELETE" method="POST">
            // <h2><%= allServices[i].description %> </h2>
            // <h2><%= allServices[i]price%></h2>
            // <h2><%= allServices[i]qty%></h2>
            // <input type="submit" value="DELETE">
            // </form>
            // <a href="/services/<%= allServices[i].id%>/edit">Edit</a>
