import React from "react";
import arrow from "../../assets/images/arrow.png";
import { LogOutButton } from "../LogOutButton/LogOutButton";
import {
  StyledArrow,
  StyledProfilePicture,
  StyledNavUser,
} from "./StyledNavUser";

export const NavUser = ({ log, setLog }) => {
  return (
    <StyledNavUser>
      <StyledArrow
        log={log}
        src={arrow}
        alt="arrow"
        onClick={() => {
          setLog((log) => !log);
        }}
      />
      <StyledProfilePicture src={arrow} alt="arrow" />
      {!log && <LogOutButton />}
    </StyledNavUser>
  );
};
