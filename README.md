# MERN Chat
A chat application where users can send messages to, and view messages from other users.

![mern-chat-new](https://user-images.githubusercontent.com/85912934/214714421-9564bf37-9709-44bb-8158-4a976738fd36.png)

The backend was built with javascript, node.js, express, mongodb atlas,   
bcryptjs to encrypt and decrypt the users' password, colors to make certain console logs pop out, 
cors tells the browser that the app at its origin has access to resources at another origin, 
dotenv to keep certain information secret, express-async-handler to handle async express route exceptions, 
jsonwebtoken to give each user a unique token, and socket.io to handle real-time communication. 

The developer version's backend, which can be cloned in the below section, also features prettier to make the code easier to read, eslint (Airbnb and 
Prettier configurations) to find problems in the code, nodemon to restart the app when a server change is made, and concurrently to run both the client and server simultaneously.

The frontend utilizes Material-UI with Emotion for styling, axios for HTTP requests, dotenv to keep certain information secret, react-redux, 
redux-persist, and reduxjs/toolkit to manage the logged in user's state and chat rooms, react-router-dom to 
handle the app's web routing, socket.io-client to communicate to the socket in the server, and multiavatar to generate random avatar icons.

## How to run this project
1. Open your terminal and type: git clone https://github.com/christiandeandemesa/MERN-ecommerce.git
2. Cd into MERN-chat, then type git checkout 78e24351b12 to get commit before deployment.
3. To download the backend dependencies, stay in the root folder (MERN-chat) and type: npm install
4. To download the frontend dependencies, cd into the client folder and type: npm install
5. Cd .. back to the mern-ecommerce folder, and run this project by typing: npm run dev

## Features
- Apply Google Fonts styling.
- User can register and log in to their account.
- Logged in user can toggle between dark and light mode.
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

## Bugs
- The typing-started socket does not create the chat bubble on the deployed website, and the cause is currently unknown. (Note: There is no video since the absence of the feature is not noticeable).

## [MERN Chat Demo](https://mern-chat-frontend.onrender.com/register)

## Author
- Christian Demesa: https://github.com/christiandeandemesa
