// Module to create a web server
const express = require("express");

// Module to deal with paths
const path = require("path");

// Create web server instance
const app = express();

// Configuration to allow express app additional features
app.use(express.urlencoded({ extended: true })); // read data from forms

// Simple database that resets when server is restarting
const db = [];


// ---- Routes ----
// Here is all routes for our web server
app.get("/", (req, res) => {
    res.send("Hello from server");
});

// Route to present user with newsletter signup
app.get("/newsletter", (req, res) => {
    const pathToFile = path.join(__dirname, "public/newsletter.html");
    res.sendFile(pathToFile);
});

// Route to receive newsletter signup
app.post("/newsletter/signup", (req, res) => {
    // const { email } = req.body;
    const email = req.body.email;

    // store the email to a database
    db.push(email);

    // send confirmation to user
    res.send("<h1>Thank you for your signup! <a href='/newsletter/followers'>See all followers</a></h1>");
})


// Route to show all signups
app.get("/newsletter/followers", (req, res) => {
    const followers = db.map(email => `<li>${email}</li>`).join(""); 
    res.send(
        `
            <h1>All Followers</h1>
            <ul>
                ${followers}
            </ul>
        `
    );
});


// Route to edit a follower
app.put("newsletter/edit/:oldEmail/:newEmail", (req, res) => {
    // req.params
    const { oldEmail, newEmail } = req.params;

    // find email in db if it exist
    const foundEmailIndex = db.findIndex(mail => mail === oldEmail);

    // We found old email in database
    if (foundEmailIndex >= 0) {

        // Update the new email
        db[foundEmailIndex] = newEmail;
    } else {
        res.send(`So sorry, no email found in database.`);
    }
    // swap it for new email

    // confirm to user

})

/// ---------------

// Start listening for requests
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
