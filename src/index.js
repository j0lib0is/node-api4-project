const express = require('express');
const server = express();

require('dotenv').config();
const PORT = process.env.PORT || 8080;

server.get('/api/users', (req, res) => {
	res.json([
		{name: 'John', id: 1},
		{name: 'Jack', id: 2},
		{name: 'Jill', id: 3}
	]);
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});