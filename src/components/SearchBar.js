import React from 'react';

const SearchBar = (props) => {
	//update the users input
	const searchValueHandler = (e) => {
		props.setSearchValue(e.target.value);
	};
	return (
		
		<div className="col col-sm-4">
			<input className="form-control" value={props.value} onChange={searchValueHandler} placeholder="Type to search"></input>
		</div>
	);
};

export default SearchBar;
