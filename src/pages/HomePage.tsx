import { useState } from "react";

import { Search } from "../api/metmuseumtypes";

import Loading from "../components/Loading";
import ObjectList from "../components/ObjectList";
import SearchBar from "../components/SearchBar";

function HomePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Search>({
    total: 0,
    objectIDs: [],
  });

  return (
    <section className="flex flex-col items-center">
      <SearchBar setSearchedObjects={setSearchResult} setLoading={setLoading} />
      {loading ? <Loading /> : null}
      <ObjectList searchResult={searchResult} setLoading={setLoading} />
    </section>
  );
}

export default HomePage;
