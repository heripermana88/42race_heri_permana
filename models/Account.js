const mongoose =require('mongoose');

const Account = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: false
  },
  resource_state: {
    type: Number,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  sex: {
    type: String,
    required: false
  },
  premium: {
    type: Boolean,
    default: false
  },
  summit: {
    type: Boolean,
    default: false
  },
  // created_at: "2022-04-08T14:47:16Z",
  // "updated_at": "2022-04-08T18:49:41Z",
  badge_type_id: {
    type: Number,
    default: 0,
    required: true
  },
  weight: {
    type: Number,
    required: false
  },
  profile_medium: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    required: true,
  },
  friend: {
    type: Number,
    required: false
  },
  follower: {
    type: Number,
    required: false
  }
})

module.exports = mongoose.model('Accounts', Account);