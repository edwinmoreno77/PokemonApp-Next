import { theme, Tooltip, Button } from "@nextui-org/react";
import React from "react";

export const Sidebar = () => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        width: "65px",
        padding: "0 20px 0 20px",
        marginTop: "70px",
        position: "fixed",
        backgroundColor: theme?.colors.blue900.value,
        zIndex: 999,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: "45px",
          position: "fixed",
          zIndex: 999,
        }}
      >
        <Tooltip
          color="error"
          content="Pokémons de tipo Fuego"
          placement="rightEnd"
        >
          <Button
            css={{
              fontSize: "13px",
              fontWeight: "bold",
              padding: "5px",
              marginTop: "25px",
              marginLeft: "-12px",
            }}
            auto
            light
            color="default"
          >
            Fuego
          </Button>
        </Tooltip>
        <Tooltip
          color="success"
          content="Pokémons de tipo Planta"
          placement="rightEnd"
        >
          <Button
            css={{
              fontSize: "13px",
              fontWeight: "bold",
              padding: "5px",

              marginTop: "25px",
              marginLeft: "-12px",
            }}
            auto
            light
            color="default"
          >
            Planta
          </Button>
        </Tooltip>

        <Tooltip
          color="warning"
          content="Pokémons de tipo Electrico"
          placement="rightEnd"
        >
          <Button
            css={{
              fontSize: "13px",
              fontWeight: "bold",
              padding: "0",
              marginTop: "25px",
              marginLeft: "-13px",
            }}
            auto
            light
            color="default"
          >
            Electrico
          </Button>
        </Tooltip>
        <Tooltip
          color="secondary"
          content="Pokémons de tipo Veneno"
          placement="rightEnd"
        >
          <Button
            css={{
              fontSize: "13px",
              fontWeight: "bold",
              padding: "4px",

              marginTop: "25px",
              marginLeft: "-15px",
            }}
            auto
            light
            color="default"
          >
            Veneno
          </Button>
        </Tooltip>
        <Tooltip
          color="primary"
          content="Pokémons de tipo Agua"
          placement="rightEnd"
        >
          <Button
            css={{
              fontSize: "13px",
              fontWeight: "bold",
              padding: "4px",

              marginTop: "25px",
              marginLeft: "-10px",
            }}
            auto
            light
            color="default"
          >
            Agua
          </Button>
        </Tooltip>
      </div>
    </section>
  );
};
