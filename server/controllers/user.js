const mongoose = require("mongoose");
const User = require("../models/User");
const Batch = require("../models/Batch");
const { sendConfirmationEmail } = require("../utils/sendEmail");


const enrollUser = async (req, res) => {
    try {
        // Check if the user is already enrolled for the specified month
        const existingUser = await User.findOne({ email: req.body.email, month: req.body.month, year: req.body.year });

        if (existingUser) {
            return res.status(400).json({ message: "User already enrolled for this month" });
        }

        // Convert batchId to ObjectId
        const batchId = new mongoose.Types.ObjectId(req.body.batchId);

        // Create a new user
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            batchId: batchId, // Use the converted batchId
            month: req.body.month,
            year: req.body.year
        });

        const updatedBatch = await Batch.findByIdAndUpdate(
            batchId,
            { $inc: { count: 1 } },
            { new: true } 
        );

        await sendConfirmationEmail(req.body); 

        res.status(200).json({ message: "User enrolled successfully", user: newUser, batch: updatedBatch });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};

// const enrollUser = async (req, res) => {
//     try {
//         // Check if the user is already enrolled for the specified month
//         const existingUser = await User.findOne({ email: req.body.email, month: req.body.month, year: req.body.year });

//         if (existingUser) {
//             return res.status(400).json({ message: "User already enrolled for this month" });
//         }

//         // Create a new user
//         const newUser = await User.create(req.body);

//         // Increment the count for the corresponding batch
//         const batchId = mongoose.Types.ObjectId(req.body.batchId); // Convert batchId to ObjectId
//         const updatedBatch = await Batch.findByIdAndUpdate(
//             batchId,
//             { $inc: { count: 1 } },
//             { new: true } // Return the updated batch
//         );

//         // sendEmail(req.body); // Uncomment if needed

//         res.status(200).json({ message: "User enrolled successfully", user: newUser, batch: updatedBatch });
//     } catch (err) {
//         res.status(500).json({ message: "Something went wrong", error: err.message });
//     }
// };


// const enrollUser = (req, res) => {
//     const user = User.findOne({ email: req.body.email, month: req.body.month, year: req.body.year });
//     if(user){
//         res.status(400).json({ message: "User already enrolled for this month" });
//     }
//     User.create(req.body)
//         .then((user)=>{
//             Batch.findByIdandUpdate(req.body.batchId, { $inc: { count: 1 } })
//                 .then((batch)=>{
//                     // sendEmail(req.body);
//                     res.status(200).json({ message: "User enrolled successfully" });
//                 })
//                 .catch((err)=>{
//                     res.status(500).json({ message: "Something went wrong" });
//                 })
//         })
//         .catch((err)=>{
//             res.status(500).json({ message: "Something went wrong" });
//         })
// };



module.exports = { enrollUser };