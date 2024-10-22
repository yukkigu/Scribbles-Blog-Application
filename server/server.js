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


async function getData() {
    const result = await db.query("SELECT * FROM posts");
    console.log(result.rows);
}

async function createNewPost() {

}

app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "orange", "banana"] });
});

app.post("/api/data", async (req, res) => {
    const data = req.body;
    console.log(data);
    res.json({ message: `Data received` });
});

app.listen(port, async () => {
    await getData();
    console.log(`Server started on port ${port} at http://localhost:${port}`);
})