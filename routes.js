const express = require("express");
const router = express.Router();
const homeController = require("./controllers/homeController");
const bookController = require("./controllers/bookController");
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');





router.get("/", homeController.getHome);
router.get('/login', homeController.getLogin);
router.get('/logout', homeController.logOut);
router.get("/book-list", bookController.getBookList);
router.get("/books", bookController.getBook);
router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), homeController.getDashboard);
router.post("/books", bookController.postBook);
router.post(
    '/login',
    passport.authenticate('local', {
      failureRedirect: '/login',
      successRedirect: '/dashboard',
    }),homeController.postLogin);

module.exports = router;
