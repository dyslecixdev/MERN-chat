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
app.use(cors({origin: true}));

app.use('/users', require('./routes/userRoute'));
app.use('/chats', require('./routes/chatRoute'));
app.use('/messages', require('./routes/messageRoute'));

// Used with the below html to see if the backend is running.
app.get('/', (req, res) => res.type('html').send(html));

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
	socket.on('join-room-from-client', ({room}) => {
		socket.join(room);
		console.log(`User joined room: ${room}`.white.bgYellow);
	});

	// The user leaves the room and logs it.
	socket.on('leave-room-from-client', ({room}) => {
		socket.leave({room});
		if (!room) console.log('User left the Welcome page'.white.bgMagenta);
		else console.log(`User left room: ${room}`.white.bgMagenta);
	});

	// The user emits a send-message back to the client, then logs they sent a message.
	socket.on('send-message-from-client', ({message, room}) => {
		socket.to(room).emit('send-message-from-server', {message});
		console.log(`User sent a message to room: ${room}`.white.bgBlack);
	});

	// The user emits a typing-started and the sender's id back to the client.
	socket.on('typing-started-from-client', ({room, sender}) => {
		socket.to(room).emit('typing-started-from-server', {sender});
	});

	// The user emits a typing-stopped back to the client.
	socket.on('typing-stopped-from-client', ({room}) => {
		socket.to(room).emit('typing-stopped-from-server');
	});

	// Logs that the user is disconnected.
	socket.on('disconnect', () => {
		console.log('User left'.white.bgRed);
	});
});

httpServer.listen(port, () => console.log(`Server started on port ${port}`.black.bgCyan.italic));

const title = 'MERN Chat Frontend';
const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`;
