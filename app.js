require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const router = require("./routes/router");


const passport = require('passport');
const session = require('express-session');
const UserDetails = require('./userDetails');


const app = express();
const port = 3000;

const database_url = process.env.DATABASE_URL;

mongoose
  .connect(database_url)
  .then(() => {
    console.log("Database connected!");
  })
  .catch(() => {
    console.log("Could not connect to database!");
  });

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// set up view engine and layout
app.use(expressLayouts);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));


app.use(passport.initialize());
app.use(passport.session());
passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());
UserDetails.register({username:'admin', active: false}, 'admin');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(router);
app.listen(port, () => {
  console.log(`App is running at https://localhost:${port}`);
});
