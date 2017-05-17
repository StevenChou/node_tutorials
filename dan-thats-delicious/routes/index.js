const express = require('express');
const router = express.Router();
const storeController = require('./../controllers/storeController');

// Do work here
router.get('/', storeController.myMiddleware, storeController.homepage);

router.get('/reverse/:name', (req, res) => {
  // res.send(req.params.name);

  const reverse = [... req.params.name].reverse().join('');
  res.send(reverse);
});

module.exports = router;