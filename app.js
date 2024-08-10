const express = require("express");
const app = express();
const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then( () => {
        console.log("Database connected");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
    }

app.get("/", (req, res) => {
    res.send("Hi I'm root");
})
app.listen(8080, () => {
    console.log("Server is listing on port 8080");
})