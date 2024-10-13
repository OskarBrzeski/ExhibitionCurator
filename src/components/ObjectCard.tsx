import Thumbnail from "./Thumbnail";

type Props = {
  imageURL: string;
  title: string;
};

function ObjectCard({ imageURL, title }: Props) {
  return (
    <>
      <Thumbnail imageURL={imageURL} />
      <p className="m-4">{title}</p>
    </>
  );
}

export default ObjectCard;
