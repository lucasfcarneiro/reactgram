const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = new Schema(
    {
        image: String,
        title: String,
        likes: Array,
        comments: Array,
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        userName: String,
    },
    {
        timestamps: true,
    }
);

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;