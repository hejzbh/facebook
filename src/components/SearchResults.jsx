import React from "react";
import styled from "styled-components";
// Images
import noProfilePhoto from "../images/noProfilePhoto.jpg";
// Colors
import { colors } from "../utils/colors";
// Rotuer
import { Link } from "react-router-dom";

export const SearchResults = ({ results }) => {
  return (
    <SearchResultsContainer>
      {results.map((user) => (
        <Link
          to={`/profile?user=${user.displayName.split(" ").join("+")}`}
          state={{
            userID: user.id,
          }}
        >
          <SearchedUser>
            <img
              className={`w-full max-w-[50px] rounded-[50%]`}
              src={user.photoURL || noProfilePhoto}
            />
            <p>{user.displayName}</p>
          </SearchedUser>
        </Link>
      ))}
    </SearchResultsContainer>
  );
};

const SearchResultsContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 3rem;
  box-shadow: 14px 12px -8px 4px rgba(000, 000, 000, 0.8);
  background: ${colors.ultraLightGray};
`;

const SearchedUser = styled.div`
  width: 100%;
  padding: 1em 0.5em;
  display: grid;
  grid-template-columns: 20% 80%;
  grid-gap: 2rem;
  align-items: center;
  cursor: pointer;
`;
