const mongoose = require('mongoose');

const Activity = mongoose.Schema({
  resource_state: {
    type: Number,
    required: true
  },
  athlete: {
    type: Object,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  moving_time: {
    type: Number,
    required: true
  },
  elapsed_time: {
    type: Number,
    required: true
  },
  total_elevation_gain: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  workout_type: {
    type: String,
    required: false,
    default: null
  },
  id: {
    type: Number,
    required: true
  },
  start_date: {
    type: String,
    required: true
  },
  start_date_local: {
    type: String,
    required: true
  },
  timezone: {
    type: String,
    required: true
  },
  utc_offset: {
    type: Number,
    required: true
  },
  location_city: {
    type: String,
    required: false,
    default: null
  },
  location_state: {
    type: String,
    required: false,
    default: null
  },
  location_country: {
    type: String,
    required: false,
    default: null
  },
  achievement_count: {
    type: Number,
    required: true,
    default: 1
  },
  kudos_count: {
    type: Number,
    required: true,
    default: 0
  },
  comment_count: {
    type: Number,
    required: true,
    default: 0
  },
  athlete_count: {
    type: Number,
    required: true,
    default: 1
  },
  photo_count: {
    type: Number,
    required: true,
    default: 0
  },
  map: {
    type: Object,
    required: true
  },
  trainer: {
    type: Boolean,
    required: true,
    default: true
  },
  commute: {
    type: Boolean,
    required: true,
    default: true
  },
  manual: {
    type: Boolean,
    required: true,
    default: true
  },
  manual: {
    type: Boolean,
    required: true,
    default: false
  },
  visibility: {
    type: String,
    required: true
  },
  flagged: {
    type: Boolean,
    required: true,
    default: false
  },
  gear_id: {
    type: Number,
    required: false,
    default: null
  },
  start_latlng: {
    type: Array,
    required: false,
    default: []
  },
  end_latlng: {
    type: Array,
    required: false,
    default: []
  },
  average_speed: {
    type: Number,
    required: true
  },
  max_speed: {
    type: Number,
    required: true
  },
  has_heartrate: {
    type: Boolean,
    required: true,
    default: false
  },
  heartrate_opt_out: {
    type: Boolean,
    required: true,
    default: false
  },
  display_hide_heartrate_option: {
    type: Boolean,
    required: true,
    default: false
  },
  upload_id: {
    type: Number,
    required: false,
    default: null
  },
  external_id: {
    type: Number,
    required: false,
    default: null
  },
  from_accepted_tag: {
    type: Boolean,
    required: true,
    default: false
  },
  pr_count: {
    type: Number,
    required: true
  },
  total_photo_count: {
    type: Number,
    required: true
  },
  has_kudoed: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model('Activities', Activity);