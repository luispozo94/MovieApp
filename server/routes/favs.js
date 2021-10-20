const express = require('express');
const movieController = require('../controllers');
// const path = require('/path');
const router = express.Router();

//created a add to favorites route handler

router.post('/favs', movieController.addFavs, (req, res) => {
	return res.status(200).json({ favs: res.locals.favs });
})

//created a remove favorite movie route handler
.delete( movieController.removeMovie, (req, res) => {
  return res.status(200).json({ favs: res.locals.favs});
});

module.exports = router;
