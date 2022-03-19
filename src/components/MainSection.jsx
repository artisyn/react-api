import React from 'react';
import './MainSection.scss';
import { useState, useEffect } from 'react';

const MainSection = () => {
	const GetPokemonInfo = () => {};
	return (
		<div>
			<section>
				<div className="poke__container">
					<h2>Bulbasaur</h2>
					<img
						src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
						alt="pokemon"
					/>
				</div>
			</section>
		</div>
	);
};
export default MainSection;
