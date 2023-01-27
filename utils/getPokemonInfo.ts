import pokeApi from '../api/pokeApi';
import { PokemonFull } from '../interfaces/pokemonFull';


export const getPokemonInfo = async (nameOrId: string) => { 

  const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${nameOrId}`);

   return  {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
  };
}