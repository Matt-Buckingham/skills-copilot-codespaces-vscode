// Create web server
// Run: node comments.js
// Test: curl -i http://localhost:3000/comments
// Test: curl -i http://localhost:3000/comments/1
// Test: curl -i -X POST -H "Content-Type: application/json" -d '{"body":"Merry Christmas!"}' http://localhost:3000/comments
// Test: curl -i -X PUT -H "Content-Type: application/json" -d '{"body":"Happy New Year!"}' http://localhost:3000/comments/1
// Test: curl -i -X DELETE http://localhost:3000/comments/1

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var comments = [
    { id: 1, author: "Pete Hunt", body: "This is one comment" },
    { id: 2, author: "Jordan Walke", body: "This is *another* comment" }
];

// Get all comments
app.get('/comments', function(req, res) {
    res.json(comments);
});

// Get comment by id
app.get('/comments/:id', function(req, res) {
    var comment = comments.filter(function(comment) {
        return comment.id == req.params.id;
    });
    if (comment.length == 1) {
        res.json(comment[0]);
    } else {
        res.status(404).json({ error: 'Comment not found' });
    }
});

// Add a new comment
var nextId = 3;
app.post('/comments', function(req, res) {
    var newComment = {
        id: nextId++,