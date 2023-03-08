import axios from "axios";
import React, { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { StyledNav } from "./navStyles";
import { searchApi } from "../../services/search";

export const NavBar = () => {
  const [search, setSearch] = useState("");
  useEffect(() => {}, []);
  return (
    <StyledNav search={search}>
      <DebounceInput
        minLength={3}
        debounceTimeout={300}
        onChange={(e) => {
          setSearch(e.target.value);
          e.target.value.length >= 3 &&
            searchApi(e.target.value)
              .then((res) => {
                console.log(res.data);
              })
              .catch((res) => {
                console.log(res);
              });
        }}
        type="text"
        placeholder="Search for people"
      />
    </StyledNav>
  );
};
