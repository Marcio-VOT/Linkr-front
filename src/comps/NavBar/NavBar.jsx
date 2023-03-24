import React, { useEffect, useState } from "react";
import { StyledNav, StyledLogo, SearchContainer } from "./navStyles";
import { NavUser } from "../NavUser/NavUser";
import { SearchInput } from "../SearchInput/SearchInput";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [search, setSearch] = useState("");
  const [log, setLog] = useState(true);
  const [WindowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      console.log(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <StyledNav search={search}>
        <Link to={"/timeline"}>
          <StyledLogo>linkr</StyledLogo>
        </Link>
        {WindowWidth > 600 && (
          <SearchInput
            search={search}
            setSearch={setSearch}
            WindowWidth={WindowWidth}
          />
        )}
        <NavUser log={log} setLog={setLog} />
      </StyledNav>
      {WindowWidth <= 600 && (
        <SearchContainer>
          <SearchInput
            search={search}
            setSearch={setSearch}
            WindowWidth={WindowWidth}
          />
        </SearchContainer>
      )}
    </>
  );
};
