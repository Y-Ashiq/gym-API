const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());


const members = JSON.parse(fs.readFileSync('./member.json'));



const getAllmembers = (req, res) => {
    res.json(members);
};



const postMember = (req, res) => {
    members.push(req.body);
    fs.writeFileSync('member.json', JSON.stringify(members));
    res.send("member added");

}

const getMember = (req, res) => {

    const id = req.params.id * 1;
    const result = members.find(el => el.id === id);

    if (result === undefined) {

        res.send("sorry member not found")
    } else if (result.status == "freeze") {
        res.send("this member is not allowed to enter the gym")

    } else if (result.deleted == true) {
        res.status(404).send("sorry member not found");

    } else {
        res.json(result);

    }
}

const deleteMember = (req, res) => {
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
}

const patchMember = (req, res) => {

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

}
const getRevenue = (req, res) => {

    let result = 0;
    let revenue = members.forEach(el => {
        result += el.memberShip.cost;


    });
    res.json({
        revenue: result
    });

}

module.exports = {
    getAllmembers,
    getMember,
    deleteMember,
    patchMember,
    postMember,
    getRevenue
}