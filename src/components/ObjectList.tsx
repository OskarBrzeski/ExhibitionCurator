import { ReactElement, useEffect, useState } from "react";
import { Object, Search } from "../api/sciencemuseumtypes";
import ObjectCard from "./ObjectCard";
import { object } from "../api/sciencemuseum";
import { SetState } from "../utils/types";

type Props = { searchResult: Search; setLoading: SetState<boolean> };

function ObjectList({ searchResult, setLoading }: Props) {
  const [objects, setObjects] = useState<(Object | null)[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const start = (page - 1) * pageSize + 1;
    const end = start + pageSize;
    console.log(searchResult.objectIDs.slice(start, end));

    Promise.all(
      searchResult.objectIDs.slice(start, end).map(getObjectByID),
    ).then(() => {
      setLoading(false);
    });
  }, [searchResult]);

  function getObjectByID(objectID: number, index: number) {
    object(objectID).then((data) => {
      setObjects((objects) => {
        const newObjects = objects.slice();
        newObjects[index] = data;
        return newObjects;
      });
    });
  }

  function objectsToElements(): (ReactElement | null)[] {
    return objects.map((obj) => {
      if (obj === null) {
        return null;
      }
      return (
        <li key={obj.objectID} className="border rounded mx-2">
          <ObjectCard imageURL={obj.primaryImage} title={obj.title} />
        </li>
      );
    });
  }

  function failedToLoad() {
    let count = 0;
    for (const obj of objects) {
      if (obj === null) count++;
    }
    return count;
  }

  return (
    <>
      <ol className="flex flex-col gap-y-2">{objectsToElements()}</ol>
      {objects.includes(null) && (
        <p>
          {failedToLoad()} object{failedToLoad() > 1 ? "s" : ""} failed to load
        </p>
      )}
    </>
  );
}

export default ObjectList;
