import React, { useEffect, useState } from "react";
import { StyledNav, StyledLogo } from "./navStyles";
import { NavUser } from "../NavUser/NavUser";
import { SearchInput } from "../SearchInput/SearchInput";

export const NavBar = () => {
  const [search, setSearch] = useState("");
  const [log, setLog] = useState(true);

  useEffect(() => {}, []);
  return (
    <StyledNav search={search}>
      <StyledLogo>linkr</StyledLogo>
      <SearchInput search={search} setSearch={setSearch} />
      <NavUser log={log} setLog={setLog} />
    </StyledNav>
  );
};
