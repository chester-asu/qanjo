import React from "react";
import { useUser } from "../../../context/user-context";

export function Home() {
  const user = useUser();
  return <div>{`Hello, ${user.username}`}</div>;
}
