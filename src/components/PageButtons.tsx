import { SetState } from "../utils/types";

type Props = { maxPage: number; page: number; setPage: SetState<number> };

function PageButtons({ maxPage, page, setPage }: Props) {
  return (
    <section className="flex justify-between px-2 my-2 w-full">
      <button
        className="border rounded w-1/3 px-2 py-1 disabled:text-gray-500 enabled:hover:shadow enabled:active:shadow-inner"
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
      >
        Previous Page
      </button>
      <span className="py-1">{page}</span>
      <button
        className="border rounded w-1/3 px-2 py-1 disabled:text-gray-500 enabled:hover:shadow enabled:active:shadow-inner"
        disabled={page >= maxPage}
        onClick={() => setPage((p) => p + 1)}
      >
        Next Page
      </button>
    </section>
  );
}

export default PageButtons;
