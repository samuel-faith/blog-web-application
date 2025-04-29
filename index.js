import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

let posts = []; // creates an array of posts

let idCounter = 1; // keeps track of the id of posts

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("home.ejs", { posts });
})

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.post("/create", (req, res) => {
    const {title, content} = req.body;
    posts.push({id: idCounter++, title, content});
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));
    res.render("edit.ejs", {post});
});

app.post("/edit/:id", (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    posts = posts.filter(p => p.id != Number(req.params.id));
    res.redirect("/");
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}.`);
});
