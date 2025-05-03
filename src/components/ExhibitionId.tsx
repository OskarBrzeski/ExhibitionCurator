type Props = {
  exhibId: string;
}

function ExhibitionId({ exhibId }: Props) {
  const buttonClass = "border rounded w-28 px-2 h-8 enabled:hover:shadow enabled:active:shadow-inner"

  function copyIdToClipboard() {
    navigator.clipboard.writeText(exhibId);
  }

  function copyLinkToClipboard() {
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <section className="grid grid-rows-2 my-4">
      <textarea
        className="border rounded w-full mb-1"
        value={`${exhibId}`}
        rows={1}
        disabled
        readOnly
      />
      <section className="flex justify-end gap-2">
        <button className={buttonClass} onClick={copyIdToClipboard}>Copy ID</button>
        <button className={buttonClass} onClick={copyLinkToClipboard}>Copy Link</button>
      </section>
    </section>
  )
}

export default ExhibitionId;
