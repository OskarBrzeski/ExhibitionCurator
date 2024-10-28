import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

type SubmitEvent = FormEvent<HTMLFormElement>;
type SelectEvent = ChangeEvent<HTMLSelectElement>;

function SearchBar(): ReactElement {
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
    <form onSubmit={handleSubmit}>
      <select name="museum" id="museum" onChange={selectChange}>
        <option value="met">Metropolitan Museum</option>
        <option value="cle">Cleveland Museum</option>
      </select>
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
