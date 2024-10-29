import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 8080;
env.config();

// set up connection to postgreSQL database
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

db.connect()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(express.json());
app.use(cors(corsOptions));


async function getAllPosts() {
    const result = await db.query("SELECT * FROM posts");
    // console.log("backend: get post", result.rows);
    return result.rows;
}

async function createNewPost(data) {
    const current_date = new Date();
    try {
        await db.query("INSERT INTO posts (title, content, date_posted) VALUES ($1, $2, $3)", [data.title, data.content, current_date])
    }
    catch (err) {
        console.log(err);
    }
}

async function deletePost(id) {
    console.log("deleting post with id " + id);
    try {
        await db.query("DELETE FROM posts WHERE id = $1", [id]);
        console.log("successfully deleted post with id:", id)
    }
    catch (err) {
        console.log(err);
    }
}

async function getSelectedPost(id) {
    console.log("getting post with id " + id);
    try {
        await db.query("SELECT * FROM posts WHERE id = $1", [id])
    }
    catch (err) {
        console.log(err);
    }
}

// ================ CRUD OPERATIONs ================ //

// READ: gets all posts
app.get("/getPosts", async (req, res) => {
    console.log("getting all posts");
    try {
        const results = await getAllPosts();
        res.json(results);
    }
    catch (err) {
        console.error("Error fetching posts: ", error);
        res.status(500).json({ error: "Error fetching posts" });
    }

});

// CREATE: post into database
app.post("/add", async (req, res) => {
    console.log("in add...");
    const data = req.body;
    console.log(data);
    try {
        await createNewPost(data);
        res.json({ message: `Post created successfully` });
    }
    catch (err) {
        console.error("Error adding posts: ", error);
        res.status(500).json({ error: "Error adding posts" });
    }

});

// UPDATE: edits posts in database
// PUT bc only post title and content is updated
app.patch("/edit/:id", async (req, res) => {
    console.log("in edit...");
    const data = req.body;
    console.log(data)
    await getData(data.id);
});

// DELETE: delete posts in database
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log("backend: deleting post with id:", id);
    try {
        await deletePost(id);
        res.json({ message: `Successfully deleted post with id: ${id}` });
    }
    catch (err) {
        console.error("Error deleting posts: ", error);
        res.status(500).json({ error: "Error deleting post" });
    }
});


app.listen(port, async () => {
    console.log(`Server started on port ${port} at http://localhost:${port}`);
})