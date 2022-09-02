const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const session = require("express-session");

// Environment Variable
require("dotenv").config(); // you have to be obey the variable of the port
// console.log(require("dotenv").config()) //just to check
// console.log(process.env) // check error and its working
const PORT = process.env.PORT ||3000// check in bottom too
const mongoURI = process.env.MONGODB_URI
const SESSION_SECRET = process.env.SESSION_SECRET
// custom middleware to make currentUser available as a local variable on all routes
// app.use((req, res, next) => {
//    res.locals.currentUser = req.session.currentUser
//    next()
//  })

app.use(session({
   secret: SESSION_SECRET,
   resave: false, // https://www.npmjs.com/package/express-session#resave
   saveUninitialized: false
   // console.log("Here is the session secret") //worked
   // console.log(SESSION_SECRET) //worked
}))

// SETUP MONGOOSE
mongoose.connect(mongoURI);
mongoose.connection.once("open", () => {
   console.log("Connected to Mongo"); 
}); 

//MIDDLEWARE
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
const salonController = require("./controllers/salonController.js");
// goes to router "/services" plus whatever routes are inside the controller
app.use("/services" , salonController); // its just peel route for you, means all services route goe to salonController 
const userController = require("./controllers/userController.js");
app.use("/users", userController);



// ROUTE MAIN (DEFAULT)
app.get("/", (req,res) => {
   // const today = new Date();
   // res.send(`
   //    <h1>Welcome! To Elite Threading and Hair Salon</h1>
   //    <h2>833 E Algonquin Rd</h2>
   //    <h2>Schaumburg</h2>
   //    <h2>IL-60173</h2>
   //    <h2>Phone: ###-###-####</h2>
   //    <h3>${today}</h3>
   // `);
   res.redirect("/services")
})

app.listen(PORT, () => {
   // console.log(`Server running on port ${PORT}`); //worked
});



// if you need this to use in header
// <!-- <% if(req.session.currentUser){
//    %> 
//    <p>You are Sign-In</p>
// <%   }else{ %>
//      <p>You are not Sign-In</p>
//  <% } %> -->