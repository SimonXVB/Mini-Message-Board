const express = require("express");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
];

app.get("/", (req, res) => {
    res.render("messages", { messages: messages });
});

app.get("/new", (req, res) => {
    res.render("form");
});

app.get("/details/:user", (req, res) => {
    const { user } = req.params;
    const content = messages.find((message) => message.user === user);

    res.render("details", {message: content})
});

app.post("/new", (req, res) => {
    messages.push({ text: req.body.text, user: req.body.user, added: new Date() });
    res.redirect("/");
});

app.listen(8080);