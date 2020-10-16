const { Schema, model } = require('mongoose');
const moment = require('moment');

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      match: [/.+@.+\..+/]
    },
    friends: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.reduce((total, friend) => total + friend.replies.length + 1, 0);
});

const User = model('User', userSchema);

module.exports = User;
