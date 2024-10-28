import { useParams, useSearchParams } from "react-router-dom";
import ObjectList from "../components/ObjectList";
import { useEffect, useState } from "react";
import { getSearchByQuery, Search } from "../api/api";

function ResultsPage() {
  const { source } = useParams();
  const [searchParams, _] = useSearchParams();
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
  }, [searchParams]);

  //   function nextPage() {
  //     const newQuery = {
  //       q: searchParams.get("q")!,
  //       pagesize: searchParams.get("pagesize")!,
  //       page: +searchParams.get("page")! + 1,
  //     };
  //     setSearchParams(newQuery);
  //   }

  return <ObjectList searchResult={searchResult} />;
}

export default ResultsPage;
