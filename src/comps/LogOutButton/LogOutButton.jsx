import React from "react";
import { Fade } from "react-reveal";
import {
  StyledLogOutButton,
  ContainerLogOutButton,
} from "./StyledLogOutButton";

export const LogOutButton = () => {
  return (
    <ContainerLogOutButton>
      <StyledLogOutButton>Logout</StyledLogOutButton>
    </ContainerLogOutButton>
  );
};
