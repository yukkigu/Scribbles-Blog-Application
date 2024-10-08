const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "orange", "banana"] });
});

app.post("/api/data", (req, res) => {
    const data = req.body;
    console.log(data);
    res.json({ message: `Data received` });
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
})