import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../utils/colors";
// Components
import { SearchResults } from "./SearchResults";
// Utils
import SearchUsers from "../utils/SearchUsers";

export const Search = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!input) return;

    const delay = setTimeout(async () => {
      const users = await SearchUsers(input);
      setSearchResults(users);
    }, 1000);

    return () => clearTimeout(delay);
  }, [input]);

  return (
    <SearchContainer>
      <Input
        placeholder="Search Facebook"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {searchResults.length > 0 && <SearchResults results={searchResults} />}
    </SearchContainer>
  );
};

// Style
const SearchContainer = styled.div`
  width: 100%;
  position: relative;
`;
const Input = styled.input`
  width: 100%;
  max-width: 300px;
  border-radius: 18px;
  padding: 1em;
  background: ${colors.ultraLightGray};
  outline: 0;
  transition: 250ms ease all;

  &:focus {
    border: 1px solid ${colors.facebookBlue};
  }
`;
