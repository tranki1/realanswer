const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  conceiveprofile: [
    {
      title: {
        type: String,
        default: 'Trying to Conceive'
      }
    }
  ],
  pregnancyprofile: [
    {
      title: {
        type: String,
        default: 'Pregnant'
      },
      expecting: {
        type: String,
        required: true
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
        default: 'Parent'
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
