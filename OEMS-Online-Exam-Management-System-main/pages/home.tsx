import { useSession } from "next-auth/client";
import React, { createContext, useContext, useState } from "react";
import Navbar from "./components/Navbar";
import Loading from "../src/ui-custom-components/Loading";
import Title from "../src/ui-custom-components/Title";
import Body from "./components/Body";

export const ExamCatagoryContext = createContext({
  examCatagory: "active",
  setExamCatagory: undefined,
});

function Home() {
  const [session, loading] = useSession();
  const [examCatagory, setExamCatagory] = useState<string>("active");
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "200px",
        }}
      >
        <Loading />
      </div>
    );
  } else {
    if (session) {
      return (
        //@ts-ignore
        <ExamCatagoryContext.Provider value={{ examCatagory, setExamCatagory }}>
          <Navbar />
          {/*@ts-ignore */}
          <Body examCatagory={examCatagory} />
        </ExamCatagoryContext.Provider>
      );
    }
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "200px",
        }}
      >
        <Title style={{ fontSize: "24px" }}>You are not logged in.</Title>
      </div>
    );
  }
}

export default Home;
