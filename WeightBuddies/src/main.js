const express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

app.get("/", function(req, res) {
    res.send("home page");
});

app.listen(3000, function() {
    console.log("Starting node server");
})