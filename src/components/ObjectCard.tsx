import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getObjectById, Object } from "../api/api";
import { useCollection } from "../utils/contexts";

import Thumbnail from "./Thumbnail";

type Props = {
  key: string;
  objectId: number;
  source: string;
};

function ObjectCard({ objectId, source }: Props) {
  const { collection, setCollection } = useCollection();
  const [object, setObject] = useState<Object | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getObjectById(source, objectId)
      .then((data) => {
        setObject(data);
      })
      .catch(() => {
        setError(`Failed to Load`);
      });
  }, [objectId, source]);

  function addToCollection() {
    setCollection((coll) => [...coll, { source, objectId }]);
  }

  function removeFromCollection() {
    setCollection((coll) => coll.filter((obj) => obj.objectId !== objectId));
  }

  function inCollection(): boolean {
    for (const obj of collection) {
      if (obj.objectId === objectId && obj.source === source) {
        return true;
      }
    }
    return false;
  }

  if (object === null) {
    return (
      <li className="border rounded flex p-2 h-32">
        <p className="w-full text-center my-auto">{error || "Loading ..."}</p>
      </li>
    );
  }

  return (
    <li className="border rounded flex p-2">
      <Link
        to={`/object/${source}/${objectId}`}
        className="w-2/5 max-w-28 h-28 flex-none"
      >
        <Thumbnail imageURL={object.primaryImageSmall} />
      </Link>
      <section className="flex flex-col flex-1">
        <Link to={`/object/${source}/${objectId}`} className="mx-4 my-2 flex-1">
          {object.title}
        </Link>
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
