import { DTC } from "../../dtc";
export function getSavedBand(): DTC.Band {
  const stringifiedBand = localStorage.get("band");
  if (stringifiedBand) {
    return JSON.parse(stringifiedBand);
  } else {
    return null;
  }
}
