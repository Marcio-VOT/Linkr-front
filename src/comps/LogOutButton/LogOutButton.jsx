import React from "react";
import { useNavigate } from "react-router-dom";
import {
  StyledLogOutButton,
  ContainerLogOutButton,
} from "./StyledLogOutButton";

export const LogOutButton = () => {
  const navigate = useNavigate()

  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("avatar")
    localStorage.removeItem("userid")
    navigate("/")
  }
  return (
    <ContainerLogOutButton onClick={logout}>
      <StyledLogOutButton>Logout</StyledLogOutButton>
    </ContainerLogOutButton>
  );
};
