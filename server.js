const express = require("express");
const app = express();
const PORT =3000;
const Service = require("./models/services.js");
const methodOverride = require('method-override');
// SETUP MONGOOSE
const mongoose = require("mongoose");
                               // ip:address// data if you have
mongoose.connect("mongodb://127.0.0.1:27017/services");
mongoose.connection.once("open", () => {
   console.log("Connected to Mongo");
})

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

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

// INDEX
app.get("/services", async (req,res) => {
   console.log("Index route working before")
   let services = await Service.find({});
   console.log("services", services);
   res.render("index.ejs", {allServices: services});
   console.log("after")
}) 

// SHOW

// NEW/CREATE

// EDIT

// DELETE

//UPDATE




app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});






