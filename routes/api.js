const express = require('express');
const {
  getAccounts,
  saveAccount,
  updateAccount,
  getAccountById,
  deleteAccount
} = require('../controllers/accountController');
const {
  getActivities,
  saveActivity,
  updateActivity,
  getActivityById,
  getActivityByAthleteId,
  deleteActivity
} = require('../controllers/activityController');
const {
  getConnection,
  disConnection,
  getLoggedInAthlete,
  syncActivities
} = require('../controllers/adapterController');

const router = express.Router();

router.get('/account', getAccounts);
router.get('/account/:id', getAccountById);
router.post('/account', saveAccount);
router.patch('/account/:id', updateAccount);
router.delete('/account/:id', deleteAccount);

router.get('/activity', getActivities);
router.get('/activity/:id', getActivityById);
router.get('/activity/athlete/:id', getActivityByAthleteId);
router.post('/activity', saveActivity);
router.patch('/activity/:id', updateActivity);
router.delete('/activity/:id', deleteActivity);

router.get('/get-connect', getConnection);
router.get('/dis-connect', disConnection);
router.get('/logged-in-athlete', getLoggedInAthlete);
router.get('/sync-activities', syncActivities); 

module.exports = router;
