import express from "express";
import { getAccounts, saveAccount, updateAccount, getAccountById, deleteAccount } from '../controllers/accountController.js';

const router = express.Router();

router.get('/', getAccounts);
router.get('/:id', getAccountById);
router.post('/', saveAccount);
router.patch('/:id', updateAccount);
router.delete('/:id', deleteAccount);

export default router;
