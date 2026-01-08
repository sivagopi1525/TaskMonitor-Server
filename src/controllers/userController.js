const User = require('../models/user');

// GET /api/items
async function listUsers(req, res) {
  try {
    const Users = await User.find({}).lean();
    return res.json(Users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports={listUsers}