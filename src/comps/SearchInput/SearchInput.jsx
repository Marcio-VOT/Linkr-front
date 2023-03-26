import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { StyledSearchInput, StyledSearchList } from "./StyledSearchInput";
import searchServices from "../../services/search";
import UserSearch from "../UserSearch/UserSearch";

export const SearchInput = ({ search, setSearch, WindowWidth }) => {
  const [userList, setUserList] = useState([]);
  const {searchApi} = searchServices()
  return (
    <StyledSearchInput WindowWidth={WindowWidth}>
      {userList[0] && (
        <StyledSearchList>
          {userList.map((u) => <UserSearch id={u.id} key={u.id} name={u.name} profile_picture={u.profile_picture} setSearch={setSearch} setUserList={setUserList}/>)}
        </StyledSearchList>
      )}
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
    </StyledSearchInput>
  );
};
