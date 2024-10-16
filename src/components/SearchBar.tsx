import { FormEvent, ReactElement, useState } from "react";
import { search } from "../api/sciencemuseum";
import { SetState } from "../utils/types";
import { Search } from "../api/sciencemuseumtypes";

type submitEvent = FormEvent<HTMLFormElement>;
type Props = {
  setSearchedObjects: SetState<Search>;
  setLoading: SetState<boolean>;
};

function SearchBar({ setSearchedObjects, setLoading }: Props): ReactElement {
  const [searchTerms, setSearchTerms] = useState<string>("");

  function handleSubmit(event: submitEvent) {
    event.preventDefault();
    setLoading(true);

    search(searchTerms)
      .then((result) => {
        setSearchedObjects(result);
      })
      .catch((e) => {
        console.log(e);
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
