const Activity = require('../models/Activity');

exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ start_date: -1 });
    res.json({ data: activities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findOne({ id: req.params.id });
    res.json({ data: activity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getActivityByAthleteId = async (req, res) => {
  try {
    const activity = await Activity.find({ "athlete.id": parseInt(req.params.id) }).sort({ start_date: -1 });
    res.json({ data: activity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.saveActivity = async (req, res) => {
  const checkActivity = await Activity.findOne({ id: req.body.id });
  if(checkActivity) return res.status(201).json({ data: checkActivity });
  
  const activity = new Activity(req.body);
  try {
    const savedActivity = await activity.save();
    res.status(201).json({ data: savedActivity });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.deleteActivity = async (req, res) => {
  const checkActivity = await Activity.findOne({ id: req.params.id });
  if (!checkActivity) return res.status(404).json({ message: 'Activity Id not Found' });

  try {
    const activity = await Activity.deleteOne({ id: req.params.id });

    if (!activity) throw res.json({ message: 'Activity not Found' });

    res.json({ message: activity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.updateActivity = async (req, res) => {
  const checkActivity = await Activity.findOne({ id: req.params.id });
  if (!checkActivity) return res.status(404).json({ message: 'Activity Id not Found' });
  
  try {
    const updateActivity = await Activity.updateOne({ id: req.params.id }, { $set: req.body });
    res.status(201).json({ data: updateActivity });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
