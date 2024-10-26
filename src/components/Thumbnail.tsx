type Props = { imageURL: string };

function Thumbnail({ imageURL }: Props) {
  if (imageURL !== "") {
    return <img className="w-28 h-28 rounded border" src={imageURL} alt="" />;
  } else {
    return (
      <section className="w-28 h-28 rounded border text-center">
        <p className="align-middle my-8">No Image Available</p>
      </section>
    );
  }
}

export default Thumbnail;
