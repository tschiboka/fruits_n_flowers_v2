const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;



app.listen(PORT, () => console.log(`Listening on port: ${PORT}...`));



mongoose.connect("mongodb://localhost/fruits_n_flowers", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database..."))
    .catch((err) => console.log(`Could not connect to database: ${err}`));



app.get("/api/counter", (req, res) => {
    res.send("GET");
});
