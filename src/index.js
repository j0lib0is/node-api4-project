const express = require('express');
const res = require('express/lib/response');
const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
	res.json([
		{username: 'John', password: 'password1234'},
		{username: 'Jack', password: 'password1235'},
		{username: 'Jill', password: 'password1236'}
	]);
});

server.post('/api/register', (req, res) => {
	if (req.body.username == null && req.body.password = null) {
		res.status(400).json({message: 'Looks like you are missing a username or password'});
	} else {
		res.status(201).json({
			username: req.body.username,
			password: req.body.password
		});
	}
});

server.post('/api/login', (req, res) => {
	if (req.body.username == null || !req.body.password == null) {
		res.status(400).json({message: 'Looks like you are missing a username or password'});
	} else {
		res.json({message: `Welcome back, ${req.body.username}!`});
	};
});

require('dotenv').config();
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});