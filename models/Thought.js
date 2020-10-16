const { Schema, model } = require('mongoose');
const moment = require('moment');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      time : { type : Date, default: Date.now }

    },
    userName: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
      
  },
  

({
    toJSON: {
      getters: true
    },
    id: false
  }));

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.reduce((total, reaction) => total + reaction.replies.length + 1, 0);
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;