const server = require ('./server');
const express = require('express');
const app = express();

require('dotenv').config();
app.use(express.static(path.join(__dirname, 'client/build')));

const port = process.env.PORT || 4000;

const path = require('path')
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

//start server
app.listen(port, (req, res) => {
  console.log( `server listening on port: ${port}`);
})

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:4000 ***\n`);
});