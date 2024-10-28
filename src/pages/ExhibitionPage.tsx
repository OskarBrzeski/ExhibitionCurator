import { useParams } from "react-router-dom";

import { decodeObjects } from "../utils/base64";
import { BasicObject } from "../utils/types";
import ObjectCard from "../components/ObjectCard";

type ExhibitionParam = { data: string };

function ExhibitionPage() {
  const { data } = useParams<ExhibitionParam>();
  const objects = decodeObjects(data!);

  function renderObjects() {
    return objects.map((obj: BasicObject) => {
      return (
        <ObjectCard
          key={obj.objectId.toString()}
          objectId={obj.objectId}
          source={obj.source}
        />
      );
    });
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center m-4">Exhibition</h1>
      <ol className="flex flex-col gap-2">{renderObjects()}</ol>
    </>
  );
}

export default ExhibitionPage;
