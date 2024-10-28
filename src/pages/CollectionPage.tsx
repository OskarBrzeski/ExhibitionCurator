import { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  CollContextType,
  CollectionContext,
} from "../contexts/CollectionContext";

import ObjectList from "../components/ObjectList";
import { encodeObjects } from "../utils/base64";

function CollectionPage() {
  const { collection } = useContext(CollectionContext) as CollContextType;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const pagesize = +searchParams.get("pagesize")!;
  const page = +searchParams.get("page")!;

  const start = (page - 1) * pagesize;
  const end = start + pagesize;

  const searchResult = {
    objects: collection.slice(start, end),
    total: collection.length,
  };

  function becomeExhibiton() {
    const encodedData = encodeObjects(collection);
    navigate(`/exhibition/${encodedData}`);
  }

  if (collection.length === 0) {
    return <p>Collection is empty</p>;
  }

  return (
    <>
      <ObjectList
        loadingPage={false}
        searchResult={searchResult}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <button className="border rounded p-2" onClick={becomeExhibiton}>
        Share as Exhibition
      </button>
    </>
  );
}

export default CollectionPage;
