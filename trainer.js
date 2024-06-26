const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

const members = JSON.parse(fs.readFileSync('./member.json'));
const trainers = JSON.parse(fs.readFileSync('./trainer.json'));
const newArray = JSON.parse(JSON.stringify(trainers));


const getAllTrainers = (req, res) => {


    for (let i = 0; i < trainers.length; i++) {
        newArray[i].memberID = [];


        for (let j = 0; j < members.length; j++) {

            if (trainers[i].id === members[j].trainerID) {
                newArray[i].memberID.push(members[j].id);

            }
        }
    }
    res.end(JSON.stringify(newArray))


};

const postTrainer = (req, res) => {
    trainers.push(req.body)
    fs.writeFileSync('trainer.json', JSON.stringify(trainers));
    res.send("trainer added")
}

const getTrainer = (req, res) => {

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

}


const patchTrainer = (req, res) => {

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

}




const deleteTrainer = (req, res) => {
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
}

module.exports = {
    getAllTrainers,
    getTrainer,
    postTrainer,
    patchTrainer,
    deleteTrainer
}