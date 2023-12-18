// server.js
require("dotenv").config(); //added
const express = require("express");
const app = express();
// const cors = require("cors");

const cors = require('cors');
app.use(cors());

const connectDB = require("./config/db"); //added

const userRouter = require("./routes/users.js");
const batchRouter = require("./routes/batch.js");


// app.use(cors());

// connect database
connectDB();//added

// initialize middleware
app.use(express.json({ extended: false }));

app.use("/api/users",userRouter);
app.use("/api/batch",batchRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.get("/", (req, res) => res.send("Server up and running"));

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});