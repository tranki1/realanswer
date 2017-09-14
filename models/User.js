const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
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
  avatar: {
    type: String
  },
  profiles: {
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
    ]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);
