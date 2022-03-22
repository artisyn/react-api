import './App.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PokeDiv from './components/PokeDiv.jsx';

function App() {
	const [pokemonDetails, setPokemonDetails] = useState({});
	const [pokedata, setPokedata] = useState([]);
	const [selectedPokemon, setSelectedPokemon] = useState('');
	const [favoritePokemons, setFavoritePokemons] = useState([]);

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
			const resolvedPromises = await Promise.all(promises);
			setPokedata(resolvedPromises);
			// console.log(c);
		};

		allPokemons();
	}, []);

	useEffect(() => {
		if (selectedPokemon === '') return;
		const loadPokemonInfo = async (selectedPokemon) => {
			const request = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`
			);

			console.log(request);
			setPokemonDetails({
				name: request.data.name,
				picture: request.data.sprites.front_default,
				species: request.data.species.name,
				abilities: request.data.abilities,
				stats: request.data.stats,
			});
		};
		loadPokemonInfo(selectedPokemon);
		console.log(selectedPokemon);
	}, [selectedPokemon]);

	useEffect(() => {
		if (!favoritePokemons.length) return;
		favoritePokemons.forEach((el) => {
			if (!localStorage.getItem(el[0])) {
				localStorage.setItem(
					el[0],
					JSON.stringify({ name: el[0], image: el[1] })
				);
			}
		});
	}, [favoritePokemons]);
	// pull data from local storage;
	useEffect(() => {
		const keys = Object.keys(localStorage);
		if (!keys.length) return;
		console.log(keys);
		let arr = [];

		// populating favoritePokemons state
		for (let key of keys) {
			const pokemon = JSON.parse(localStorage.getItem(key));
			const name = pokemon.name;
			const image = pokemon.image;
			arr.push([name, image]);

			// setFavoritePokemons([...favoritePokemons, [name, image]]); // didn't work
		}
		setFavoritePokemons(arr);
	}, []);

	const favorite = (card) => {
		const name = card.querySelector('.pokemon__title').innerText;
		const image = card.querySelector('img').src;
		if (favoritePokemons.find((el) => el[0] === name)) {
			console.log('already favorited');
			return;
		}

		setFavoritePokemons([...favoritePokemons, [name, image]]);
	};

	return (
		<div className="App">
			<header>
				<h1>Pokemon List</h1>
			</header>
			<section
				className="mainSection"
				onClick={(e) => {
					if (e.target.classList.contains('pokemon__card')) {
						console.log(
							e.target.querySelector('.pokemon__title').innerText
						);
						setSelectedPokemon(
							e.target.querySelector('.pokemon__title').innerText
						);
					}
					if (e.target.classList.contains('favorite'))
						favorite(e.target.closest('.pokemon__card'));
				}}
			>
				{pokedata.length == 15 ? (
					<PokeDiv pokedata={pokedata} />
				) : (
					'loading'
				)}
			</section>
			<div className="detailed__info">
				{!pokemonDetails.name ? (
					'Please select your Pokemon )'
				) : (
					<div className="pokemon__details">
						<div className="pokemon__looks">
							<h2>{pokemonDetails.name.toUpperCase()}</h2>
							<img src={pokemonDetails.picture} alt="pokemon" />
						</div>

						<div className="pokemon__info">
							<div>
								Species:{' '}
								<span className="pokemon__species">
									{pokemonDetails.species}
								</span>{' '}
							</div>
							<div className="pokemon__abilities">
								{pokemonDetails.abilities.map((el, i) => (
									<div>
										Ability {i + 1}:{' '}
										<span className="pokemon__ability">
											{el.ability.name}
										</span>{' '}
										Slot {el.slot}
									</div>
								))}
							</div>
							<div className="pokemon__stats">
								<table>
									<tbody>
										<tr>
											<th>Stat name</th>{' '}
											<th>Stat value</th>
										</tr>
										{pokemonDetails.stats.map((el) => (
											<tr>
												<td>{el.stat.name}</td>
												<td>{el.base_stat}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				)}
			</div>
			<h1 className="favorite__title">Your Favorite Pokemons</h1>
			<div
				className="favorite__pokemons"
				onClick={(e) => {
					if (e.target.classList.contains('favorited__pokemon')) {
						const name = e.target.querySelector('h2').innerText;
						console.log(name);
						let erasePokemon = window.confirm(
							`Remove ${name.toUpperCase()} from favorites?`
						);
						if (erasePokemon) {
							localStorage.removeItem(name);
							setFavoritePokemons(
								favoritePokemons.reduce((accu, el) => {
									if (el[0] !== name) accu.push(el);
									return accu;
								}, [])
							);
						}
					}
				}}
			>
				{favoritePokemons.length === 0 ? (
					'No favorite Pokemons yet 😟'
				) : (
					<>
						{favoritePokemons.map((el) => (
							<div key={el[0] + 1} className="favorited__pokemon">
								<h2>{el[0]}</h2>
								<img src={el[1]} alt="pokemon" />
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
}

export default App;
