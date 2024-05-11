const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());


const members = JSON.parse(fs.readFileSync('./member.json'));
const trainers = JSON.parse(fs.readFileSync('./trainer.json'));
const newArray = JSON.parse(JSON.stringify(trainers));


app.route('/members').get()

app.get('/members', (req, res) => {
  res.json(members);
});

app.get('/members/:id', (req, res) => {

  const id = req.params.id * 1;
  const result = members.find(el => el.id === id);

  if (result === undefined) {

    res.send("sorry member not found")
  } else if (result.status == "freeze") {
    res.send("this member is not allowed to enter the gym")

  } else if (result.deleted == true) {
    res.send("sorry 'member not found");

  } else {
    res.json(result);

  }
});
app.get('/trainers/:id', (req, res) => {

  const id = req.params.id * 1;

  const result = trainers.findIndex(el => el.id === id);

  if (result == -1) {
    res.status(404).json({
      message: "sorry member not found"
    });

  } else {

    newArray[result].memberID = [];

    for (let j = result; j < members.length; j++) {

      if (trainers[result].id === members[j].trainerID) {
        newArray[result].memberID.push(members[j].id);

      }
    }

    res.json(newArray[result])



  }




});




app.patch('/members/:id', (req, res) => {

  const id = req.params.id * 1;
  const result = members.find(el => el.id === id);


  if (result === undefined) {

    res.status(404).json({
      message: "sorry member not found"
    })
  } else {

    const {
      name,
      trainerID
    } = req.body;
    const {
      from,
      to,
      cost
    } = req.body.memberShip

    result.name = name;
    result.memberShip.from = from;
    result.memberShip.to = to;
    result.memberShip.cost = cost;
    result.trainerID = trainerID;

    fs.writeFileSync('member.json', JSON.stringify(members));
    res.status(201).json({
      message: "member updated succefully"
    });

  }

})
app.patch('/trainers/:id', (req, res) => {

  const id = req.params.id * 1;
  const result = trainers.find(el => el.id === id);


  if (result === undefined) {

    res.status(404).json({
      message: "sorry trainer not found"
    })
  } else {

    const {
      name
    } = req.body;

    const {
      from,
      to
    } = req.body.duration

    result.name = name;
    result.duration.from = from;
    result.duration.to = to;


    fs.writeFileSync('trainer.json', JSON.stringify(trainers));
    res.status(201).json({
      message: "trainer updated succefully"
    });

  }

})

app.post('/members', (req, res) => {
  members.push(req.body);
  fs.writeFileSync('member.json', JSON.stringify(members));
  res.send("user added");

});

app.delete('/members/:id', (req, res) => {
  const id = req.params.id * 1;
  const index = members.findIndex(item => item.id === id);
  if (index !== -1) {
    members[index].deleted = true;
    fs.writeFileSync('./member.json', JSON.stringify(members));
    res.json({
      message: 'member soft deleted'
    });

  } else {
    res.status(404).json({
      message: 'member not found'
    });
  }
});

app.delete('/trainers/:id', (req, res) => {
  const id = req.params.id * 1;
  const index = trainers.findIndex(item => item.id === id);
  if (index !== -1) {
    trainers.splice(index, 1);
    fs.writeFileSync('./trainer.json', JSON.stringify(trainers));
    res.json({
      message: 'trainer  deleted'
    });

  } else {
    res.status(404).json({
      message: 'trainer not found'
    });
  }
});


app.get('/trainers', (req, res) => {


  for (let i = 0; i < trainers.length; i++) {
    newArray[i].memberID = [];


    for (let j = 0; j < members.length; j++) {

      if (trainers[i].id === members[j].trainerID) {
        newArray[i].memberID.push(members[j].id);

      }
    }
  }
  res.end(JSON.stringify(newArray))


})



app.post('/trainers', (req, res) => {


  trainers.push(req.body)
  fs.writeFileSync('trainer.json', JSON.stringify(trainers));
  res.send("trainer added")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})