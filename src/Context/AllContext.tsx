import React, { createContext, useState } from "react";

export const toknContext = createContext<any>(null);

export default function AllContextProvider(props: {
  children: React.ReactNode;
}) {
  const [coutnter, setCounter] = useState(40);

  console.log("ddddd", props);

  return (
    <toknContext.Provider value={{ coutnter, setCounter }}>
      {props.children}
    </toknContext.Provider>
  );
}
