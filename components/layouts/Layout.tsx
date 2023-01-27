import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Navbar } from "../ui";
import { Sidebar } from "../ui/Sidebar";

interface Props extends PropsWithChildren {
  title?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layouts: FC<Props> = ({ children, title }): JSX.Element => {
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
        <meta
          property="og:title"
          content={`Información sobre el pokémon:${title}`}
        />
        <meta
          property="og:description"
          content={`Esta es la pagina sobre: ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>
      <Navbar />
      <Sidebar />
      <main
        style={{
          padding: "70px 10px 10px 70px",
        }}
      >
        {children}
      </main>
    </>
  );
};
