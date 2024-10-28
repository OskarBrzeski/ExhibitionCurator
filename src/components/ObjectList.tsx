import { ChangeEvent, ReactElement } from "react";
import { SetURLSearchParams } from "react-router-dom";

import { Search } from "../api/api";

import ObjectCard from "./ObjectCard";
import PageButtons from "./PageButtons";

type SelectEvent = ChangeEvent<HTMLSelectElement>;
type Props = {
  loadingPage: boolean;
  searchResult: Search;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

function ObjectList({
  loadingPage,
  searchResult,
  searchParams,
  setSearchParams,
}: Props) {
  function renderObjectCards(): (ReactElement | null)[] {
    return searchResult.objects.map(({ objectId, source }) => {
      return (
        <ObjectCard
          key={objectId.toString()}
          source={source}
          objectId={objectId}
        />
      );
    });
  }

  function selectPageSize(event: SelectEvent) {
    const newPageSize = +event.target.value;
    const newPage = Math.min(getPage(), maxPage(newPageSize));

    setSearchParams((prev: URLSearchParams) => {
      prev.set("pagesize", newPageSize.toString());
      prev.set("page", newPage.toString());
      return prev;
    });
  }

  function maxPage(newPageSize?: number): number {
    return Math.ceil(searchResult.total / (newPageSize || getPagesize()));
  }

  function nextPage() {
    setSearchParams((prev: URLSearchParams) => {
      prev.set("page", Math.min(getPage() + 1, maxPage()).toString());
      return prev;
    });
  }

  function prevPage() {
    setSearchParams((prev: URLSearchParams) => {
      prev.set("page", Math.max(getPage() - 1, 1).toString());
      return prev;
    });
  }

  function getPage(): number {
    return +searchParams.get("page")!;
  }

  function getPagesize(): number {
    return +searchParams.get("pagesize")!;
  }

  if (searchResult.total === 0) {
    return <p>Loading ...</p>;
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
          value={getPagesize()}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </section>
      <PageButtons
        loadingPage={loadingPage}
        page={getPage()}
        maxPage={maxPage()}
        prevPage={prevPage}
        nextPage={nextPage}
      />
      <ol className="flex flex-col gap-y-2 px-2 w-full">
        {renderObjectCards()}
      </ol>
      <PageButtons
        loadingPage={loadingPage}
        page={getPage()}
        maxPage={maxPage()}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </>
  );
}

export default ObjectList;
