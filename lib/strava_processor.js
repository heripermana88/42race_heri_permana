'use strict';
require('dotenv').config();
const request = require('superagent');

const paths = {
  auth: '/oauth',
  athlete: '/api/v3/athlete',
  activities:'/api/v3/activities'
};

const StravaProcessorAdapter = function () {
  const adapter = {
    auth: function (type, code) {
      const url = `${process.env.STRAVA_URL}${paths.auth}/token`;
      const params = {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code
      }
      switch (type) {
        case 'EXCHANGE_TOKEN':
          return handleResponse('POST', url, { args: params });
      }
    },
    athlete: function (type, access_token) {
      const url = `${process.env.STRAVA_URL}${paths.athlete}`;
      switch (type) {
        case 'ATHLETE_DETAIL':
          return handleResponse('GET', url, { access_token });
      }
    },
    activities: function (type, access_token) {
      const url = `${process.env.STRAVA_URL}${paths.activities}`;
      switch (type) {
        case 'LIST_ACTIVITIES':
          return handleResponse('GET', url, { access_token });
      }
    }
  }
  return adapter;
}

const handleResponse = (method, url, params) => {
  return new Promise(function (resolve, reject) {
    request(method, url)
      .set('Authorization', `Bearer ${params.access_token || process.env.STRAVA_ACCESS_TOKEN}`)
      .send(params.args)
      .end((error, response) => {
        console.log(response);
        if (error) {
          console.log(JSON.parse(error.response.text));
          resolve({
            status: 400,
            body: JSON.parse(error.response.text)
          });
        }
        if (response.status === 200) {
          resolve({
            status: 200,
            body: JSON.parse(response.text)
          });
        } else {
          reject(new Error('Down'));
        }
      });
  })
}

module.exports = StravaProcessorAdapter;