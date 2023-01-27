import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { Layouts } from "../../components/layouts";
import { PokemonFull } from "../../interfaces/pokemonFull";
import { localFavorites } from "@/utils";

import confetti from "canvas-confetti";
import { getPokemonInfo } from "../../utils/getPokemonInfo";

interface Props {
  pokemon: PokemonFull;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorite, setIsInFavorite] = useState(false);

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
              css={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Text
                size={24}
                css={{
                  marginLeft: -3,
                  marginRight: 10,
                }}
                transform="capitalize"
                h1
              >
                {pokemon.name}
              </Text>
              <Button
                size={"sm"}
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
    // fallback: false,  //404 si no existe
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  https: return {
    props: {
      pokemon,
    },
    revalidate: 86400, //60 * 60 * 24,
  };
};

export default PokemonPage;
