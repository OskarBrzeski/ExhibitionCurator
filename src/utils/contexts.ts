import { useContext } from "react";

import {
  CollContextType,
  CollectionContext,
} from "../contexts/CollectionContext";

export function useCollection(): CollContextType {
  return useContext(CollectionContext) as CollContextType;
}
