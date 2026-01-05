const item = require('../models/item');
const Item = require('../models/item');


// GET /api/items
async function listItems(req, res) {
  try {
    const items = await Item.find({}).lean();
    return res.json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}


async function getitemswithfilter(req, res) {
  try {
    const { startDate, endDate, userId } = req.query;
    let filter = {};

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      filter.createdAt = {
        $gte: start,
        $lte: end
      };
    }

    let result = await Item.find(filter);

    if (userId) {
      result = result.filter(e => String(e.userId) === String(userId));
    }

    res.status(200).json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}









// GET /api/items/?id=
async function getItem(req, res) {
  try {
    const [item] = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Invalid ID' });
  }
}


// POST /api/items
async function createItem(req, res) {
  try {
    const { Task, Priority, Workinghours, Name, Date } = req.body;
    const item = new Item({ Task, Priority, Workinghours, Name, Date });
    await item.save();
    return res.status(201).json(item);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Bad request' });
  }
}


// PUT /api/item/:id
async function updateItem(req, res) {
  try {
    const update = req.body;
    const item = await Item.findByIdAndUpdate(req.query.id, update, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Invalid request' });
  }
}


async function deleteItem(req, res) {
  try {
    const item = await Item.findByIdAndDelete(req.query.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid ID" });
  }
}


module.exports = { listItems, getItem, createItem, updateItem, deleteItem, getitemswithfilter };