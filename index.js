import express from "express";
import mongoose from "mongoose";
import User from "./models/user.js";

mongoose.connect("mongodb://localhost:27017/signup2", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log("Connection Successful!");
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({"message": "ok"});
});

app.post("/", (req, res) => {
    const user1 = new User(req.body).save((err, user) => {
        if (err) {
            res.status(500).json({"message": "not ok", "data": req.body, "error": err});
        } else {
            console.log(`${user.name} saved to db.`);
            res.status(201).json({"message": "ok", "data": req.body});
        }
    });
});

app.listen(3000, () => {
    console.log("Server online");
});