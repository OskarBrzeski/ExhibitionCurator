import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { getSearchByQuery, Search } from "../api/api";

import ObjectList from "../components/ObjectList";

function ResultsPage() {
  const { source } = useParams<{ source: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState<Search>({
    objects: [],
    total: 0,
  });

  useEffect(() => {
    getSearchByQuery(
      source!,
      searchParams.get("q")!,
      +searchParams.get("pagesize")!,
      +searchParams.get("page")!
    ).then((data) => {
      console.log(data);
      setSearchResult(data);
    });
  }, [searchParams, source]);

  return (
    <ObjectList
      searchResult={searchResult}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  );
}

export default ResultsPage;
