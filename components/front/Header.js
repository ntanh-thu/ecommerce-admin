import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { signIn, signOut, useSession } from "next-auth/react";
import BarsIcon from "../icons/Bars";

const StyleHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyleNav = styled.nav`
  display: ${(props) => (props.mobileNavActive ? "block" : "none")};
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const ButtonStyle = styled.button`
  border: none;
  background-color: transparent;
  color: #aaa;
  cursor: pointer;
  border: 1px solid #aaa;
  border-radius: 4px;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {},
  });

  return (
    <StyleHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyleNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All Products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
            {status === "authenticated" ? (
              <NavLink href={"/account"}>
                {session.user.name.length !== 0
                  ? session.user.name
                  : session.user.email}
              </NavLink>
            ) : null}
            {status === "authenticated" ? (
              <ButtonStyle
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </ButtonStyle>
            ) : (
              <ButtonStyle
                onClick={() => {
                  signIn(undefined, { callbackUrl: "/" });
                }}
              >
                Sign In
              </ButtonStyle>
            )}
          </StyleNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyleHeader>
  );
}
