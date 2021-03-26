const express = require('express');
const Instruction = require('../models/instruction');
const authenticate = require('../authenticate');
const cors = require('./cors');

const instructionRouter = express.Router();

instructionRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Instruction.find()
    .then(instructions => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(instructions);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Instruction.create(req.body)
    .then(instruction => {
        console.log('Partner Created ', instruction);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(instruction);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /instructions');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Instruction.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

instructionRouter.route('/:instructionId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Instruction.findById(req.params.instructionId)
    .then(instruction=> {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(instruction);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /instructions/${req.params.instructionId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Instruction.findByIdAndUpdate(req.params.instructionId, {
        $set: req.body
    }, { new: true })
    .then(instruction => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(instruction);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Instruction.findByIdAndDelete(req.params.instructionId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = instructionRouter;
