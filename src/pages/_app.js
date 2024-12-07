import { CartContextProvider } from "@/components/front/CartContext";
import { createGlobalStyle } from "styled-components";
import { SessionProvider, useSession } from "next-auth/react";
import "../styles/globals.css";
import { Fragment } from "react";

const GlobalStyles = createGlobalStyle`
body{
  background-color: #fff;
  padding: 0;
  margin: 0;
  font-family: "Poppins", sans-serif;
}`;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <GlobalStyles />
          <CartContextProvider>
            <Component {...pageProps} />
          </CartContextProvider>
        </Auth>
      ) : (
        <Fragment>
          <GlobalStyles />
          <CartContextProvider>
            <Component {...pageProps} />
          </CartContextProvider>
        </Fragment>
      )}
    </SessionProvider>
  );
}
function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
