const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

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
});

app.get("/testListing", async (req, res) => {
    // let sampleListing = new Listing({
    //     title: "My new Villa",
    //     description: "By  the Beach",
    //     price: 12000,
    //     loaction: "Calangute, Goa",
    //     country: "India"
    // });
         await sampleListing.save();
         console.log("Sample was saved");
         res.send("Successful testing");
});

app.listen(8080, () => {
    console.log("Server is listing on port 8080");
})