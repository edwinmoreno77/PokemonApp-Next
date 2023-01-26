import { NextPage, GetStaticProps } from "next";
import { Inter } from "@next/font/google";
import { Button, Card, Grid, Row, Text } from "@nextui-org/react";

import pokeApi from "../api/pokeApi";
import { Layouts } from "../components/layouts/Layout";
import { PokemonListResponse, SmallPokemon } from "../interfaces/pokemonList";
import { PokemonCard } from "../components/pokemon";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layouts title={"Listado de Pokémons"}>
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon: SmallPokemon) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </Grid.Container>
    </Layouts>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((pokemon) => {
    const urlParts = pokemon.url.split("/");
    const id = Number(urlParts[urlParts.length - 2]);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

    return {
      ...pokemon,
      id,
      img: imageUrl,
    };
  });

  https: return {
    props: {
      pokemons,
    }, // will be passed to the page component as props
  };
};

export default HomePage;
