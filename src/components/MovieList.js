import React from 'react';
import { Fragment } from 'react';
import { Col, Row, Carousel } from 'react-bootstrap';
//declared a functional component that will fetch the data from the API
const MovieList = (props) => {
	const MovieFavorites = props.AddFavButton;
	return (
		<Fragment>
			{props.movies &&
				props.movies.map((movie, index) => (
					<div className="image-container d-flex justify-content-start m-3" key={movie.imdbID}>
						<img src={movie.Poster} alt="movie"></img>
						<div onClick={() => props.handleFavorites(movie)} className="overlay d-flex align-items-center justify-content-center">
							<MovieFavorites />
						</div>
					</div>
				))}
		</Fragment>
	);
};
export default MovieList;
//go to app
