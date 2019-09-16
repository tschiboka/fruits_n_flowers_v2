const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const visitorShema = mongoose.Schema({
    ip: { type: String, required: true, unique: true },
    visitNum: { type: Number, default: 0 }
});
const Visitor = new mongoose.model("Visitor", visitorShema);



app.listen(PORT, () => console.log(`Listening on port: ${PORT}...`));



mongoose.connect("mongodb://localhost/fruits_n_flowers", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database..."))
    .catch((err) => console.log(`Could not connect to database: ${err}`));
mongoose.set('useCreateIndex', true); // current version needs this setting otherwise coughing up warnings



app.get("/api/visitors", async (req, res) => {
    try {
        const visitors = await Visitor.find();

        res.send({ "total": visitors.map(v => v.visitNum).reduce((acc, curr) => acc + curr), "unique": visitors.length });
    } catch (err) { res.send(`Error while getting counter... ${err}`); }
});



app.post("/api/visitors", async (req, res) => {
    try {
        const IP = req.connection.remoteAddress || "";

        let visitor = await Visitor.findOne({ ip: IP });
        if (!visitor) return res.send(await new Visitor({ ip: IP }).save());

        await visitor.update({ $inc: { visitNum: 1 } });
        res.send(visitor);
    } catch (err) { res.send(`Error while posting new visitor... ${err}`); }
});
