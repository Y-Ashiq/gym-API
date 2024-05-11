const express = require('express');
const app = express();
const port = 3000;
const members = require('./member');
const trainers = require('./trainer');

app.use(express.json());


// const members = JSON.parse(fs.readFileSync('./member.json'));
// const trainers = JSON.parse(fs.readFileSync('./trainer.json'));
// const newArray = JSON.parse(JSON.stringify(trainers));


//members

app.route('/members').get(members.getAllmembers).post(members.postMember);
app.route('/members/:id').get(members.getMember).delete(members.deleteMember).patch(members.patchMember);

app.get('/revenue', members.getRevenue);


//trainers

app.route('/trainers').get(trainers.getAllTrainers).post(trainers.postTrainer);
app.route('/trainers/:id').get(trainers.getTrainer).delete(trainers.deleteTrainer).patch(trainers.patchTrainer);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})