const express = require('express');
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());


const members = JSON.parse(fs.readFileSync('./member.json' , 'utf-8'));

app.get('/member', (req, res) => {
  console.log(members);
  res.status(200).send(members);
});

app.post('/member', (req, res) => {

  const data = 5;
  
  members.push(data);
  fs.writeFileSync('./member.json', JSON.stringify(data));
  res.send("ok");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})