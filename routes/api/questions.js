const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load question model
const Question = require('../../models/Question');

//Input validation
const validateQuestionInput = require('../../validation/question');

// @route GET api/questions/test
// @desc Tests question route
// @access public
router.get('/test', (req, res) => res.json({ msg: 'questions works' }));

// @route POST api/questions/
// @desc Create question
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateQuestionInput(req.body);
    //check validation
    if (!isValid) {
      //if any errors send 400 errors object
      return res.status(400).json(errors);
    }
    const newQuestion = new Question({
      text: req.body.text,
      username: req.user.username,
      avatar: req.user.avatar,
      user: req.user.id
    });
    newQuestion.save().then(question => res.json(question));
  }
);
module.exports = router;
