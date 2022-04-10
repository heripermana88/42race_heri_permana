const Activity = require('../models/Activity');

exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json({ data: activities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    res.json({ data: activity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.saveActivity = async (req, res) => {
  const activity = new Activity(req.body);
  try {
    const savedActivity = await activity.save();
    res.status(201).json({ data: savedActivity });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.deleteOne({ _id: req.params.id });

    if (!activity) throw res.json({ message: 'Activity not Found' });

    res.json({ message: activity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateActivity = async (req, res) => {
  const checkId = await Activity.findById({ _id: req.params.id });
  if (!checkId) return res.status(404).json({ message: 'Activity Id not Found' });
  try {
    const updateActivity = await Activity.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(201).json({ data: updateActivity });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
