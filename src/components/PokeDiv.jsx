import React from 'react';
const PokeDiv = ({ pokedata }) => {
	return (
		<div className="pokemon__container">
			{pokedata.map((el) => (
				<div key={el[0]} className="pokemon__card">
					<span className="favorite empty">⭐</span>
					<h2 className="pokemon__title">{el[0]}</h2>
					<img src={el[1]} alt="pokemon" />
				</div>
			))}
		</div>
	);
};

export default PokeDiv;
