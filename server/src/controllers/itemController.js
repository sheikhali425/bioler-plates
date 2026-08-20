const Item = require('../models/Item');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const getItems = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));
  const skip = (page - 1) * limit;

  const filter = { user: req.user._id };

  if (req.query.completed === 'true') filter.completed = true;
  if (req.query.completed === 'false') filter.completed = false;

  if (req.query.q) {
    filter.$or = [
      { title: { $regex: req.query.q, $options: 'i' } },
      { description: { $regex: req.query.q, $options: 'i' } },
    ];
  }

  const [items, total] = await Promise.all([
    Item.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Item.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: items,
    meta: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1,
    },
  });
});

const createItem = asyncHandler(async (req, res) => {
  const item = await Item.create({
    title: req.body.title,
    description: req.body.description || '',
    user: req.user._id,
  });

  res.status(201).json({ success: true, data: item });
});

const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id, user: req.user._id });

  if (!item) {
    throw new AppError('Item not found', 404);
  }

  if (req.body.title !== undefined) item.title = req.body.title;
  if (req.body.description !== undefined) item.description = req.body.description;
  if (req.body.completed !== undefined) item.completed = req.body.completed;

  const updated = await item.save();
  res.json({ success: true, data: updated });
});

const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id, user: req.user._id });

  if (!item) {
    throw new AppError('Item not found', 404);
  }

  await item.deleteOne();
  res.json({ success: true, message: 'Item deleted', id: req.params.id });
});

module.exports = { getItems, createItem, updateItem, deleteItem };
