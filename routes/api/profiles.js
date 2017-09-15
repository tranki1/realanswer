const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

//Load Profile model
const Profile = require('../../models/Profile');
//Load User Profile
const User = require('../../models/User');
//load input validaton
const validateParentProfileInput = require('../../validation/parent-profile');
const validatePregnancyProfileInput = require('../../validation/pregnancy-profile');

// @route GET api/profiles/
// @desc Get current user profiles
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
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

// @route GET api/profiles/user/:user_id
// @desc Get profile by user_id
// @access Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.userid = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

// @route POST api/profiles/
// @desc create or update user profiles
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //get fields
    const profileFields = {};
    profileFields.user = req.user.id;

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
          user: req.user.id
        }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }
          //Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route POST api/profiles/parentProfile
// @desc Add or update parent profile to profiles
// @access Private
router.post(
  '/parentProfile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateParentProfileInput(req.body);
    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newParentProfile = {
        childname: req.body.childname,
        babysex: req.body.babysex,
        babybirthday: req.body.babybirthday
      };
      //Add to exp array
      profile.parentprofile.unshift(newParentProfile);
      profile.save().then(profile => res.json(profile));
    });
  }
);

module.exports = router;
