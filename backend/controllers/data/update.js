import pool from '../../db/db.js'; // PostgreSQL connection pool
import { verifyTable } from '../../utils/verify.js'; // Table validation function

// Updates a row in a validated table
const updateRow = async (req, res) => {
  console.log("Update Row");
  const table = req.user.table; // Target table name
  const keys = Object.keys(req.body); // Column names to update
  const updates = keys.map((key, index) => `${key} = $${index + 1}`).join(', '); // Set column-value pairs
  const values = keys.map(key => req.body[key]); // Corresponding values
  values.push(req.user.rowId); // Add row ID for WHERE clause

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
    const query = `UPDATE ${table} SET ${updates} WHERE id = $${keys.length + 1}`; // Update query
    console.log(query);
    await client.query(query, values); // Execute query
    console.log('UPDATED');
    return res.status(200).json({
      status: 'success',
      message: 'Row updated successfully',
      data: null
    }); // Success message
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to update row',
      data: { error: err.message }
    }); // Error message with error details
  } finally {
    client.release(); // Release DB client
  }
};

export { updateRow };

