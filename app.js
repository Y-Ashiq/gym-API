const express = require('express');
const app = express();
const port = 3000;
const fs = require("fs");


app.use(express.json())


const members = JSON.parse(fs.readFileSync('./member.json'));

app.get('/members', (req, res) => {
console.log(members);
  res.status(200).send(members);
});

app.post('/member')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})