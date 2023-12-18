const mongoose = require("mongoose");
const Batch = require("../models/Batch");


const getBatch = (req, res) => {
    Batch.find({ count: { $lt: 30 } })
        .then((batch) => {
            if (batch) {
                res.status(200).json({ batch });
            } else {
                res.status(400).json({ message: "All batches are filled" });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Something went wrong" });
        })
};

// const createBatch = (req,res) => {
//     const batch = Batch.findOne({$match : { timing: req.body.timing, month: req.body.month, year: req.body.year }});
//     console.log(batch);
//     if(batch){
//         res.status(400).json({ message: "Batch already created for this month and year"});
//         return;
//     }
//     Batch.create(req.body)
//         .then((batch)=>{
//             res.status(200).json({ message: "Batch created successfully", batch });
//         })
//         .catch((err)=>{
//             res.status(500).json({ message: "Something went wrong" });
//         })
// }

const createBatch = async (req, res) => {
    try {
        // Check if a batch already exists for the specified timing, month, and year
        const existingBatch = await Batch.findOne({ timing: req.body.timing, month: req.body.month, year: req.body.year });

        if (existingBatch) {
            res.status(400).json({ message: "Batch already created for this month and year" });
        } else {
            // Create a new batch
            const newBatch = await Batch.create(req.body);
            res.status(200).json({ message: "Batch created successfully", batch: newBatch });
        }
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};




module.exports = { getBatch, createBatch };