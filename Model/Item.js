const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    isComplete: {
        type: Boolean,
        required: true,
        default: false,
    },
    expirationDate: {
        type: Date,
        required: true,
        default: Date.now
    }

},{versionKey: false});

module.exports = mongoose.model("Item", ItemSchema);

