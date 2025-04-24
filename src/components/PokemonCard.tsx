import { useEffect, useState } from 'react';
import { PokemonDetails } from '../types/pokemonTypes';
import { fetchPokemonDetails } from '../api/pokemonApi';

import './PokemonCard.css';

type PokemonCardProps = {
  name: string;
  url: string;
};

function PokemonCard({ name }: PokemonCardProps) {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchPokemonDetails(name).then((value) => {
      setPokemonDetails(value);
    });
  }, [name]);

  const imageUrl = isHovered
    ? pokemonDetails?.sprites.back_default
    : pokemonDetails?.sprites.front_default;

  return (
    <div
      className="pokemon-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="pokemon-image">
        <img src={imageUrl} alt={name} />
      </div>

      <div className="pokemon-info">
        <div>
          <p>#{String(pokemonDetails?.id).padStart(3, '0')}</p>
        </div>
        <div>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
      </div>
    </div>
  );
}

export default PokemonCard;
