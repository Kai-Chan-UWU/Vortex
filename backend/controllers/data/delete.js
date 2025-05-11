import pool from '../../db/db.js'; // PostgreSQL connection pool
import { verifyId } from '../../utils/verify.js'; // ID validation function

// Deletes a row by its ID from the specified table
const deleteRow = async (req, res) => {
  const table = req.user.table; // Target table name
  const rowId = req.user.rowId; // ID of row to delete
  const values = [rowId]; // Query parameter

  const isValid = await verifyId(table, rowId); // Validate row ID
  const client = await pool.connect(); // DB connection

  try {
    if (!isValid) { // If invalid ID, return error
      return res.status(404).json({
        status: 'error',
        message: 'Invalid table name or row ID',
        data: null
      });
    }

    const query = `DELETE FROM ${table} WHERE id = $1`; // DELETE query
    await client.query(query, values); // Execute delete

    return res.status(204).json(); // Success, no content
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to delete row',
      data: { error: err.message }
    });
  } finally {
    client.release(); // Release DB client
  }
};

export { deleteRow };

