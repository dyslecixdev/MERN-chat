# MERN Chat
A chat application where users can send messages to and view messages from other users.

![mern-chat](https://user-images.githubusercontent.com/85912934/214217640-c8d99ed8-65b6-4d3d-968c-7ccc9cb75509.png)

The backend was built with JavaScript, Node.js, Express, MongoDB, Prettier to make the code easier 
to read, Eslint (Airbnb and Prettier configurations) to find problems in the code, nodemon to 
restart the app when a server change is made, concurrently to run both the client and server 
simultaneously, bcryptjs to encrypt and decrypt the users' password, colors to make certain 
console logs pop out, cors tells the browser that the app at its origin (e.g. localhost:5000) has 
access to resources at another origin (e.g. localhost:3000), dotenv to keep certain information 
secret, express-async-handler to handle async express route exceptions, jsonwebtoken to give each 
user a unique token, and socket.io to handle real-time communication. 

The frontend utilizes Material-UI with Emotion for styling, axios for HTTP requests, react-redux, 
redux-persist, and reduxjs/toolkit to manage the logged in user's state and cart, react-router-dom to 
handle the app's web routing, Google Fonts, socket.io-client to communicate to the socket in the server, and the 
[Multiavatar API](https://multiavatar.com/) for avatar images.

## How to run this project
1. Open your terminal and type: git clone https://github.com/christiandeandemesa/MERN-ecommerce.git
2. To download the backend dependencies, cd into the mern-ecommerce folder and type: npm install
3. To download the frontend dependencies, cd into the client folder and type: npm install
4. Cd .. back to the mern-ecommerce folder, and run this project by typing: npm run dev

## Features
- User can register and log in to their account.
- Logged in user can view, edit, and delete their profile.
- Logged in user can filter all the users.
- Logged in user can send and receive messages in real-time with other users.
- Responsive web design for all portrait and landscape devices.
- Browser support for Edge/Internet Explorer.

## Upcoming Features
- Cross browser support for Chrome, Firefox, Opera, and Safari.
- Messages will be time stamped.
- Logged in user can delete sent messages.
- Place a badge on the speech bubble icon in the navbar to reflect the number of unread messages.
- Logged in user can create a new room.
- Logged in user can invite other users to their room.

## Author
- Christian Demesa: https://github.com/christiandeandemesa
