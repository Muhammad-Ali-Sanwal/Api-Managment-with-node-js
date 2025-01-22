import { createContext, useState } from "react";

export const userContext = createContext<number | null>(null);

export const UserContext = (props: any) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <userContext.Provider value={count}>
        {props.children}
      </userContext.Provider>
      <button
        style={{ border: "1px solid green", padding: "2px" }}
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase
      </button>
    </>
  );
};
