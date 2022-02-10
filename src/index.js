const server = require('./api/server');

require('dotenv').config();
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});