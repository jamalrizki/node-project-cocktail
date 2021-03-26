const express = require('express');
const Thing = require('../models/thing');
const authenticate = require('../authenticate');
const cors = require('./cors');

const thingRouter = express.Router();

thingRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Thing.find()
    .then(things => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(things);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Thing.create(req.body)
    .then(thing => {
        console.log('Partner Created ', thing);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(thing);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /things');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Thing.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

thingRouter.route('/:thingId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Thing.findById(req.params.thingId)
    .then(thing => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(thing);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /things/${req.params.thingId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Thing.findByIdAndUpdate(req.params.thingId, {
        $set: req.body
    }, { new: true })
    .then(thing => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(thing);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Thing.findByIdAndDelete(req.params.thingId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = thingRouter;
