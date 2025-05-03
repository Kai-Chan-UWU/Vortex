import express from 'express';
import fetchData from '../controllers/getDATA.js'

const router = express.Router();

router.use( (req, res, next) => {
	console.log('%s %s %s', req.method, req.url, req.path)
	next();
});

router.param('table_name', (req, res, next, table) => {
	req.user = { query: table };
	next();
});

router.get('/:table_name', fetchData);

export default router;

