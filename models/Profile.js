const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  phone: {
    type: String,
    max: 40
  },
  address: {
    type: String,
    max: 40
  },
  city: {
    type: String,
    max: 40
  },
  gender: {
    type: String
  },
  zipcode: {
    type: String
  },
  conceiveprofile: [
    {
      title: {
        type: String,
        required: true
      }
    }
  ],
  pregnancyprofile: [
    {
      title: {
        type: String,
        required: true
      },
      expecting: {
        type: String
      },
      duedate: {
        type: Date,
        required: true
      }
    }
  ],
  parentprofile: [
    {
      title: {
        type: String,
        required: true
      },
      childname: {
        type: String
      },
      babysex: {
        type: String
      },
      babybirthday: {
        type: Date,
        required: true
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Profile = mongoose.model('profile', ProfileSchema);
