import express from "express";
import { getAccounts, saveAccount, updateAccount, getAccountById, deleteAccount } from '../controllers/accountController.js';
import { getActivities, saveActivity, updateActivity, getActivityById, deleteActivity } from '../controllers/activityController.js';

const router = express.Router();

router.get('/account', getAccounts);
router.get('/account/:`id', getAccountById);
router.post('/account', saveAccount);
router.patch('/account/:id', updateAccount);
router.delete('/account/:id', deleteAccount);

router.get('/activity', getActivities);
router.get('/activity/:id', getActivityById);
router.post('/activity', saveActivity);
router.patch('/activity/:id', updateActivity);
router.delete('/activity/:id', deleteActivity);

export default router;
