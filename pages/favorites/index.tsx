import { useEffect, useState } from "react";
import { Layouts } from "../../components/layouts/Layout";
import { NoFavorites } from "@/components/ui";
import { localFavorites } from "@/utils";
import { FavoritesPokemons } from "@/components/pokemon/FavoritesPokemons";

const FavoritesPage = () => {
  const [favoritesPokemon, setFavoritesPokemon] = useState<number[]>([]);

  useEffect(() => {
    setFavoritesPokemon(localFavorites.pokemons);
  }, []);

  return (
    <Layouts title="Pokémons - Favoritos">
      {favoritesPokemon.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritesPokemons favoritesPokemon={favoritesPokemon} />
      )}
    </Layouts>
  );
};

export default FavoritesPage;
