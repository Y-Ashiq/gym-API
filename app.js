const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());


const members = JSON.parse(fs.readFileSync('./member.json'));
const trainers = JSON.parse(fs.readFileSync('./trainer.json'));


app.get('/members', (req, res) => {
  res.send(members);
});

app.get('/members/:id', (req, res) => {

  const id = req.params.id * 1;
  const result = members.find(el => el.id === id);

  if (result === undefined) {

    res.send("sorry this member not here")
  } else if (result.status == "freeze") {
    res.send("this member is not allowed to enter the gym")

  } else {
    res.json(result);

  }
});




app.patch('/members/:id', (req, res) => {

  const id = req.params.id * 1;
  const result = members.find(el => el.id === id);


  if (result === undefined) {

    res.status(404).json({
      message: "sorry this member not here"
    })
  } else {

    const name = req.body.name;
    const fromMembership = req.body.memberShip.from;
    const toMembership = req.body.memberShip.to;
    const cost = req.body.memberShip.cost;
    const trinerID = req.body.trinerID;


    result.name = name;
    result.memberShip.from = fromMembership;
    result.memberShip.to = toMembership;
    result.memberShip.cost = cost;
    result.trinerID = trinerID;

    fs.writeFileSync('member.json', JSON.stringify(members));
    res.status(201).json({
      message: "member updated succefully"
    });




  }



})

app.get('/trainers', (req, res) => {

  res.send(trainers);
})


app.post('/trainers', (req, res) => {


  trainers.push(req.body)
  fs.writeFileSync('trainer.json', JSON.stringify(trainers));
  res.send("trainer added")
})

app.post('/members', (req, res) => {
  members.push(req.body);
  fs.writeFileSync('member.json', JSON.stringify(members));
  res.send("user added");

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})