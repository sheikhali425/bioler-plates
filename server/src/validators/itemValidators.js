const { body, param, query } = require('express-validator');

const createItemRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 120 })
    .withMessage('Title cannot exceed 120 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
];

const updateItemRules = [
  param('id').isMongoId().withMessage('Invalid item id'),
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 120 })
    .withMessage('Title cannot exceed 120 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean'),
];

const itemIdRules = [param('id').isMongoId().withMessage('Invalid item id')];

const listItemRules = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be >= 1'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('limit must be between 1 and 50'),
  query('completed')
    .optional()
    .isIn(['true', 'false'])
    .withMessage('completed must be true or false'),
  query('q').optional().trim().isLength({ max: 100 }),
];

module.exports = {
  createItemRules,
  updateItemRules,
  itemIdRules,
  listItemRules,
};
