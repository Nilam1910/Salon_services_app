const express = require("express");
const app = express();
const PORT =3000;
const Service = require("./models/services.js");
const methodOverride = require('method-override');
// SETUP MONGOOSE
const mongoose = require("mongoose");
                               // ip:address// data if you have
mongoose.connect("mongodb://127.0.0.1:27017/basiccrud");
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

app.get("/seed", (req, res) => {
   const newServices = 
   [
      {
         service: "hairCuts",
         description: "men",
         price: 20,
         qty: 1,

      },
      {
         service: "hairCuts",
         description: "women",
         price: 30,
         qty: 1,
      },
      {
         service: "hairColor",
         description: "men",
         price: 20,
         qty: 1,
      }
]
})

// INDEX
app.get("/services",(req,res) => {
   console.log("Index route working")
   // Service.find({}, (err, services))
   // res.render("index.ejs", {
   //    allServices :services})
}) 

// SHOW

// NEW/CREATE

// EDIT

// DELETE

//UPDATE




app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});






