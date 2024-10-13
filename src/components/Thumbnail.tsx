type Props = { imageURL: string };

function Thumbnail({ imageURL }: Props) {
  return <img className="w-20 h-20 rounded border m-4" src={imageURL} alt="" />;
}

export default Thumbnail;
