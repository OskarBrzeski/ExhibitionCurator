import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "../components/Loading";
import { getObjectById, Object } from "../api/api";

type ObjectParams = { objectId: string };

function ObjectPage() {
  const { objectId } = useParams<ObjectParams>();
  const [object, setObject] = useState<Object | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    setLoading(true);

    if (objectId === undefined) {
      setErrorMsg("ID is undefined; this should never occur");
      setLoading(false);
      return;
    }

    if (isNaN(+objectId)) {
      setErrorMsg("Invalid object ID, must be a number");
      setLoading(false);
      return;
    }

    getObjectById("met", +objectId)
      .then((data) => {
        console.log(data);

        setObject(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [objectId]);

  if (loading) {
    return <Loading />;
  }

  if (errorMsg) {
    return <p>{errorMsg}</p>;
  }

  if (object === null) {
    return <p>There is no object here</p>;
  }

  return (
    <section className="flex flex-col px-2 pb-2">
      <h1 className="text-2xl font-medium text-center py-2">{object.title}</h1>
      <img
        className=""
        src={object.primaryImage}
        alt={`Image of ${object.title}`}
      />
      <h2 className="text-2xl font-medium text-center pt-4 pb-1">Artist</h2>
      <p>Name: {object.artistName || "Unknown"}</p>
      <p>Bio: {object.artistBio || "Unknown"}</p>
      <p>Nationality: {object.artistNationality || "Unknown"}</p>
      <h2 className="text-2xl font-medium text-center pt-4 pb-1">
        Object Info
      </h2>
      <p>Dimensions: {object.dimensions}</p>
      <p>Medium: {object.medium}</p>
      <p>Created: {object.objectDate}</p>
      <h2 className="text-2xl font-medium text-center pt-4 pb-1">
        Museum Info
      </h2>
      <p>Department: {object.department}</p>
      <a href={object.objectURL}>Museum Page for Object</a>
    </section>
  );
}

export default ObjectPage;
