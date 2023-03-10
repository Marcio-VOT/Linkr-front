import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { StyledSearchInput, StyledSearchList } from "./StyledSearchInput";
import { searchApi } from "../../services/search";
import { Link } from "react-router-dom";

export const SearchInput = ({ search, setSearch }) => {
  const [userList, setUserList] = useState([]);
  return (
    <StyledSearchInput>
      <DebounceInput
        data-test="search"
        value={search}
        debounceTimeout={300}
        onChange={(e) => {
          e.target.value.length < 3 && setUserList([]);
          if (e.target.value.length >= 3) {
            setSearch(e.target.value);
            e.target.value.length >= 3 &&
              searchApi(e.target.value)
                .then(({ data }) => {
                  data[0] ? setUserList((newlist) => data) : setUserList([]);
                })
                .catch((err) => {
                  alert(err);
                });
          }
        }}
        type="text"
        placeholder="Search for people"
      />
      {userList[0] && (
        <StyledSearchList>
          {userList.map((u) => {
            return (
              <Link to={`/user/${u.id}`} key={u.id} data-test="user-search">
                <div
                  onClick={() => {
                    setSearch("");
                    setUserList([]);
                  }}
                >
                  <img src={u.profile_picture} alt={u.name} />
                  <h1>{u.name} </h1>
                </div>
              </Link>
            );
          })}
        </StyledSearchList>
      )}
    </StyledSearchInput>
  );
};
