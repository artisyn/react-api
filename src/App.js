import './App.scss';
import Header from './components/Header.jsx';
import MainSection from './components/MainSection.jsx';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PokeDiv from './components/PokeDiv.jsx';

function App() {
	const [pokedata, setPokedata] = useState([]);
	let allP = [];
	useEffect(() => {
		const allPokemons = async () => {
			const response = await axios.get(
				'https://pokeapi.co/api/v2/pokemon?limit=15'
			);

			const promises = response.data.results.map((el) => {
				const { url } = el;
				return (async () => {
					const { data } = await axios.get(url);
					const { name, sprites } = data;
					return [name, sprites.front_default];
				})();
			});
			const c = await Promise.all(promises);
			setPokedata(c);
			console.log(c);
		};

		allPokemons();
	}, []);

	return (
		<div className="App">
			<header>
				<h1>Pokemon List</h1>
			</header>
			<section className="mainSection">
				{pokedata.length == 15 ? (
					<PokeDiv pokedata={pokedata} />
				) : (
					'loading'
				)}
			</section>
		</div>
	);
}

export default App;
