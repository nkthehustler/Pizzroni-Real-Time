const { request } = require("express");
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const expressEJSLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;

// Assests

app.use(express.static('public'))
// Setting template engine

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/cart",(req,res) => {
  res.render("customers/cart")
})

app.get("/login",(req,res) => {
  res.render("auth/login")
})

app.get("/register",(req,res) => {
  res.render("auth/register")
})


app.use(expressEJSLayouts)
app.set('views', path.join(__dirname, './resources/views'))
app.set('view engine', 'ejs')



app.listen(PORT, () =>{
    console.log (`server is listening on port ${PORT}`)
});
