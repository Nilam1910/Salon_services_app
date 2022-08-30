const express = require("express");
const app = express();
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
// const mongoURI = "mongodb+srv://admin:aSkNil290123@atlascluster.kpjr5bk.mongodb.net/salon_services?retryWrites=true&w=majority"  // just to check
const salonController = require("./controllers/salonController.js")
// goes to router "/services" plus whatever routes are inside the controller
const userController = require("./controllers/userController.js")
const SESSION_SECRET = process.env.SESSION_SECRET
console.log("Here is the session secret") //worked
console.log(SESSION_SECRET) //worked

mongoose.connect(mongoURI);
mongoose.connection.once("open", () => {
   console.log("Connected to Mongo"); 
}); 

//MIDDLEWARE
app.use(session({
   secret: SESSION_SECRET,
   resave: false, // https://www.npmjs.com/package/express-session#resave
   saveUninitialized: false
}))
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/services" , salonController); // its just peel route for you mean all services route goe to salonController 
app.use("/users", userController)

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



app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});

