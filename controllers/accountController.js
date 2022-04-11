const Account = require('../models/Account');

exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json({ data: accounts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findOne({ id: req.params.id });
    res.json({ data: account });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.deleteAccount = async (req, res) => {
  const checkAccount = await Account.findOne({ id: req.params.id });
  if (!checkAccount) return res.status(404).json({ message: 'Account Id not Found' });
  try {
    const account = await Account.deleteOne({ id: req.params.id });

    if (!account) throw res.json({ message: 'Account not Found' });

    res.json({ message: account });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.saveAccount = async (req, res) => {
  const checkAccount = await Account.findOne({ id: req.body.id });
  if (checkAccount) return res.status(201).json({ data: checkAccount });

  const account = new Account(req.body);
  try {
    const savedAccount = await account.save();
    res.status(201).json({ data: savedAccount });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.updateAccount = async (req, res) => {
  const checkAccount = await Account.findOne({ id: req.params.id });
  if (!checkAccount) return res.status(404).json({ message: 'Account Id not Found' });
  try {
    const updateAccount = await Account.updateOne({ id: req.params.id }, { $set: req.body });
    res.status(201).json({ data: updateAccount });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
