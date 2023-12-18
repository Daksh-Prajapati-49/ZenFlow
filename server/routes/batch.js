const express = require("express")
const batchRouter = express.Router();
const { getBatch, createBatch } = require("../controllers/batch");

batchRouter.get("/", getBatch);
batchRouter.post("/", createBatch);
module.exports = batchRouter ;