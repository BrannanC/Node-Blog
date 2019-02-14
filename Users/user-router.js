const express = require('express');

const users = require('../data/helpers/userDb');

const router = express.Router();

router.get('/', (req, res) => {
    users
        .get()
        .then(user => res.status(200).json({ user }))
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "The user information could not be retrieved." })
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id
    users
        .getById(id)
        .then(user => {
            user ?
            res.status(200).json({ user })
            : res.status(404).json({ message: "The user with the specified ID does not exist." })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "The users information could not be retrieved." })
        })
});

router.get('/posts/:id', (req, res) => {
    const id = req.params.id
    users
        .getUserPosts(id)
        .then(posts => {
            posts ?
            res.status(200).json({ posts })
            : res.status(404).json({ message: "The user with the specified ID does not exist." })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "The users information could not be retrieved." })
        })
});


router.post('/', capitalize, (req, res) => {
    const body = req.body;
    if(!body.name){
        res.status(400).json({ errorMessage: "Please provide name for user." })
    } else {
        users
            .insert(body)
            .then(user => res.status(201).json({ user }))
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
});

router.delete('/:id', (req, res) => {
    users
        .remove(req.params.id)
        .then(isDel => {
            isDel ?
            res.status(204).end()
            : res.status(404).json({ message: "The user with the specified ID does not exist." });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The user could not be removed" })
        })
});

router.put('/:id', capitalize, (req, res) => {
    const changes = req.body;
    if(!changes.name){
        res.status(400).json({ errorMessage: "Please provide changes for the post." })
    } else {
        users
            .update(req.params.id, changes)
            .then(updatedUser => {
                updatedUser ?
                users
                    .getById(req.params.id)
                    .then(post => res.status(200).json({ post }))
                : res.status(404).json({ message: "The user with the specified ID does not exist." })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "The user information could not be modified." })
            })
    }
});

function capitalize(req, res, next){
    const titleCased = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
    req.body.name = titleCased;
    next();
}

module.exports = router;