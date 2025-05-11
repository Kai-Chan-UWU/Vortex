import pool from '../db/db.js'; // PostgreSQL connection pool

// Verifies if a given table exists in the public schema
async function verifyTable(givenTable) {
  const client = await pool.connect(); // DB connection
  try {
    const result = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    const tableNames = result.rows.map((row) => row.table_name); // Extract table names
    return tableNames.includes(givenTable); // Check table existence
  } catch (error) {
    console.error('Error fetching table names:', error);
    return false;
  } finally {
    client.release(); // Release DB client
  }
}

// Verifies if a given ID exists in a specified table
async function verifyId(givenTable, givenId) {
  const isValidTable = await verifyTable(givenTable); // Check if table exists
  if (!isValidTable) return false;

  const client = await pool.connect(); // DB connection
  try {
    const result = await client.query(`SELECT id FROM ${givenTable}`); // Get IDs from table
    const ids = result.rows.map((row) => row.id); // Extract IDs
    return ids.includes(givenId); // Check ID existence
  } catch (error) {
    console.error('Error fetching id:', error);
    return false;
  } finally {
    client.release(); // Release DB client
  }
}

export { verifyTable, verifyId }; // Export functions

