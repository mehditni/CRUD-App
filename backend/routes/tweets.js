const router = require('express').Router();
let Tweet = require('../models/tweets.model');

router.route('/').get((req, res) => {
  Tweet.find()
    .then(tweets => res.json(tweets))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;

  const newTweet = new Tweet({
    username,
    description,
    
  });

  newTweet.save()
  .then(() => res.json('Tweet added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Tweet.findById(req.params.id)
    .then(tweet => res.json(tweet))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Tweet.findByIdAndDelete(req.params.id)
    .then(() => res.json('Tweet deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Tweet.findById(req.params.id)
    .then(tweet => {
      tweet.username = req.body.username;
      tweet.description = req.body.description;
   

      tweet.save()
        .then(() => res.json('Tweet updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;