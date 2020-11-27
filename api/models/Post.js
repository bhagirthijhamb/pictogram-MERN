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
    body: String
})

const postSchema = new Schema({
    body: String,
    user: { type: ObjectId, ref: "User" },
    comments: [CommentSchema],
    imageUrl: { type: String, default: "no img"}
})

mongoose.model('Post', postSchema);