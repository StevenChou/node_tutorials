const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  const steven = {name: 'Steven', age: 77, cool: true};
  // res.send('Hey! It works!');
  res.json(steven);

  // res.send(req.query.name);
  // res.json(req.query);
});

router.get('/reverse/:name', (req, res) => {
  // res.send(req.params.name);

  const reverse = [... req.params.name].reverse().join('');
  res.send(reverse);
});

module.exports = router;