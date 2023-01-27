import { useState, useEffect } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { Layouts } from "../../components/layouts";
import pokeApi from "../../api/pokeApi";
import { PokemonFull } from "../../interfaces/pokemonFull";
import { localFavorites } from "@/utils";

import confetti from "canvas-confetti";
import { PokemonNameListResponse } from "@/interfaces";
import { getPokemonInfo } from "../../utils/getPokemonInfo";

interface Props {
  pokemon: PokemonFull;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorite, setIsInFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsInFavorite(localFavorites.existInFavorites(pokemon.id));
  }, []);

  const onToggleFavorites = () => {
    localFavorites.toggleFavorites(pokemon.id);
    setIsInFavorite(!isInFavorite);
    if (isInFavorite) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        y: 0,
        x: 1,
      },
    });
  };
  return (
    <Layouts title={pokemon.name}>
      <Text css={{ marginLeft: "15px" }} transform="capitalize" h1>
        {pokemon.name}
      </Text>
      <Grid.Container
        css={{
          marginTop: 5,
        }}
        gap={2}
      >
        <Grid xs={12} md={5}>
          <Card isHoverable isPressable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                height={350}
                width={"100%"}
                alt={pokemon.name}
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "./no-image.png"
                }
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={7}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text transform="capitalize" h1>
                {pokemon.name}
              </Text>
              <Button
                onPress={onToggleFavorites}
                color={isInFavorite ? "warning" : "success"}
                ghost={!isInFavorite}
              >
                {isInFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  width={100}
                  height={100}
                  alt={pokemon.name}
                  src={pokemon.sprites.front_default}
                />
                <Image
                  width={100}
                  height={100}
                  alt={pokemon.name}
                  src={pokemon.sprites.back_default}
                />
                <Image
                  width={100}
                  height={100}
                  alt={pokemon.name}
                  src={pokemon.sprites.front_shiny}
                />
                <Image
                  width={100}
                  height={100}
                  alt={pokemon.name}
                  src={pokemon.sprites.back_shiny}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layouts>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await pokeApi.get<PokemonNameListResponse>(
    `/pokemon?limit=151`
  );

  return {
    paths: data.results.map((pokemon) => ({
      params: { name: pokemon.name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  const pokemon = await getPokemonInfo(name);

  https: return {
    props: {
      pokemon,
    }, // will be passed to the page component as props
  };
};

export default PokemonByNamePage;
