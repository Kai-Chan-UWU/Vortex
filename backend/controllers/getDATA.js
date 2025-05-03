import pool from '../db/db.js'

const fetchData = async (req, res) => {
	const client = await pool.connect();
	const query = `SELECT * FROM ${req.user.query}`;
	try{
		const result = await client.query(query);
		return res.json(result.rows);
	}catch(err){
		return res.status(401).json({message: `Error Message ${err}`});
	}finally {
		client.release();
	}
}

export default fetchData;
