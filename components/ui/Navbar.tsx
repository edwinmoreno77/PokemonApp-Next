import { Spacer, Text, useTheme } from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        zIndex: 999,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0 20px",
        color: theme === "dark" ? "#000" : "#fff",
        backgroundColor:
          theme === "dark" ? "#fff" : theme?.colors.blue400.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
        alt="Pokemon"
        priority
        width={70}
        height={70}
      />
      <NextLink href={"/"} passHref>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text color="white" h2>
            P
          </Text>
          <Text color="white" h3>
            okémon
          </Text>
        </div>
      </NextLink>
      <Spacer css={{ flex: 1 }} />

      <NextLink href={"/favorites"}>
        <Text color="white" h3>
          Favoritos
        </Text>
      </NextLink>
    </div>
  );
};
