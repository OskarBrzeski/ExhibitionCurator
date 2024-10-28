import { ChangeEvent, ReactElement, useState } from "react";

import { Search } from "../api/metmuseum";

import ObjectCard from "./ObjectCard";
import PageButtons from "./PageButtons";

type SelectEvent = ChangeEvent<HTMLSelectElement>;
type Props = { searchResult: Search; };

function ObjectList({ searchResult }: Props) {
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  function renderObjectCards(): (ReactElement | null)[] {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return searchResult.objectIDs.slice(start, end).map((objectId) => {
      return (
        <ObjectCard
          key={objectId.toString()}
          objectId={objectId}
        />
      );
    });
  }

  function selectPageSize(event: SelectEvent) {
    const newPageSize = +event.target.value;
    setPageSize(newPageSize);
    setPage(Math.min(page, maxPage(newPageSize)));
  }

  function maxPage(newPageSize?: number): number {
    return Math.ceil(searchResult.total / (newPageSize || pageSize));
  }
  
  if (searchResult.total === 0) {
    return null;
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
      <PageButtons maxPage={maxPage()} page={page} setPage={setPage} />
      <ol className="flex flex-col gap-y-2 px-2 w-full">{renderObjectCards()}</ol>
      <PageButtons maxPage={maxPage()} page={page} setPage={setPage} />
    </>
  );
}

export default ObjectList;
