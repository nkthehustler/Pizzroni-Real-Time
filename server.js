const { request } = require("express");
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const expressEJSLayouts = require("express-ejs-layouts");
const PORT = process.env.PORT || 3300;

app.get("/", (req, res) => {
  res.render("home");
});



// Setting template engine

app.use(expressEJSLayouts)
app.set('views', path.join(__dirname, './resources/views'))
app.set('view engine', 'ejs')


app.listen(PORT, () =>{
    console.log (`server is listening on port ${PORT}`)
});
