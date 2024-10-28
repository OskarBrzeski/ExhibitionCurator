import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { getSearchByQuery, Search } from "../api/api";

import ObjectList from "../components/ObjectList";

function ResultsPage() {
  const { source } = useParams<{ source: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState<Search | null>(null);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);

  useEffect(() => {
    setLoadingPage(true);

    getSearchByQuery(
      source!,
      searchParams.get("q")!,
      +searchParams.get("pagesize")!,
      +searchParams.get("page")!
    )
      .then((data) => {
        setSearchResult(data);
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, [searchParams, source]);
  
  if (searchResult === null) {
    return <p>Loading ...</p>
  }
  
  if (searchResult.total === 0) {
    return <p>No objects fit search criteria</p>
  }

  return (
    <ObjectList
      loadingPage={loadingPage}
      searchResult={searchResult}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  );
}

export default ResultsPage;
