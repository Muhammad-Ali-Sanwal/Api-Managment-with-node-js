import { useContext } from "react";
import { userContext } from "../lib/context";

const Inner5 = () => {
  const name = useContext(userContext);
  return <div>{name}</div>;
};

export default Inner5;
