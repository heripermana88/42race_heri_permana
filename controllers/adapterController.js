require('dotenv').config();
const Account = require('../models/Account');

const StravaProcessorAdapter = require('../lib/strava_processor');

exports.getConnection = async (req, res) => {
  res.redirect(`${process.env.STRAVA_AUTH}?client_id=${process.env.STRAVA_CLIENT_ID}&redirect_uri=${process.env.BASE_URL}&response_type=code&scope=activity:read_all`);
}

exports.disConnection = async (req, res) => {

}

exports.getLoggedInAthlete = async (req, res) => {
  const stravaProcessor = new StravaProcessorAdapter();
  const getStravaAthlete = await stravaProcessor.athlete('ATHLETE_DETAIL', req.query.access_token, {});

  if(getStravaAthlete.status!=200) return res.status(400).json({ message: 'Strava Down' });

  const newAccount = athlete.body;
  const checkId = await Account.findOne({ athlete_id: newAccount.id });
  
  if(!checkId){
    newAccount.athlete_id = newAccount.id;
    const account = new Account(newAccount);
  
    try {
      const savedAccount = await account.save();
      res.status(200).json({ data: savedAccount });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }else{
    res.status(200).json({ data: checkId });
  }
}

exports.syncActivities = async (req, res) => {
  const stravaProcessor = new StravaProcessorAdapter();
  const activities = await stravaProcessor.activities('LIST_ACTIVITIES', req.query.access_token, {});
  res.json(activities.body);
}