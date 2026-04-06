export default function Palette({ setBlocks, blocks }) {
  const addBlock = (type) => {
    const newBlock = {
      id: crypto.randomUUID(),
      type,
      data:
        type === "header"
          ? { text: "Heading" }
          : type === "markdown"
          ? { raw: "## Markdown" }
          : { url: "https://via.placeholder.com/400" },
    };

    setBlocks([...blocks, newBlock]);
  };

  return (
    <div className="sidebar">
      <h3>Blocks</h3>
      <button onClick={() => addBlock("header")}>Header</button>
      <button onClick={() => addBlock("markdown")}>Markdown</button>
      <button onClick={() => addBlock("image")}>Image</button>
    </div>
  );
}