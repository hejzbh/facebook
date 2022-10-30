import React from "react";
// Icons
import { FaHome, FaUserFriends, FaPlay } from "react-icons/fa";
// ROuter
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../utils/colors";
const navigationLinks = [
  {
    href: "/",
    title: "Home",
    Icon: FaHome,
  },
  {
    href: "/friends",
    title: "Friends",
    Icon: FaUserFriends,
  },
  {
    href: "/videos",
    title: "Videos",
    Icon: FaPlay,
  },
];

export const HeaderNavigation = () => {
  const { pathname } = useLocation();

  return (
    <NavigationRow>
      {navigationLinks.map(({ title, Icon, href }) => (
        <Link
          to={href}
          style={{
            padding: "1em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderBottom:
              href === pathname ? `4px solid ${colors.facebookBlue}` : "none",
          }}
        >
          <Icon
            color={href === pathname ? colors.facebookBlue : "gray"}
            fontSize={24}
            style={{ marginBottom: ".3em" }}
          />
          <Text
            style={{
              color: href === pathname ? colors.facebookBlue : "gray",
            }}
          >
            {title}
          </Text>
        </Link>
      ))}
    </NavigationRow>
  );
};

// Style
const NavigationRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  flex: 3;
`;

const Text = styled.p`
  font-size: 18px;
  @media (max-width: 800px) {
    font-size: 14px;
  }
`;
