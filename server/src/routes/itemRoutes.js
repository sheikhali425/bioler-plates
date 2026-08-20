const express = require('express');
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const {
  createItemRules,
  updateItemRules,
  itemIdRules,
  listItemRules,
} = require('../validators/itemValidators');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(listItemRules, validate, getItems)
  .post(createItemRules, validate, createItem);

router
  .route('/:id')
  .put(updateItemRules, validate, updateItem)
  .delete(itemIdRules, validate, deleteItem);

module.exports = router;
