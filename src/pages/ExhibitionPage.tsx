import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { decodeObjects } from "../utils/base64";
import { BasicObject, SubmitEvent } from "../utils/types";

import ObjectCard from "../components/ObjectCard";

function ExhibitionPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [exhibId, setExhibId] = useState<string>("");

  function renderObjects() {
    const objects = decodeObjects(searchParams.get("id")!);
    return objects.map((obj: BasicObject) => {
      return (
        <ObjectCard
          key={obj.objectId.toString()}
          objectId={obj.objectId}
          source={obj.source}
        />
      );
    });
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    setSearchParams((prev) => {
      prev.set("id", exhibId);
      return prev;
    });
  }

  if (searchParams.get("id") === null) {
    return (
      <form className="flex flex-col gap-2" action="" onSubmit={handleSubmit}>
        <label htmlFor="exhib">Enter Exhibition ID</label>
        <input
          name="exhib"
          className="border-2 shadow-black p-1 rounded"
          value={exhibId}
          onChange={(e) => setExhibId(e.target.value)}
        />
        <button className="border-2 rounded px-4" type="submit">
          Submit
        </button>
      </form>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center m-4">Exhibition</h1>
      <ol className="flex flex-col gap-2">{renderObjects()}</ol>
    </>
  );
}

export default ExhibitionPage;
