import React, { useEffect, useState } from "react";
import { StyledNav, StyledLogo } from "./navStyles";
import { NavUser } from "../NavUser/NavUser";
import { SearchInput } from "../SearchInput/SearchInput";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [search, setSearch] = useState("");
  const [log, setLog] = useState(true);

  useEffect(() => {}, []);
  return (
    <StyledNav search={search}>
      <Link to={"/timeline"}>
        <StyledLogo>linkr</StyledLogo>
      </Link>
      <SearchInput search={search} setSearch={setSearch} />
      <NavUser log={log} setLog={setLog} />
    </StyledNav>
  );
};
