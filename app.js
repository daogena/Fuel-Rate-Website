const express = require("express");
const app = express();
const User = require("./api/models/users");
const userData = new User(); 

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
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

app.post("/api/users", (req, res) => {
    const newUser = {
        "username": req.body.username, 
        "password": req.body.password
    }
    userData.add(newUser);
    res.status(201).send(newUser);
})

app.listen(3000, () => console.log("Listening on http://localhost:3000"));