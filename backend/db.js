const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const connectDatabase = () => {
    mongoose.connect("mongodb+srv://Happy79:Happy79@blackcoffer.t4nl1ur.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => {
        console.log(`Mongodb connected to the server: ${data.connection.host}`);
    });
}

module.exports = connectDatabase;