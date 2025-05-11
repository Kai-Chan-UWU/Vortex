import pool from '../../db/db.js'; // PostgreSQL connection pool
import { verifyTable } from '../../utils/verify.js'; // Table validation function

// Inserts a new row into a validated table
const createRow = async (req, res) => {
  const table = req.user.table; // Target table name
  const cols = Object.keys(req.body); // Column names from request body
  const values = cols.map(col => req.body[col]); // Corresponding values
  const count = cols.length;
  const input = cols.join(', '); // Format: col1, col2, ...
  const placeholders = Array.from({ length: count }, (_, i) => `$${i + 1}`).join(', '); // Format: $1, $2, ...

  const isValid = await verifyTable(table); // Validate table
  if (!isValid) {
    return res.status(404).json({
      status: 'error',
      message: 'Invalid table name',
      data: null
    });
  }

  const client = await pool.connect(); // DB connection

  try {
    const query = `INSERT INTO ${table} (${input}) VALUES (${placeholders})`; // Insert query
    await client.query(query, values); // Execute query

    return res.status(201).json({
      status: 'success',
      message: 'Row inserted successfully',
      data: null
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to insert row',
      data: { error: err.message }
    });
  } finally {
    client.release(); // Release DB client
  }
};

export { createRow };

