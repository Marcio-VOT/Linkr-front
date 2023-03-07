import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { StyledNav } from "./navStyles";

export const NavBar = () => {
  const [search, setSearch] = useState("");
  return (
    <StyledNav search={search}>
      <DebounceInput
        minLength={3}
        debounceTimeout={300}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search for people"
      />
    </StyledNav>
  );
};
