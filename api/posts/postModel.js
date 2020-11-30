// Post
// {
//     title: 'abc nshflsf jkdsjfkdsf njd',
//     body: 'kjkdfjlsdkffn kjkdfsdf jkjfsdfmdfdf jdkfsfsd',
//      likesCount: []
//      comments: [String],
//      commentCount:  
// }

// Comment
// {
//  postId: 'sdfdfdf',
//  body: 'sdd  dfdsfdsf gsdfsdf'
//  createdAt
// }
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const CommentSchema = new Schema({
    text: String
})

const postSchema = new Schema({
    text: String,
    user: { type: ObjectId, ref: "User" },
    comments: [CommentSchema],
    imageUrl: { type: String, default: "no img"}
})

module.exports = mongoose.model('Post', postSchema);