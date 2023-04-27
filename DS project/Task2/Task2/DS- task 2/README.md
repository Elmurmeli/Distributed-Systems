# Distributed systems project

Installation guidelines
This project was done with node version 19.6.0
Get the source code from this project and copy it to a folder on your computer.
Then install the dependencies by running the next script in the root folder terminal:

npm install
 
MongoDB database can be accessed with this connection:
“mongodb://127.0.0.1:27017/testdb”
After this, go to the root folder and run the following command in the terminal to start the server:

SET NODE_ENV=production& npm run dev:server

Then open “client” folder’s terminal and run the following command to start the frontside:

npm start
