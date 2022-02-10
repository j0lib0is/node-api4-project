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
	const newUser = {
		username: req.body.username,
		password: req.body.password
	};
	res.status(201).json(newUser);
});

server.post('/api/login', (req, res) => {
	if (!req.body.username || !req.body.password) {
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