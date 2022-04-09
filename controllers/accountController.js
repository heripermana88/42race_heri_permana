import Account from '../models/Account.js';

export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json({ data: accounts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getAccountById = async (req, res) => {
  try {
    const product = await Account.findById(req.params.id);
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteAccount = async (req, res) => {
  try {
    const product = await Account.deleteOne({_id:req.params.id});

    if(!product) throw res.json({ message: 'Account not Found' });
    
    res.json({ message: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const saveAccount = async (req, res) => {
  const product = new Account(req.body);
  try {
    const savedAccount = await product.save();
    res.status(201).json({ data: savedAccount });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateAccount = async (req, res) => {
  const checkId = await Account.findById({_id:req.params.id});
  if(!checkId) return res.status(404).json({ message: 'Account Id not Found' });
  try {
    const updateAccount = await Account.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(201).json({ data: updateAccount });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
