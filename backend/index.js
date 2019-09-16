const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;



app.listen(PORT, () => console.log(`Listening on port: ${PORT}...`));



mongoose.connect("mongodb://localhost/fruits_n_flowers", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database..."))
    .catch((err) => console.log(`Could not connect to database: ${err}`));



app.get("/api/visitors", async (req, res) => {
    try {
        let visitorCounter = {
            total: 77,
            unique: 13
        };



        res.send(visitorCounter);
    } catch (err) { res.send(`Error while getting counter... ${err}`); }
});



app.post("/api/visitors", async (req, res) => {
    try {
        const IP = req.connection.remoteAddress;
        res.send(`POST VISITOR WITH IP ${IP}`);
    } catch (err) { res.send(`Error while posting new visitor... ${err}`); }
});
