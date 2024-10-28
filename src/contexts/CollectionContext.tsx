import { createContext, ReactElement, useState } from "react";

import { SetState } from "../utils/types";

type BasicObject = {
  source: string;
  objectId: number;
};

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
