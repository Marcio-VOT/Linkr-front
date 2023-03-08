import React from "react";
import { Fade } from "react-reveal";
import {
  StyledLogOutButton,
  ContainerLogOutButton,
} from "./StyledLogOutButton";

export const LogOutButton = () => {
  return (
    <ContainerLogOutButton>
      <Fade top>
        <StyledLogOutButton>Logout</StyledLogOutButton>
      </Fade>
    </ContainerLogOutButton>
  );
};
