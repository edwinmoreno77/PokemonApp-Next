import { Grid } from "@nextui-org/react";
import React, { FC } from "react";
import { FavoriteCard } from "./FavoriteCard";

interface Props {
  favoritesPokemon: number[];
}

export const FavoritesPokemons: FC<Props> = ({ favoritesPokemon }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {favoritesPokemon.map((id: number) => (
        <FavoriteCard id={id} key={id} />
      ))}
    </Grid.Container>
  );
};
