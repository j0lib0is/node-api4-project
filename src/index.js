const express = require('express');
const server = express();

require('dotenv').config();
const PORT = process.env.PORT || 8080;

server.get('/api/users', (req, res) => {
	res.json({name: 'Jacob', id: 1});
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});