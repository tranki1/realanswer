const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateUserInput = require('../../validation/user');
const validatePregnancyProfileInput = require('../../validation/pregnancy-profile');
const validateParentProfileInput = require('../../validation/parent-profile');

// Load User model
const User = require('../../models/User');

// @route GET api/users/test
// @desc Tests users route
// @access public
router.get('/test', (req, res) => res.json({ msg: 'users works' }));

// @route POST api/users/register
// @desc Register users
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    //if user exist => error
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }
    //else create new user
    else {
      //using gravatar libary for node
      const avatar = gravatar.url(req.body.email, {
        s: '200', //size of the avatar
        r: 'pg', //rating of the avatar
        d: 'mm' //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        username: req.body.username,
        password: req.body.password
      });
      //hash the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user / Returning JWT token
// @access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const { errors, isValid } = validateLoginInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //Find user by email
  User.findOne({ email }).then(user => {
    //Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          username: user.username
        }; //Create JWT payload
        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 86400 }, //expires in 1 day
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/users/current
// @desc Returning current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      username: req.user.username,
      address: req.user.address,
      phone: req.user.phone,
      zipcode: req.user.zipcode,
      city: req.user.city,
      gender: req.user.gender,
      phone: req.user.phone,
      profiles: req.user.profiles
    });
  }
);

// @route POST api/users/current
// @desc create or update user information
// @access Private
router.post(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateUserInput(req.body);
    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }
    //get fields
    const email = req.user.email;
    const userFields = {};
    if (req.body.phone) userFields.phone = req.body.phone;
    if (req.body.gender) userFields.gender = req.body.gender;
    if (req.body.address) userFields.address = req.body.address;
    if (req.body.city) userFields.city = req.body.city;
    if (req.body.zipcode) userFields.zipcode = req.body.zipcode;

    User.findOne({ email }).then(user => {
      //if user exist
      if (user) {
        //Update
        User.findOneAndUpdate(
          { email: req.user.email },
          { $set: userFields },
          { new: true }
        ).then(user => res.json(user));
      } else {
        //return error
        errors.user = 'no user';
        res.status(400).json(errors);
      }
    });
  }
);

// @route GET api/users/username/:username
// @desc Get user information by username
// @access Public
router.get('/username/:username', (req, res) => {
  const errors = {};
  User.findOne({ username: req.params.username })
    .then(user => {
      if (!user) {
        errors.user = 'No user';
        res.status(404).json(errors);
      }
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        address: user.address,
        phone: user.phone,
        zipcode: user.zipcode,
        city: user.city,
        gender: user.gender,
        phone: user.phone
      });
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
