const { selectTopics } = require('../models/models');

exports.getHealthCheck = (req, res, next) => {
    res.status(200).send({ message: 'All OK'});
}

exports.getAllTopics = (req, res, next) => {
    selectTopics().then((topics) => {
        res.status(200).send({ topics });
    }).catch(next)
}
