const server = require ('./server');
const express = require('express');

require('dotenv').config();
server.use(express.static(path.join(__dirname, 'client/build')));

const port = process.env.PORT || 4000;

const path = require('path')
// Serve static files from the React frontend app
server.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:4000 ***\n`);
});