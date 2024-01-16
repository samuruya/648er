const mongoose = require("mongoose");
const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String, 
            required: true,
        },
        content: {
            type: String, 
            required: true, 
        },
        autor: {
            type: String,
            required: true,
        },
    }, {
        timestamps: true,
    }
);
const newsModel = mongoose.model("News", newsSchema)
module.exports = newsModel