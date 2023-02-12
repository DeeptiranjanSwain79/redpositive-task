const connectDatabase = require("./db");
const app = require("./app");

//Handling Uncaught Exceptions  (Undefined variable)
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);;
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

connectDatabase();

const PORT = 5000;
const server = app.listen(PORT, () => {
    console.log(`Server working on http://localhost:${PORT}/`);
});

//Unhandled promise rejection   (If any connection string or any server related error)
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Sutting down the server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    })
})
