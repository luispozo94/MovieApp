const express = require('express');
const axios = require('axios');
const movieController = {};
const movieModel = require('./models/movieModel');
//created a controller that will fetch the movies from the api
movieController.getMovies = async (req, res, next) => {
	try {
		const url = `https://www.omdbapi.com/?s=${req.params.name}&apikey=d636296e`;
		const response = await axios.get(url);
		res.locals.movies = response.data;
		next();
	} catch (error) {
		console.error(error);
	}
};

//created a middleware that will save addFavs to the database
movieController.addFavs = async (req, res, next) => {
	//assign the data that is saved to the req.body which is coming form the DB
	const { favs } = req.body;
	//created a label to store an instance of the schema model with findOne
	const movieStore = await movieModel.findOne({});
	//!if i have a movie stored in the DATABASE, then grab the favorites and parse it
	if (movieStore) {
		const currentFavorites = JSON.parse(movieStore.favorites);
		//check if the currentFavorites is an array to get the correct data format
		if (Array.isArray(currentFavorites)) {
			//handling if i have duplicates if so dont add it to the database
			const duplicatedHash = {};
			//spread the currentFavorites  AND added the newly added favs
			let merged = [...currentFavorites, ...favs];
			//filtered out the favorites by ID. If i have a match return false else return true and add it to the database
			merged = merged.filter((favorite) => {
				if (!duplicatedHash[favorite.imdbID]) {
					duplicatedHash[favorite.imdbID] = true;
					return true;
				}
				return false;
			});
			//if its true add merged to movieStore 
			movieStore.favorites = JSON.stringify([...merged]);
		} else {
			//else if theres no matching movies add favs to movieStore
			movieStore.favorites = JSON.stringify([...favs]);
		}
		//saving movieStore to the database
		movieStore.save();
		//assigning  the movieStore favorites to res.locals
		res.locals.favs = movieStore.favorites;
	} else {
		//if theres is a movie 
		try {
			const savedFavs = await movieModel.create({ favorites: JSON.stringify(favs) }); 
			res.locals.favs = savedFavs; // assinging data to res.locals
			next();
		} catch (error) {
			console.log(error);
			return res.status(500).json(error);
		}
	}
	next();
};


//created a middleware that will get Favorites a movie from the database
movieController.getFavs = async (req, res, next) => {
	const model = await movieModel.findOne({});
	const favorites = JSON.parse(model.favorites);
	res.locals.favs = favorites;
	next();
};

//created a middleware that will delete a movie from the database
movieController.removeFavs = async (req, res, next) => {
	//deleting movies by targeting the parameter associated to the movie
	const deleteModel = await movieModel.deleteOne({favorites: req.params.movie});
	//if i have a movie delete it and re-assign the res.locals
	if (deleteModel) res.locals.favs = deleteModel;
	next();
};

module.exports = movieController;
