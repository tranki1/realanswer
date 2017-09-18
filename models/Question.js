const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Create Schema
const QuestionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  avatar: {
    type: String
  },
  ageandstage: {
    type: String
  },
  topics: [{ name: String }],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  answers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      username: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Question = mongoose.model('question', QuestionSchema);
