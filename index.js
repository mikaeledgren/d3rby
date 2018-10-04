const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'web/build')));

app.get('/api/shl/token', async (req, res) => {

  try {

    const credentials = {
      client: {
        id: 'process.env.SHL_OPEN_API_ID',
        secret: 'process.env.SHL_OPEN_API_SECRET'
      },
      auth: {
        tokenHost: 'https://openapi.shl.se/oauth2/token'
      }
    };

    const oauth2 = require('simple-oauth2').create(credentials);
    const result = await oauth2.clientCredentials.getToken();
    const accessToken = oauth2.accessToken.create(result);
    console.log(accessToken);

    return res.status(200).json(accessToken);

  } catch (error) {

    console.error('Access Token error', error.message);
    res.status(401).send();
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/web/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Express listening on ${port}`);