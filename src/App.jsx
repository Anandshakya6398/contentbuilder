import { useState } from 'react';
import { usePersist } from './hooks/usePersists';
import { exportHtml } from './utils/blockUtils';
import { Toolbar, Palette, Canvas, EditorPanel } from './components/Layout';
import PreviewModal from './components/PreviewModal';

// ─── Root App Component ───
export default function App() {
  const { blocks, setBlocks, savedAt, dirty } = usePersist();

  const [selectedId,   setSelectedId]   = useState(null);
  const [showPreview,  setShowPreview]   = useState(false);
  const [confirmClear, setConfirmClear]  = useState(false);

  // Selected block (or null)
  const selected = blocks.find(b => b.id === selectedId) || null;

  // Update a single block in-place
  const updateBlock = updated =>
    setBlocks(blocks.map(b => b.id === updated.id ? updated : b));

  // Delete a block by id
  const deleteBlock = id => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Toolbar
        count={blocks.length}
        savedAt={savedAt}
        dirty={dirty}
        onClear={() => blocks.length && setConfirmClear(true)}
        onExport={() => exportHtml(blocks)}
        onPreview={() => setShowPreview(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Palette />
        <Canvas
          blocks={blocks}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onUpdateBlocks={setBlocks}
          onDeleteBlock={deleteBlock}
        />
        <EditorPanel
          block={selected}
          onUpdate={updateBlock}
          onDelete={deleteBlock}
          onClose={() => setSelectedId(null)}
        />
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal blocks={blocks} onClose={() => setShowPreview(false)} />
      )}

      {/* Clear Confirmation Modal */}
      {confirmClear && (
        <div className="modal-backdrop">
          <div className="modal-box animate-fade-up w-full max-w-[380px] p-6">
            <p className="text-[15px] font-semibold text-gray-900 mb-1.5">Clear all blocks?</p>
            <p className="text-[13px] text-gray-500 mb-5">
              This will permanently remove all {blocks.length} blocks. This cannot be undone.
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setConfirmClear(false)}
                className="flex-1 py-[9px] border border-gray-200 rounded-xl bg-transparent text-gray-700 text-[13px] cursor-pointer hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => { setBlocks([]); setSelectedId(null); setConfirmClear(false); }}
                className="flex-1 py-[9px] border-none rounded-xl bg-red-500 text-white text-[13px] font-semibold cursor-pointer hover:bg-red-600"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}