import Thumbnail from "./Thumbnail";

type Props = {
  key: string;
  imageURL: string;
  title: string;
};

function ObjectCard({ imageURL, title }: Props) {
  return (
    <li className="border rounded flex p-2">
      <section className="w-2/5 max-w-28 h-28 flex-none">
        <Thumbnail imageURL={imageURL} />
      </section>
      <section className="flex flex-col flex-1">
        <p className="m-4 flex-1">{title}</p>
        <button className="border rounded px-2 h-8 mx-auto enabled:hover:shadow enabled:active:shadow-inner">
          Add to Collection
        </button>
      </section>
    </li>
  );
}

export default ObjectCard;
