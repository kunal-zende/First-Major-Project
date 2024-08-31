const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path")
const ejsMate = require('ejs-mate')  //to create boilerplate and templates

//override - put
const methodOverride = require("method-override");

//to access  body in post request 
app.use(express.urlencoded({ extended: true}));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then( () => {
        console.log("Database connected");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname,"/public")));  //to use statio files like css



app.get("/", (req, res) => {
    res.send("Hi I'm root");
});

//Index route
app.get("/listing", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
});

//New route
app.get("/listings/new", (req, res) => {
    res.render("listings/create.ejs");
});

//Show route
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    console.log(id);
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

//create route
app.post("/listing", async (req, res) => {
    const newListing = new Listing( req.body.listing);
    console.log(newListing);
    await newListing.save();
    res.redirect("/listing")
})

//edit route
app.get("/listing/:id/edit",async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

//update route
app.put("/listing/:id", async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`)
});

//Delete router
app.delete("/listing/:id", async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    console.log(listing);
    res.redirect("/listing");
})

app.get("/testListing", async (req, res) => {
    // let sampleListing = new Listing({
    //     title: "My new Villa",
    //     description: "By  the Beach",
    //     price: 12000,
    //     loaction: "Calangute, Goa",
    //     country: "India"
    // // });
    //      await sampleListing.save();
    //      console.log("Sample was saved");
    //      res.send("Successful testing");
});


app.listen(8080, () => {
    console.log("Server is listing on port 8080");
})