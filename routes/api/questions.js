const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load question model
const Question = require('../../models/Question');
// Load profile model
const Profile = require('../../models/Profile');

//Input validation
const validateQuestionInput = require('../../validation/question');

// @route GET api/questions/test
// @desc Tests question route
// @access public
router.get('/test', (req, res) => res.json({ msg: 'questions works' }));

// @route GET api/questions
// @desc Get questions
// @access public
router.get('/', (req, res) => {
  Question.find()
    .sort({ date: -1 })
    .then(questions => {
      res.json(questions);
    })
    .catch(err =>
      res.status(404).json({ noquestionsfound: 'No questions found' })
    );
});
// @route GET api/questions/:id
// @desc Get single question by id
// @access public
router.get('/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => {
      res.json(question);
    })
    .catch(err =>
      res
        .status(404)
        .json({ noquestionfound: 'No question found with that id' })
    );
});

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

// @route DELETE api/questions/:id
// @desc Delete question
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Question.findById(req.params.id).then(question => {
          //Check for question owner
          if (question.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }
          //Delete
          question.remove().then(() => res.json({ success: true }));
        });
      })
      .catch(err =>
        res.status(404).json({ noquestionfound: 'No question found' })
      );
  }
);

// @route POST api/questions/like/:id
// @desc Like question
// @access Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Question.findById(req.params.id).then(question => {
          //Check if user liked the question or not
          if (
            question.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(404)
              .json({ alreadyliked: 'User already liked this question' });
          }
          //Add user id to likes array
          question.likes.unshift({ user: req.user.id });
          //Save to db
          question.save().then(question => res.json(question));
        });
      })
      .catch(err =>
        res.status(404).json({ noquestionfound: 'No question found' })
      );
  }
);
// @route POST api/questions/unlike/:id
// @desc Like question
// @access Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Question.findById(req.params.id).then(question => {
          //Check if user liked the question or not
          if (
            question.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(404)
              .json({ alreadyliked: 'You have not liked this question' });
          }
          //Get the remove index
          const removeIndex = question.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          //Splice out of array
          question.likes.splice(removeIndex, 1);
          //Save to db
          question.save().then(question => res.json(question));
        });
      })
      .catch(err =>
        res.status(404).json({ noquestionfound: 'No question found' })
      );
  }
);
module.exports = router;
