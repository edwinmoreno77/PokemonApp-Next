import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Navbar } from "../ui";

//extender propsWithChildren para que acepte cualquier tipo de componente

interface Props extends PropsWithChildren {
  title?: string;
}

export const Layouts: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Edwin Moreno" />
        <meta
          name="description"
          content={`Información sobre el pokémon:${title}`}
        />
        <meta
          name="keywords"
          content={`${title}, pokemon, pokémon, pokedex, pokédex`}
        />
      </Head>

      <Navbar />
      <main
        style={{
          padding: "0 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
