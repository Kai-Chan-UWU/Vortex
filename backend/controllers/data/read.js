import pool from '../../db/db.js'; // PostgreSQL connection pool
import { verifyTable, verifyId } from '../../utils/verify.js'; // Table and ID validation functions

// Fetches all rows from a validated table
const fetchTable = async (req, res) => {
  const table = req.user.table; // Target table name

  const isValid = await verifyTable(table); // Validate table
  const client = await pool.connect(); // DB connection

  try {
    if (!isValid) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid table name',
        data: null
      });
    }

    const result = await client.query(`SELECT * FROM ${table}`); // Query all rows

    return res.status(200).json({
      status: 'success',
      message: 'Table data fetched successfully',
      data: result.rows
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch table data',
      data: { error: err.message }
    });
  } finally {
    client.release(); // Release DB client
  }
};

// Fetches a single row by ID from a validated table
const fetchRow = async (req, res) => {
  const table = req.user.table; // Target table name
  const rowId = req.user.rowId; // ID of row to fetch

  const isValid = await verifyId(table, rowId); // Validate table and ID
  const client = await pool.connect(); // DB connection

  try {
    if (!isValid) {
      return res.status(404).json({
        status: 'error',
        message: 'Invalid table name or row ID',
        data: null
      });
    }

    const result = await client.query(`SELECT * FROM ${table} WHERE id = $1`, [rowId]); // Query row by ID

    return res.status(200).json({
      status: 'success',
      message: 'Row fetched successfully',
      data: result.rows[0] || null // Return row or null
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch row',
      data: { error: err.message }
    });
  } finally {
    client.release(); // Release DB client
  }
};

export { fetchTable, fetchRow };

