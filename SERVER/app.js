const express = require("express");
const app = express();
const User = require("./api/models/users");
var multer = require('multer');

var bcrypt = require('bcrypt'); 
var saltRounds = 10; 

var upload = multer(); 
const userData = new User();


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Methods", "*");
    next(); 
}); 

app.get("/api/users", (req, res) => {
    res.status(200).send(userData.get())
});

app.get("/api/users/:user_id", (req, res) => {
    const userId = req.params.user_id;
    const foundUser = userData.getIndividualUser(userId);
    if (foundUser) {
        res.status(200).send(foundUser);
    } else {
        res.status(404).send("Not found");
    }
});

app.put("/api/users/:user_id", upload.single(), (req, res) => {
    const userId = req.params.user_id; 
    let foundUser = userData.getIndividualUser(userId); 
    if (foundUser) {
        foundUser.fullName = req.body.fullName;
        var address = {
            "line1": req.body.line1, 
            "line2": req.body.line2, 
            "city": req.body.city, 
            "state": req.body.state, 
            "zipcode": req.body.zipcode
        }
        foundUser.address = address; 
        userData.update(userId, foundUser);
        res.status(200).send(foundUser);
    } else {
        res.status(404).send("Not found"); 
    }
});

app.put("/api/users/form/:user_id", upload.single(), (req, res) => {
    const userId = req.params.user_id; 
    let foundUser = userData.getIndividualUser(userId);
    if (foundUser) {
        var history = {
            "total": req.body.total, 
            "gallons": req.body.gallons, 
            "deliveryDate": req.body.deliveryDate, 
            "price": req.body.price
        }
        userData.updateHistory(userId, history); 
        res.status(200).send(history); 
    } else {
        res.status(404).send("Not found");
    }
});

app.post("/api/users/:user_id", upload.single(), (req, res) => {
    const userId = req.params.user_id; 
    let foundUser = userData.getIndividualUser(userId); 
    bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
        if (result == true) {
            res.status(200).send('Found'); 
        } else {
            res.status(404).send('Incorrect password'); 
        }
    })
})

app.post("/api/users", upload.single(), (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        let newUser = {
            "username": req.body.username, 
            "password": hash, 
            "fullName": "", 
            "address": "", 
            "history": ""
        }
        userData.add(newUser);
        res.status(201).send(newUser);
    })
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));

module.exports = app; 
