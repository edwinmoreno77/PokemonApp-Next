import { useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { Layouts } from "../../components/layouts";
import pokeApi from "../../api/pokeApi";
import { PokemonFull } from "../../interfaces/pokemonFull";
import { localFavorites } from "@/utils";

import confetti from "canvas-confetti";

interface Props {
  pokemon: PokemonFull;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorite, setIsInFavorite] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

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
      <Text transform="capitalize" h1>
        {pokemon.name}
      </Text>
      <Grid.Container
        css={{
          marginTop: 5,
        }}
        gap={2}
      >
        <Grid xs={12} md={4}>
          <Card isHoverable isPressable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                height={250}
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

        <Grid xs={12} sm={8}>
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
  const pokemon151 = [...Array(151)].map((_, i) => `${i + 1}`);

  return {
    paths: pokemon151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<PokemonFull>(`/pokemon/${id}`);

  https: return {
    props: {
      pokemon: data,
    }, // will be passed to the page component as props
  };
};

export default PokemonPage;
