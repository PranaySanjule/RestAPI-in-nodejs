const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Import models
const Post = require('./src/models/post');

//Application
const app = express()

//DB connection
const db = mongoose.connect('mongodb://localhost:27017/Assignment-4-DB')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) { //handle the request for root route
    res.send({ ping: 'pong' })
})

//POST DATA
app.post('/posts', function (req, res) {
    const _id = req.body._id
    const title = req.body.title
    const author = req.body.author
    const content = req.body.content

    //Assign values to Post model
    var post = new Post();
    post._id = _id
    post.title = title
    post.author = author
    post.content = content
    post.save(function (error, savedPost) {
        if (error) {
            res.status(500).send({ error: 'Unable to save Post' })
        } else {
            res.status(200).send(savedPost)
        }
    })
});


//GET ALL DATA
app.get('/posts', function (req, res) {
    Post.find({}, function (error, posts) {
        if (error) {
            res.status(422).send({ error: 'Unable to fetch Posts ' })
        } else {
            res.status(200).send(posts)
        }
    })
})


//READ DATA
app.get('/posts/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const getPost = await Post.findById(_id)
        res.send(getPost);
    } catch (e) {
        res.status(400).send(e);
    }
})


//UPDATE DATA
app.patch('/posts/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updatePost = await Post.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updatePost);
    } catch (e) {
        res.status(400).send(e);
    }
})


//DELETE POST
app.delete('/posts/:id', async (req, res) => {
    try {
        const getPost = await Post.findByIdAndDelete(req.params.id);
        res.send(getPost);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.listen(3001, function () {
    console.log('Server is running at port 3001.....');
})