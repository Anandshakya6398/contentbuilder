import BlockPreview from "./BlockPreview";

export default function Canvas({
  blocks,
  setBlocks,
  selectedId,
  setSelectedId,
}) {
  return (
    <div className="canvas">
      {blocks.map((block) => (
        <div
          key={block.id}
          className={`block ${selectedId === block.id ? "active" : ""}`}
          onClick={() => setSelectedId(block.id)}
        >
          <BlockPreview block={block} />
        </div>
      ))}
    </div>
  );
}