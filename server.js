const express = require("express");
const app = express();
const PORT =3000;
const Service = require("./models/salon.js");
const methodOverride = require('method-override');
// SETUP MONGOOSE
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/basiccrud");
mongoose.connection.once("open", () => {
   console.log("Connected to Mongo");
})

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
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





app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});






