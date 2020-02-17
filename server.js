const http = require('http');
require("@babel/register");
require("@babel/polyfill");

const dotenv = require('dotenv');
      dotenv.config();

const app = require('./src/app');
const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(port);
console.log(`Server is up and running on port ${port}`)
