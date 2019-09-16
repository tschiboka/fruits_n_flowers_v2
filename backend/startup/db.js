module.exports = function () {
    const mongoose = require("mongoose");
    const connectionString = "mongodb+srv://tschiboka:@fruits-n-flowers-oloki.mongodb.net/test?retryWrites=true&w=majority";



    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to database..."))
        .catch((err) => console.log(`Could not connect to database: ${err}`));



    mongoose.set('useCreateIndex', true); // current version needs this setting otherwise coughing up warnings
}