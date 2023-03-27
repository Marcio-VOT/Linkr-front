import React from "react";
import arrow from "../../assets/images/arrow.png";
import { LogOutButton } from "../LogOutButton/LogOutButton";
import { Overlay } from "../Overlay/Overlay";
import {
  StyledArrow,
  StyledProfilePicture,
  StyledNavUser,
} from "./StyledNavUser";

export const NavUser = ({ log, setLog }) => {

  return (
    <>
      <StyledNavUser onClick={() => {
        setLog((log) => !log);
      }}
      >
        <StyledArrow
          log={log}
          src={arrow}
          alt="arrow"
        />
        <StyledProfilePicture src={localStorage.getItem("avatar")} alt="arrow" data-test="avatar"/>
      </StyledNavUser>
      {!log && <LogOutButton />}
      {!log && <Overlay log={log} setLog={setLog}/>}
    </>
  );
};
