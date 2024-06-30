import type { AppProps } from "next/app";
import { Provider, useSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import "../styles.css";
import "antd/dist/antd.css";

// import types
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { UserInfoType } from "../lib/types/types";
import { nullUserContext } from "./utils/helper";

// Create context for UserInformation
export const UserContext = React.createContext(nullUserContext);
//@ts-ignore
const Loader = ({ children }) => {
  const [session, loading] = useSession();
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  
  useEffect(() => {
    if (session?.user) {
      const email = session?.user?.email;
      const name = session?.user?.name;
      const adminRole = session?.adminRole;
      const imageUrl = session?.image;
      setUserInfo({
        name: name as string,
        email: email as string,
        adminRole: adminRole as boolean,
        imageUrl: imageUrl as string,
      });
    } else {
      setUserInfo(undefined);
    }
  }, [session]);

  return (
    //@ts-ignore
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </UserContext.Provider>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider
      options={{
        clientMaxAge: 0,
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <Loader>
        <Component {...pageProps} />
      </Loader>
    </Provider>
  );
}

export default MyApp;

export const dashboardRefreshTime = 5000;
export const discussionRefreshTime = 5000;
export const clarificationRefreshTime = 5000;
