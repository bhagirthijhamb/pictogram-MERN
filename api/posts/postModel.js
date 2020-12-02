const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const CommentSchema = new Schema({
    text: String
})

const postSchema = new Schema({
    text: String,
    author: { type: ObjectId, ref: "User" },
    comments: [CommentSchema],
    imageUrl: { type: String, required: true}
})

module.exports = mongoose.model('Post', postSchema);