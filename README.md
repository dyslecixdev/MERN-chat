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
### Cloning the Code
1. Open your terminal and type git clone https://github.com/christiandeandemesa/MERN-ecommerce.git
2. Cd into MERN-chat, then type git checkout 78e24351b12 to get commit before deployment.
3. To download the backend dependencies, stay in the root folder (MERN-chat) and type npm install.
4. To download the frontend dependencies, cd into the client folder and type npm install.

### Connecting to MongoDB
1. Create an account or login to [MongoDB Atlas](https://account.mongodb.com/account/login).
2. Click New Project, name your project, click Next, then Create Project.

![mongo-1](https://user-images.githubusercontent.com/85912934/214934048-4337c703-af47-4256-960c-b6043ac4550b.png)
![mongo-2](https://user-images.githubusercontent.com/85912934/214934087-982ae57b-8f36-40d2-bd7c-970161f9639f.png)
![mongo-3](https://user-images.githubusercontent.com/85912934/214934111-a393d093-dd2f-4de7-a9e5-8a9a685a15c2.png)

3. Click Build a Database, and choose the free option.

![mongo-4](https://user-images.githubusercontent.com/85912934/214934176-4c6d5942-3c14-413f-9f9d-96de5c32f14e.png)
![mongo-5](https://user-images.githubusercontent.com/85912934/214934182-f5a8cb4c-1235-4697-a951-54494b19e2e5.png)

4. Leave AWS as the Cloud Provider & Region, the region closest to where you are, and click Create Cluster.

![mongo-6](https://user-images.githubusercontent.com/85912934/214934268-7c7b1990-119a-4e74-8626-0686b9fdb2f9.png)

5. Type in a username and password, click Create User, leave it on My Local Environment, click Add My Current IP Address, then Finish and Close.

![mongo-7](https://user-images.githubusercontent.com/85912934/214934328-dc5ddf58-d9b0-4cfa-9f5b-47893806b33a.png)
![mongo-8](https://user-images.githubusercontent.com/85912934/214934354-dd442577-c84d-4021-9029-a3dddf284513.png)

6. Click Connect, Connect your application, then copy the connection string.

![mongo-9](https://user-images.githubusercontent.com/85912934/214934413-6af4411b-9ff0-4f86-a0ba-ff3461dd9e5e.png)
![mongo-10](https://user-images.githubusercontent.com/85912934/214934424-2bc5e182-874d-44e1-9b25-213a5504eaa8.png)
![mongo-11](https://user-images.githubusercontent.com/85912934/214934429-77723285-54db-4595-9477-0b9922ee72d5.png)

7. Create a .env in your root folder and add the following:
```
PORT = 5000
MONGO_URI = MongoDB connection string (Note: Don't forget to replace <password> with your password)
JWT_SECRET = Any Text Here
```

### Add Multiavatar Key
1. Create an account or login to [Multiavatar](https://multiavatar.com/login).
2. Copy Your API Access Key.

![multivatar](https://user-images.githubusercontent.com/85912934/214939683-3683a54a-af75-4f3d-8f83-c4825c265e44.png)

3. Create a .env in your client folder and add the following:
```
REACT_APP_MULTIAVATAR_KEY = Your API Access Key
```
4. Open the terminal, and type npm run dev to run both the client and server.


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

## Author
- Christian Demesa: https://github.com/christiandeandemesa
