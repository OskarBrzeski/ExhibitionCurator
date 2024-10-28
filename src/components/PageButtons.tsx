type Props = {
  page: number;
  maxPage: number;
  prevPage: () => void;
  nextPage: () => void;
};

function PageButtons({ page, maxPage, prevPage, nextPage }: Props) {
  return (
    <section className="flex justify-between px-2 my-2 w-full">
      <button
        className="border rounded w-1/3 px-2 py-1 disabled:text-gray-500 enabled:hover:shadow enabled:active:shadow-inner"
        disabled={page === 1}
        onClick={prevPage}
      >
        Previous Page
      </button>
      <span className="py-1">{page}</span>
      <button
        className="border rounded w-1/3 px-2 py-1 disabled:text-gray-500 enabled:hover:shadow enabled:active:shadow-inner"
        disabled={page >= maxPage}
        onClick={nextPage}
      >
        Next Page
      </button>
    </section>
  );
}

export default PageButtons;
