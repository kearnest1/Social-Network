const { Schema, model } = require('mongoose');
const moment = require('moment');

const ThoughtSchema = new Schema(
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
    },
    reaction: [
       [ReactionSchema]
    ]
      
  },
)

  const ReactionSchema = new Schema(
      {
        reactionId: {
            type: Schema.Types.ObjectId,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            time : { type : Date, default: Date.now }
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 400
        }
    
      }
  )


  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
;

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.reduce((total, reaction) => total + reaction.replies.length + 1, 0);
});

const Thought = model('Thought', UserSchema);

module.exports = Thought;