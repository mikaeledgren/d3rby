const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'web/build')));

app.get('/api/shl/token', (req, res) => {
  res.json({'nisse': 'hej'});
  console.log(`responded!`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/web/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Express listening on ${port}`);