const express = require("express");
const router = express.Router();

const { getCV } = require("./controllers/CvController");
// const { getForm } = require("./views/form");
const fs = require("fs");

router.get("/", getCV);
router.get("/form", (req, res) => {
    res.render('form');
});
// var form;
router.post("/form", (req,res) => {
    var name = req.body.username;
    var email = req.body.myemail;
    var desg = req.body.designationName;
    // form = {name: username, designationName: desg}

    res.render("cv", { username: name, designationName: desg, myemail: email, educations: edus, experiences: expe, skills: skil, languages: lang});

})


module.exports = router;
