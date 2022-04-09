import Activity from '../models/Activity.js';

export const getActivities = async (req, res) => {
  try {
    const accounts = await Activity.find();
    res.json({ data: accounts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getActivityById = async (req, res) => {
  try {
    const product = await Activity.findById(req.params.id);
    res.json({ data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const saveActivity = async (req, res) => {
  const product = new Activity(req.body);
  try {
    const savedActivity = await product.save();
    res.status(201).json({ data: savedActivity });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteActivity = async (req, res) => {
  try {
    const product = await Activity.deleteOne({ _id: req.params.id });

    if (!product) throw res.json({ message: 'Activity not Found' });

    res.json({ message: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateActivity = async (req, res) => {
  const checkId = await Activity.findById({ _id: req.params.id });
  if (!checkId) return res.status(404).json({ message: 'Activity Id not Found' });
  try {
    const updateActivity = await Activity.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(201).json({ data: updateActivity });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
