// console.log("Hello World")
const express = require("express");
const path = require("path");


// Stupid simple database
const db = [];

// Create an express web server
const server = express();

// Static hosting of files in folder 'public'
server.use(express.static("public"));

// web server can read form requests
server.use(express.urlencoded({extended: true})); 


const PORT = 3000;

// Register routes to the server
server.get("/hello", (request, response) => {
    console.log("Someone requested from GET /hello");
    response.send(`<h1>Hello from app.js</h1>`)
});

// /hello/jonny
server.get("/hello/:name", (request, response) => {
    console.log("Someone requested from GET /hello/:name", request.params);
    // Want to response with "Hello [name], how are you?"
    const name = request.params.name;

    response.send(`Hello ${name}, how are you?`);
});

// /hello/name/age
server.get("/hello/:name/:age", (request, response) => {
    console.log("Someone requested from GET /hello/:name/:age", request.params);
    // const name = request.params.name;
    // const age = request.params.age;

    const { name, age } = request.params;

    response.send(`<h1>Hello ${name}, you are ${age} years old?</h1>`);
});

// Forms
server.get("/event", (request, response) => {
    // Option 1

    // response.send(`
    //     <h1>Sign up for event</h1>
    //     <form>
    //         <input type="text" placeholder="your name..." name="name" />
    //         <input type="email" placeholder="your email..." name="email" />
    //     </form>
    // `)

    // Option 2 *better*
    // console.log(__dirname + "/form.html");
    const pathToFile = path.join(__dirname, "form.html");


    response.sendFile(pathToFile);
})

server.post("/event/register", (request, response) => {
    console.log("Someone is trying to register", request.body);

    // Pull out name and email from request.body
    const {name, email} = request.body;

    // Save attending person into database
    db.push({name, email});

    // Notify user that they have been registered
    response.send(`<h1>Thank you for your registration! ${name} with ${email} has been recorded.</h1>`)
})

server.get("/event/attendies", (request, response) => {
    const html = db.map(attendy => `<p>${attendy.name} - ${attendy.email}</p>`).join("")
    response.send(html);
})


// Finally start listen for request
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));