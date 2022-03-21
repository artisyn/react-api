import React from 'react';
import './MainSection.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MainSection = ({ pokedata }) => {
	// useEffect(() => {
	// 	const allPokemons = async () => {
	// 		let markup = '';
	// 		const response = await axios.get(
	// 			'https://pokeapi.co/api/v2/pokemon?limit=15'
	// 		);
	// 		console.log(response.data.results);

	// 		response.data.results.forEach((element) => {
	// 			const { url } = element;

	// 			console.log(url);
	// 			const moreInfo = async () => {
	// 				const { data } = await axios.get(url);
	// 				// console.log(data);
	// 				const { name, sprites } = data;

	// 				console.log(name, sprites.front_default);

	// 				markup += `
	// 				<div className="poke__container">
	// 					<h2>${name}</h2>
	// 						<img
	// 						src="${sprites.front_default}"
	// 					alt="pokemon"
	// 				/>
	// 				</div>
	// 			`;
	// 			};
	// 			moreInfo();
	// 		});
	// 		console.log(markup);

	// 		setSectionMarkup(markup);
	// 	};

	// 	allPokemons();
	// }, []);

	return (
		<div>
			<section></section>
		</div>
	);
};
export default MainSection;
