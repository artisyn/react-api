import React from 'react';
const PokeDiv = ({ pokedata }) => {
	console.log(pokedata);
	const openCard = (card) => {
		console.log(card);
		const name = card.querySelector('.pokemon__title').innerText;
		console.log(name);
	};
	return (
		<div className="pokemon__container">
			{pokedata.map((el) => (
				<div
					onClick={(e) => openCard(e.target)}
					className="pokemon__card"
				>
					<h2 className="pokemon__title">{el[0]}</h2>
					<img src={el[1]} alt="pokemon" />
				</div>
			))}
		</div>
	);
};

export default PokeDiv;
