import { createContext, ReactElement, useState } from "react";

import { BasicObject, SetState } from "../utils/types";

export type CollContextType = {
  collection: BasicObject[];
  setCollection: SetState<BasicObject[]>;
};

export const CollectionContext = createContext<CollContextType | null>(null);

type Props = { children: ReactElement };

export function CollectionProvider({ children }: Props) {
  const [collection, setCollection] = useState<BasicObject[]>([]);

  return (
    <CollectionContext.Provider value={{ collection, setCollection }}>
      {children}
    </CollectionContext.Provider>
  );
}
