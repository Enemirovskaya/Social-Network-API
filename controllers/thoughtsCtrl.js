const { Thought, User } = require('../models');
// const { findOneAndUpdate } = require('../models/User');


// get all thoughts
const thoughtCtrl = {
    getThoughts(req, res) {
      Thought.find()
        .sort({ createdAt: -1 })
        .then((dbThoughtData) => {
          res.json(dbThoughtData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },