const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./startup/db")();
const visitorsRoutes = require("./routes/visitors");



app.use(visitorsRoutes);



app.listen(PORT, () => console.log(`Listening on port: ${PORT}...`));