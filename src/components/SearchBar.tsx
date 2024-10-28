import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type SubmitEvent = FormEvent<HTMLFormElement>;
type SelectEvent = ChangeEvent<HTMLSelectElement>;

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
    <form className="flex flex-col gap-2 px-2 w-full" onSubmit={handleSubmit}>
      <select name="museum" id="museum" onChange={selectChange} value={museum}>
        <option value="met">Metropolitan Museum</option>
        <option value="cle">Cleveland Museum</option>
      </select>
      <input
        className="border-2 shadow-black px-1"
        value={searchTerms}
        onChange={(e) => setSearchTerms(e.target.value)}
      />
      <button className="border-2 rounded px-1" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
