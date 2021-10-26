import { Zone } from "../types/zone";
import { getLanguage } from "./getLanguage";

export const getProperDisplayName = (zone: Zone) => {
  let displayName: string;
  switch (getLanguage()) {
    case "uz":
      displayName = zone?.properties?.displayName;
      break;
    case "ru":
      displayName = zone?.properties?.displayName;
      break;
    default:
      displayName = zone?.properties?.displayName;
      break;
  }
  return displayName;
};
