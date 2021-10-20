const express = require('express');
const router = express.Router(); //get route for end point
const movieController = require('../controllers');//imported


//created  a route for a  get request that will get the movies from the middleware
router.get('/movie/:name', movieController.getMovies, (req, res) => {
	res.status(200).json(res.locals);
});

//created a route for a POST REQUEST that will add the addFavs to the DB
router.post('/favs', movieController.addFavs, (req, res) => {
	return res.status(200).json({ favs: res.locals.favs });
});

//created a route fro a GET REQUEST that will GET the addFavs from the DB
router.get('/favs', movieController.getFavs, (req, res) => {
	return res.status(200).json({ favs: res.locals.favs });
})

//created a route for a Delete Request, will delete a favorite from DB
router.delete('/favs/:movie', movieController.removeFavs, (req, res) => {
	return res.status(200).json({ favs: res.locals.favs });
});

module.exports = router;
