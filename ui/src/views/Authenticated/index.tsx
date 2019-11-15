import React from "react";
import { useBand } from "../../context/band-context";
import { Band } from "./Band";
import { Join } from "./Join";

export function Authenticated() {
  return useBand() ? <Band /> : <Join />;
}
