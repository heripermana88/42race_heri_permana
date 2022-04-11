require('dotenv').config();
const Account = require('../models/Account');
const Activity = require('../models/Activity');
const StravaProcessorAdapter = require('../lib/strava_processor');

exports.getConnection = async (req, res) => {
  res.redirect(`${process.env.STRAVA_AUTH}?client_id=${process.env.STRAVA_CLIENT_ID}&redirect_uri=${process.env.BASE_URL}&response_type=code&scope=activity:read_all`);
}

exports.disConnection = async (req, res) => {
  const stravaProcessor = new StravaProcessorAdapter();
  const getStravaAthlete = await stravaProcessor.auth('DEAUTHORIZE', req.query.access_token, {});

  // if (getStravaAthlete.status != 200) return res.status(400).json({ message: 'Strava Down' });

  res.status(200).json(getStravaAthlete);
}

exports.getLoggedInAthlete = async (req, res) => {
  const stravaProcessor = new StravaProcessorAdapter();
  const getStravaAthlete = await stravaProcessor.athlete('ATHLETE_DETAIL', req.query.access_token, {});

  if (getStravaAthlete.status != 200) return res.status(400).json({ message: 'Strava Down' });

  const newAccount = getStravaAthlete.body;
  const checkId = await Account.findOne({ id: newAccount.id });

  if (!checkId) {
    const account = new Account(newAccount);

    try {
      const savedAccount = await account.save();
      res.status(200).json({ data: savedAccount });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(200).json({ data: checkId });
  }
}

exports.syncActivities = async (req, res) => {
  const stravaProcessor = new StravaProcessorAdapter();
  const getActivities = await stravaProcessor.activities('LIST_ACTIVITIES', req.query.access_token, {});
  if (getActivities.status != 200) return res.status(400).json({ message: 'Strava Down' });

  const activities = getActivities.body;

  const start = new Date();
  const end = new Date();

  start.setDate(start.getDate() - 3);

  const filtered = await activities.filter(act => {
    let date = new Date(act.start_date).getTime();
    return date >= start && date <= end;
  });

  filtered.map(async act => {
    const checkId = await Activity.findOne({ id: act.id });

    if (!checkId) {
      const activity = new Activity(act);
      await activity.save();
    }
  })

  res.json(filtered);
}