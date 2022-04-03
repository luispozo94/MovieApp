import 'core-js';
import React, { Fragment, useEffect, useState } from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import MovieHeading from './MovieHeading';
import AddFavButton from './AddFavButton';
import DeleteFavorites from './DeleteFavorites';

const App = () => {
	const [movies, setMovie] = useState([]); //state to store movies
	const [searchValue, setSearchValue] = useState(''); //state to store user input
	const [favorites, setFavorites] = useState([]); //state to store favorites
//add  some controlsm
	//fetching the movies from the API
	const fetchingMovies = async () => {
		//when the api is first rendered it will be empty if its falsy wait....
		if (searchValue) {
			const url = `/api/movie/${searchValue}`; //send request to api end point in server
			const response = await fetch(url);
			const responseJson = await response.json();
			setMovie(responseJson.movies.Search); //Search key property is where all the movies properties live(title, description, genre, ratings)
		}
	};
	//create a POST REQUEST to ADD favorites to DB!
	const favoritePostRequest = async () => {
		const body = JSON.stringify({ favs: favorites });
		console.log(body);
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body,
		};
		await fetch('/api/favs', options);
	};

	//created a FETCH REQUEST to get the favorites from the DB!
	const fetchFavorites = async () => {
		const { favs } = await fetch('/api/favs').then((res) => res.json());
		setFavorites(favs);
	};

	const deleteFavorites = async () => {
		const { favs } = await fetch('/api/favs/movie').then((res) => res.json());
		setFavorites(favs);
	};

	//created a useEffect that will ONLY UPDATE when there is a POST REQUEST to favorites
	useEffect(() => {
		favoritePostRequest();
	}, [favorites]);

	//created a useEffect that will ONLY UPDATE when fetchFavorites updates/changes
	useEffect(() => {
		fetchFavorites();
	}, []);

	//every time their is a search request update fetching movies
	useEffect(() => {
		fetchingMovies();
	}, [searchValue]); //every time their is a search request update fetching movies

	//delete favorite
	useEffect(() => {
		deleteFavorites();
	}, [removeFavoritesHandler]);

	//created a handler function that will update the movie list once its favorite
	const handleFavorites = (movie) => {
		//assign the current state of movies and added the newly fav movies
		const newFavoritesList = [...favorites, movie];
		setFavorites(newFavoritesList); //update the state
	};

	//create a handler function that will remove favorite movie
	const removeFavoritesHandler = (movie) => {
		const deleteNewFavorites = favorites.filter((favorite) => favorite.imdbID !== movie.imdbID);
		setFavorites(deleteNewFavorites);
	};

	//lifted AddFavButton state to MovieList to render to each individual image!
	return (
		<div className="container-fluid solo-project">
			<div className="row d-flex align-items-center mt-4 mb-4">
				<MovieHeading heading="Movies" />
				<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className="row project">
				<MovieList movies={movies} handleFavorites={handleFavorites} AddFavButton={AddFavButton} />
			</div>
			{/*created a favorite heading*/}
			<div className="row d-flex align-items-center mt-4 mb-4">
				<MovieHeading heading="Favorites" />
			</div>
			{/*re use container to render the Deleted favorites  */}
			<div className="row project">
				<MovieList movies={favorites} handleFavorites={removeFavoritesHandler} AddFavButton={DeleteFavorites} />
			</div>
		</div>
	);
};

export default App;
