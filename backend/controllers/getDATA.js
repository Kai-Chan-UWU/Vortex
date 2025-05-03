import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME
});

const start = async (req, res) => {
	await client.connect();
	res.json("Connected to Server");
}

const end =  async (req, res) => {
	await client.end();
	res.json("Connection ended to Server");
}

const fetchData = async (req, res) => {
	const query = `SELECT * FROM ${req.user.query}`;
	try{
		const result = await client.query(query);
		return res.json(result.rows);
	}catch(err){
		return res.status(401).json({message: `Error Message ${err}`});
	}
}

export { start, end, fetchData };
