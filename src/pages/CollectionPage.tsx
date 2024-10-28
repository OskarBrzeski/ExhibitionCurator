import { useContext } from "react";
import ObjectList from "../components/ObjectList";
import {
  CollContextType,
  CollectionContext,
} from "../contexts/CollectionContext";

function CollectionPage() {
  const { collection } = useContext(CollectionContext) as CollContextType;

  const searchResult = { objects: collection, total: collection.length };

  return <ObjectList searchResult={searchResult} />;
}

export default CollectionPage;
