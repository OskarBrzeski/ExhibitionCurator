import { createContext, ReactElement, useState } from "react";
import { SetState } from "../utils/types";

export type CollContextType = {
  collection: number[];
  setCollection: SetState<number[]>;
};

export const CollectionContext = createContext<CollContextType | null>(null);

type Props = { children: ReactElement };

export function CollectionProvider({ children }: Props) {
  const [collection, setCollection] = useState<number[]>([]);

  return (
    <CollectionContext.Provider value={{ collection, setCollection }}>
      {children}
    </CollectionContext.Provider>
  );
}
