const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

//Load Profile model
const Profile = require('../../models/Profile');

//Load User Profile
const User = require('../../models/User');

//load input validaton
const validateProfileInput = require('../../validation/profile');

// @route GET api/profile/test
// @desc Tests profile route
// @access public

router.get('/test', (req, res) => res.json({ msg: 'profile works' }));

// @route GET api/profile/
// @desc Get current user profile
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile/
// @desc create or update user profile
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }

    //get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.phone) profileFields.phone = req.body.phone;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.address) profileFields.address = req.body.address;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.zipcode) profileFields.zipcode = req.body.zipcode;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create
        //Check if profile exists
        Profile.findOne({
          user: profileFields.user
        }).then(profile => {
          if (profile) {
            errors.user = 'That user information already exists';
            res.status(400).json(errors);
          }
          //Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
