const mongoose = require("mongoose");

// {
//     "timing" : "7am-8am",
//     "month" : 12,
//     "year" : 2023,
//     "count" : 0
// }
// 6-7AM, 7-8AM, 8-9AM and 5-6PM.

// {
//     "name" : "Sachin",
//     "email" : "sch@gmail.com",
//     "phone" : "1234567890",
//     "batchId" : "65800c0f15371de32478dd7e"
//     "month" : 12,
//     "year": 2023,
// }

const BatchSchema = new mongoose.Schema({
    timing:{
        type: String,
        required: true,
    },
    month:{
        type: Number,
        required: true,
    },
    year:{
        type: Number,
        required: true,
    },
    count:{
        type: Number,
        required: true,
    }
});

const Batch = mongoose.model("batch", BatchSchema);

module.exports = Batch;