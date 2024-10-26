import { useContext } from "react";
import Thumbnail from "./Thumbnail";
import {
  CollContextType,
  CollectionContext,
} from "../contexts/CollectionContext";

type Props = {
  key: string;
  id: number;
  imageURL: string;
  title: string;
};

function ObjectCard({ id, imageURL, title }: Props) {
  const { collection, setCollection } = useContext(
    CollectionContext
  ) as CollContextType;

  function addToCollection() {
    setCollection((coll) => [...coll, id]);
  }

  function removeFromCollection() {
    setCollection((coll) => coll.filter((obj) => obj !== id));
  }

  function inCollection() {
    return collection.includes(id);
  }

  return (
    <li className="border rounded flex p-2">
      <section className="w-2/5 max-w-28 h-28 flex-none">
        <Thumbnail imageURL={imageURL} />
      </section>
      <section className="flex flex-col flex-1">
        <p className="mx-4 my-2 flex-1">{title}</p>
        <button
          className="border rounded px-2 h-8 mx-auto enabled:hover:shadow enabled:active:shadow-inner"
          onClick={inCollection() ? removeFromCollection : addToCollection}
        >
          {inCollection() ? "Remove from Collection" : "Add to Collection"}
        </button>
      </section>
    </li>
  );
}

export default ObjectCard;
