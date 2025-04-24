import { useEffect, useState } from 'react';
import { PokemonListResponse } from '../types/pokemonTypes';
import PokemonCard from '../components/PokemonCard';
import './HomePage.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useSearchParams } from 'react-router-dom';
import { fetchPokemonByType, fetchPokemonList } from '../api/pokemonApi';

interface Pokemon {
  name: string;
  url: string;
}

function HomePage() {
  const [pokemonList, setPokemonList] = useState<PokemonListResponse | null>(
    null
  );
  const [searchInput, setSearchInput] = useState('');

  const [searchParams] = useSearchParams();
  const selectedType = searchParams.get('type');

  useEffect(() => {
    if (selectedType) {
      fetchPokemonByType(selectedType).then((data) => {
        setPokemonList({
          results: data.pokemon.map((p: { pokemon: Pokemon }) => p.pokemon),
        });
      });
    } else {
      fetchPokemonList().then((value) => {
        setPokemonList(value);
      });
    }
  }, [selectedType]);

  return (
    <>
      <div>
        <Header input={searchInput} setInput={setSearchInput} />
      </div>
      <div className="pokemon-list">
        {pokemonList?.results
          .filter((pokemon) => pokemon.name.includes(searchInput.toLowerCase()))
          .map((singlePokemon) => (
            <Link
              key={singlePokemon.name}
              to={`/pokemon/${singlePokemon.name}`}
            >
              <PokemonCard name={singlePokemon.name} url={singlePokemon.url} />
            </Link>
          ))}
      </div>
    </>
  );
}

export default HomePage;
