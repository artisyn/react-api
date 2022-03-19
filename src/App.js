import './App.scss';
import Header from './components/Header.jsx';
import MainSection from './components/MainSection.jsx';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
	const [pokemon, setPokemon] = useState();
	const [pictureUrl, setPictureUrl] = useState();
	useEffect(() => {
		const getPokemons = async () => {
			try {
				const response = await axios.get(
					'https://pokeapi.co/api/v2/pokemon?limit=15'
				);
				console.log(response.data.results);
				setPokemon(response.data.results[0].name);

				const moreInfo = await axios.get(response.data.results[0].url);
				const sprite = moreInfo.data.sprites.front_default;
				console.log(moreInfo);
				console.log(sprite);
			} catch (error) {
				console.error(error);
			}
		};
		getPokemons();
	}, []);

	// const DisplayPokemons = (arr) => {

	// const c = arr.map(info => {
	// 	return `

	// 	`
	// })
	// };

	return (
		<div className="App">
			<Header />

			<MainSection />
		</div>
	);
}

export default App;
