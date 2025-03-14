import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.use(bodyParser.urlencoded({ extended: true }));

let posts = []; // Temporary storage

app.post("/create", (req, res) => {
    const newPost = {
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.redirect("/posts");
});

app.get("/posts", (req, res) => {
    res.render("posts.ejs", { posts });
});

app.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    if (posts[postId]) {
        res.render("post.ejs", { post: posts[postId] });
    } else {
        res.status(404).send("Post not found");
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});