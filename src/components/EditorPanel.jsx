export default function EditorPanel({ blocks, setBlocks, selectedId }) {
  const block = blocks.find((b) => b.id === selectedId);

  const update = (newData) => {
    setBlocks(
      blocks.map((b) =>
        b.id === selectedId ? { ...b, data: newData } : b
      )
    );
  };

  if (!block) return <div className="editor">Select block</div>;

  return (
    <div className="editor">
      {block.type === "header" && (
        <input
          value={block.data.text}
          onChange={(e) =>
            update({ ...block.data, text: e.target.value })
          }
        />
      )}

      {block.type === "markdown" && (
        <textarea
          value={block.data.raw}
          onChange={(e) => update({ raw: e.target.value })}
        />
      )}

      {block.type === "image" && (
        <input
          value={block.data.url}
          onChange={(e) => update({ url: e.target.value })}
        />
      )}
    </div>
  );
}