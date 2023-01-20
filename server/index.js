const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const http = require('http'); // Imports the http module for an http server.
const {Server} = require('socket.io'); // Imports the server from socket.io.
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// express.json() parses incoming JSON object requests and places the data in req.body.
app.use(express.json());
// express.urlencoded parses incoming urlencoded payload requests (e.g. strings or arrays).
// {extended: false} signifies the req.body object will only contain strings.
app.use(express.urlencoded({extended: false}));
// cors allows the express server to respond to preflight requests.
// A preflight request is sent before an actual request to see which actual requests the express server accepts.
// {credentials: true} allows all requests from the origins.
app.use(cors({credentials: true, origins: 'http://localhost:5000'}));

app.use('/users', require('./routes/userRoute'));
app.use('/chats', require('./routes/chatRoutes'));

// Creates an http server using the app.
const httpServer = http.createServer(app);
// Socket.io's server takes the http server and its own cors origin to the client.
const io = new Server(httpServer, {
	cors: {
		origin: ['http://localhost:3000']
	}
});

// Whenever a user connects to the socket.io server...
io.on('connection', socket => {
	// Logs that the user is connected.
	console.log('User connected'.white.bgBlue);

	// The user joins the room and logs it.
	socket.on('join-room-from-server', ({chatRoom}) => {
		socket.join(chatRoom);
		console.log(`User joined a room with ${chatRoom}`.white.bgYellow);
	});

	// The user leaves the room and logs it.
	socket.on('leave-room-from-server', ({chatRoom}) => {
		socket.leave({chatRoom});
		console.log(`User left a room with ${chatRoom}`.white.bgYellow);
	});

	// Logs that the user is disconnected.
	socket.on('disconnect', () => {
		console.log('User left'.white.bgRed);
	});
});

httpServer.listen(port, () => console.log(`Server started on port ${port}`.black.bgCyan.italic));
