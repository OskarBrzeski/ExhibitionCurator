import { FormEvent, ReactElement, useState } from "react";

import { SetState } from "../utils/types";
import { getSearchByQuery, Search } from "../api/metmuseum";

type SubmitEvent = FormEvent<HTMLFormElement>;
type Props = {
  setSearchedObjects: SetState<Search>;
  setLoading: SetState<boolean>;
};

function SearchBar({ setSearchedObjects, setLoading }: Props): ReactElement {
  const [searchTerms, setSearchTerms] = useState<string>("");

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    setLoading(true);

    getSearchByQuery(searchTerms)
      .then((result) => {
        setSearchedObjects(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="border-2 shadow-black px-1 m-1"
        value={searchTerms}
        onChange={(e) => setSearchTerms(e.target.value)}
      />
      <button className="border-2 rounded m-1 px-1" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
