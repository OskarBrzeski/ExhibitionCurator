import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SelectEvent, SubmitEvent } from "../utils/types";

function SearchBar() {
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [museum, setMuseum] = useState<string>("met");
  const navigate = useNavigate();

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    console.log("Tried to submit");
    navigate(`/objects/${museum}?q=${searchTerms}&pagesize=5&page=1`);
  }

  function selectChange(event: SelectEvent) {
    setMuseum(event.target.value);
  }

  return (
    <form className="flex flex-col gap-4 px-2 w-full" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-bold text-center my-8">Exhibiton Curator</h1>
      <select
        className="p-1 rounded text-center"
        name="museum"
        id="museum"
        onChange={selectChange}
        value={museum}
      >
        <option value="met">Metropolitan Museum</option>
        <option value="cle">Cleveland Museum</option>
      </select>
      <input
        className="border-2 shadow-black p-1 rounded"
        value={searchTerms}
        onChange={(e) => setSearchTerms(e.target.value)}
        placeholder="Enter search terms here"
      />
      <button
        className="max-w-64 h-12 border-2 rounded mx-auto px-16 hover:shadow active:shadow-inner"
        type="submit"
      >
        <p className="text-2xl">Search</p>
      </button>
    </form>
  );
}

export default SearchBar;
