import { ChangeEvent, ReactElement, useEffect, useState } from "react";

import { SetState } from "../utils/types";
import { object } from "../api/metmuseum";
import { Object, Search } from "../api/metmuseumtypes";

import ObjectCard from "./ObjectCard";
import PageButtons from "./PageButtons";

type SelectEvent = ChangeEvent<HTMLSelectElement>;
type Props = { searchResult: Search; setLoading: SetState<boolean> };

function ObjectList({ searchResult, setLoading }: Props) {
  const [objects, setObjects] = useState<(Object | null)[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setObjects([]);
    const start = (page - 1) * pageSize + 1;
    const end = start + pageSize;
    console.log(pageSize, page);
    console.log(searchResult.objectIDs.length);

    Promise.all(
      searchResult.objectIDs.slice(start, end).map(getObjectByID)
    ).then(() => {
      setLoading(false);
    });
  }, [searchResult, page, pageSize]);

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
        <ObjectCard
          key={obj.objectID.toString()}
          imageURL={obj.primaryImage}
          title={obj.title}
        />
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

  function selectPageSize(event: SelectEvent) {
    setPageSize(+event.target.value);
  }

  return (
    <>
      <section className="flex my-2">
        <span className="pr-2">Objects per page:</span>
        <select
          className="px-1"
          name="pagesize"
          id="pagesize"
          onChange={selectPageSize}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </section>
      <ol className="flex flex-col gap-y-2 mx-2">{objectsToElements()}</ol>
      {objects.includes(null) && (
        <p>
          {failedToLoad()} object{failedToLoad() > 1 ? "s" : ""} failed to load
        </p>
      )}
      <PageButtons page={page} setPage={setPage} />
    </>
  );
}

export default ObjectList;
