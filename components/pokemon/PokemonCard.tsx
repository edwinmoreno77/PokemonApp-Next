import { Button, Card, Grid, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { SmallPokemon } from "../../interfaces/pokemonList";

interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/name/${pokemon.name}`);
  };

  const { name, id, img } = pokemon;
  return (
    <Grid xs={6} sm={4} md={3} xl={2} key={id}>
      <Card onClick={handleOnClick} isHoverable isPressable>
        <Card.Body css={{ p: 1 }}>
          <Card.Image width="90%" height={150} src={img} />
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform="capitalize">{name}</Text>
            <Text>{id}</Text>
          </Row>
        </Card.Footer>
        <Button onPress={handleOnClick} size={"sm"} color="success">
          Ver
        </Button>
      </Card>
    </Grid>
  );
};
