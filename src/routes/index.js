var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("index", { title: "Le' Fut Goat" });
});

module.exports = router;
...