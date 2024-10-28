import { useContext } from "react";
import { useSearchParams } from "react-router-dom";

import {
  CollContextType,
  CollectionContext,
} from "../contexts/CollectionContext";

import ObjectList from "../components/ObjectList";

function CollectionPage() {
  const { collection } = useContext(CollectionContext) as CollContextType;
  const [searchParams, setSearchParams] = useSearchParams();

  const pagesize = +searchParams.get("pagesize")!;
  const page = +searchParams.get("page")!;

  const start = (page - 1) * pagesize;
  const end = start + pagesize;

  const searchResult = {
    objects: collection.slice(start, end),
    total: collection.length,
  };

  return (
    <ObjectList
      searchResult={searchResult}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  );
}

export default CollectionPage;
