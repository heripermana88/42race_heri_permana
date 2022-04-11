const Account = require('../models/Account');
const StravaProcessorAdapter = require('../lib/strava_processor');

exports.homePage = async (req,res)=>{
  if ('code' in req.query) {
    const stravaProcessor = new StravaProcessorAdapter();
    const exchange_token = await stravaProcessor.auth('EXCHANGE_TOKEN', req.query.code, {});
    let url = process.env.BASE_URL;
    if(exchange_token.status==200){
      url = `${url}?access_token=${exchange_token.body.access_token}`;
    }
    res.redirect(`${url}`);
  }else{
    res.send('hallo')
  }
}
