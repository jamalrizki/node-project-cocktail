const express = require('express');
const Cocktail = require('../models/cocktail');
const authenticate = require('../authenticate');
const cors = require('./cors');

const cocktailRouter = express.Router();

cocktailRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Cocktail.find()
    .then(cocktails => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(cocktails);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Cocktail.create(req.body)
    .then(cocktail => {
        console.log('Partner Created ', cocktail);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(cocktail);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /cocktails');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Cocktail.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

cocktailRouter.route('/:cocktailId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Cocktail.findById(req.params.cocktailId)
    .then(cocktail => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(cocktail);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /cocktails/${req.params.cocktailId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Cocktail.findByIdAndUpdate(req.params.cocktailId, {
        $set: req.body
    }, { new: true })
    .then(cocktail => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(cocktail);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Cocktail.findByIdAndDelete(req.params.cocktailId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = cocktailRouter;
