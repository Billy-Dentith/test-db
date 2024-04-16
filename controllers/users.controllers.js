const { getUsersData } = require("../models/users.models")

exports.getUsers = (req, res, next) => {
    getUsersData().then((users) => {
        res.status(200).send({ users })
    })
}