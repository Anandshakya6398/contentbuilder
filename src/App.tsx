import { useState, useEffect } from "react";
import Palette from "./components/Palette";
import Canvas from "./components/Canvas";
import EditorPanel from "./components/EditorPanel";

const STORAGE_KEY = "pagecraft_vite_full";

export default function App() {
  const [blocks, setBlocks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) setBlocks(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
  }, [blocks]);

  return (
    <div className="app">
      <Palette setBlocks={setBlocks} blocks={blocks} />
      <Canvas
        blocks={blocks}
        setBlocks={setBlocks}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <EditorPanel
        blocks={blocks}
        setBlocks={setBlocks}
        selectedId={selectedId}
      />
    </div>
  );
}