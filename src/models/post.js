const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    _id: Number,
    title: String, // String is shorthand for {type: String}
    author: String,
    content: String,
    // comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: { type: Boolean, default: false }
    // meta: {
    //     votes: Number,
    //     favs: Number
    // }
});

module.exports = mongoose.model('Post', postSchema);