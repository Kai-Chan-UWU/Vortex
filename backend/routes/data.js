import express from 'express';
// Import data operation controllers
import { fetchTable, fetchRow } from '../controllers/data/read.js';
import { createRow } from '../controllers/data/create.js';
import { deleteRow } from '../controllers/data/delete.js';
import { updateRow } from '../controllers/data/update.js';

const router = express.Router();

// Log request details
router.use((req, res, next) => {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

// Extract and store 'table_name' parameter
router.param('table_name', (req, res, next, table) => {
  req.user = req.user || {};
  req.user.table = table;
  next();
});

// Extract and store 'id' parameter
router.param('id', (req, res, next, id) => {
  req.user = req.user || {};
  req.user.rowId = id;
  next();
});

// Define routes for data operations
router.get('/:table_name/:id', fetchRow);   // Get specific row
router.get('/:table_name', fetchTable);      // Get all rows in table
router.post('/:table_name', createRow);     // Create new row
router.delete('/:table_name/:id', deleteRow); // Delete specific row
router.put('/:table_name/:id', updateRow);    // Update specific row

export default router;
