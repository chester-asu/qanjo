import React from "react";
import { useUser } from "../../../../context/user-context";
import { useBand } from "../../../../context/band-context";

export function Home() {
  const user = useUser();
  const band = useBand();
  return (
    <div>{`Hello, ${user.username}. Are you ready to rock with ${band.name}`}</div>
  );
}
