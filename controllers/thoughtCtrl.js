const { Thought, User } = require('../models');
// const { findOneAndUpdate } = require('../models/User');


// Get all thoughts
module.exports = {
    getThoughts(req, res) {
      Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
        },

 // Get a thought
 getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  
   // Create a thought
   createThought(req, res) {
   Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          {new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Does not exist!' });
        }
        res.json({ message: 'Created! '});
      })
      .catch((err) => res.status(500).json(err));
  },
  // update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {  $set: req.body },
      { new: true }
      )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
      
    //   res.json(thought))
    //   .catch((err) => {
    //     console.log(err);
    //     return res.status(500).json(err);
    //   });
    // },

    // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this ID' })
          : User.deleteMany({ _id: { $in: thought.users } })
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Add reaction
  createReaction(req, res){
    Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
    .then(thoughts => {
      if (!thoughts) {
          res.status(404).json({ message: 'No Thoughts Using This ID Found!' });
          return;
      }
      res.json(thoughts);
  })
  .catch(err => {
      console.log(err);
      res.status(400).json(err);
  });
      // .then(async (thought) => {
      //   return res.json(thought);
      // })
      // .catch((err) => {
      //   console.log(err);
      //   return res.status(500).json(err);
      // });
  },

  //Remove reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $pull: { reactions: { reactionId: req.body.reactionId } }
      },
      { runValidators: true, new: true }
    )
      .then(async (thought) => {
        return res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};



// const thoughtCtrl = {
//     getThoughts(req, res) {
//       Thought.find()
//         .sort({ createdAt: -1 })
//         .then((dbThoughtData) => {
//           res.json(dbThoughtData);
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(500).json(err);
//         });
//     },