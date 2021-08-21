import { Zone } from "../types/zone";
import { getLanguage } from "./getLanguage";

export const getProperDisplayName = (zone: Zone) => {
  let displayName: string;
  switch (getLanguage()) {
    case "uz":
      displayName = zone?.properties?.displayNameUz;
      break;
    case "ru":
      displayName = zone?.properties?.displayNameRu;
      break;
    default:
      displayName = zone?.properties?.displayNameUz;
      break;
  }
  return displayName;
};
