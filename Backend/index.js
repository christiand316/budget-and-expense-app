const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hellfdsdsfao World!');
});


app.listen(3005, () => {
  console.log('asdffsdasfdc listening on port 3000');
});