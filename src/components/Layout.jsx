import { useState } from 'react';
import { BLOCK_META, PALETTE_ORDER } from '../constants/blocks';
import { mkBlock } from '../utils/blockUtils';
import { EDITORS } from './BlockEditors';
import BlockPreview from './BlockPreview';

// ─── Editor Side Panel ───
export function EditorPanel({ block, onUpdate, onDelete, onClose }) {
  if (!block) {
    return (
      <aside className="w-[248px] shrink-0 bg-white border-l border-gray-100 flex flex-col items-center justify-center p-6 text-center gap-2.5">
        <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center text-xl text-gray-300">✦</div>
        <p className="text-[13px] font-medium text-gray-400">No block selected</p>
        <p className="text-[11px] text-gray-200">Click a block on the canvas to edit it</p>
      </aside>
    );
  }

  const meta = BLOCK_META[block.type];
  const Editor = EDITORS[block.type];

  return (
    <aside className="w-[248px] shrink-0 bg-white border-l border-gray-100 flex flex-col overflow-hidden animate-slide-in">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-3.5 py-[11px] border-b border-gray-100 shrink-0">
        <div
          className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center text-[11px] font-bold shrink-0"
          style={{ background: meta.color, color: meta.tc }}
        >
          {meta.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-gray-800 leading-tight">{meta.label}</p>
          <p className="text-[10px] text-gray-400 leading-tight">{meta.desc}</p>
        </div>
        <button
          onClick={onClose}
          className="w-[22px] h-[22px] rounded-[6px] border-none bg-transparent cursor-pointer text-gray-400 flex items-center justify-center text-sm hover:text-gray-600"
          title="Close"
        >
          ✕
        </button>
      </div>

      {/* Editor fields */}
      <div className="flex-1 overflow-y-auto p-3.5 flex flex-col gap-3.5">
        {Editor && <Editor data={block.data} onChange={d => onUpdate({ ...block, data: d })} />}
      </div>

      {/* Delete button */}
      <div className="p-[10px_14px] border-t border-gray-100 shrink-0">
        <button
          onClick={() => { onDelete(block.id); onClose(); }}
          className="w-full py-[7px] border border-red-300 rounded-lg bg-transparent text-red-500 text-[12px] cursor-pointer flex items-center justify-center gap-1 hover:bg-red-50 transition-colors"
        >
          🗑 Delete block
        </button>
      </div>
    </aside>
  );
}

// ─── Left Palette ───
export function Palette() {
  return (
    <aside className="w-[200px] shrink-0 bg-white border-r border-gray-100 flex flex-col overflow-hidden">
      <div className="px-3.5 pt-3.5 pb-2.5 border-b border-gray-100">
        <p className="text-[10px] font-bold text-gray-400 tracking-[.08em] uppercase">Blocks</p>
        <p className="text-[10px] text-gray-200 mt-0.5">Drag onto canvas</p>
      </div>

      <div className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-[5px]">
        {PALETTE_ORDER.map(type => {
          const m = BLOCK_META[type];
          return (
            <div
              key={type}
              className="palette-item"
              draggable
              onDragStart={e => {
                e.dataTransfer.setData('block-type', type);
                e.dataTransfer.effectAllowed = 'copy';
              }}
            >
              <div
                className="w-7 h-7 rounded-[8px] flex items-center justify-center text-[11px] font-bold shrink-0"
                style={{ background: m.color, color: m.tc }}
              >
                {m.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-gray-700 leading-tight">{m.label}</p>
                <p className="text-[10px] text-gray-400 leading-[1.2]">{m.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-3.5 py-2.5 border-t border-gray-100">
        <p className="text-[9px] text-gray-200 text-center font-semibold tracking-[.06em]">PAGECRAFT v2.0</p>
      </div>
    </aside>
  );
}

// ─── Top Toolbar ───
export function Toolbar({ count, savedAt, dirty, onClear, onExport, onPreview }) {
  const fmt = d => {
    if (!d) return '';
    const s = Math.floor((Date.now() - d) / 1000);
    return s < 60 ? 'Saved just now' : `Saved ${Math.floor(s / 60)}m ago`;
  };

  return (
    <header className="h-12 shrink-0 bg-white border-b border-gray-100 flex items-center px-4 gap-2">
      <div className="flex items-center gap-2 mr-1.5">
        <div className="w-7 h-7 bg-brand-500 rounded-lg flex items-center justify-center text-sm" style={{ background: '#5B73F5' }}>✦</div>
        <span className="text-[14px] font-bold text-gray-900 tracking-tight">PageCraft</span>
      </div>

      <span className="w-px h-[18px] bg-gray-100" />
      <span className="text-[11px] text-gray-400">{count} block{count !== 1 ? 's' : ''}</span>

      <div className="flex-1" />

      {dirty ? (
        <span className="text-[11px] text-yellow-500 flex items-center gap-1">⟳ Saving…</span>
      ) : savedAt ? (
        <span className="text-[11px] text-emerald-500 flex items-center gap-1">✓ {fmt(savedAt)}</span>
      ) : null}

      <button className="tb-btn" onClick={onPreview}>👁 Preview</button>
      <button className="tb-btn" onClick={onExport}>↓ Export HTML</button>
      <button className="tb-btn danger" onClick={onClear}>✕ Clear</button>
    </header>
  );
}

// ─── Single Canvas Block with drag/move/dup controls ───
export function CanvasBlock({
  block, index, total, selected, onClick,
  onDelete, onDup, onMoveUp, onMoveDown,
  onDragStart, onDrop, dragging,
}) {
  const meta = BLOCK_META[block.type];
  const [over, setOver] = useState(false);

  return (
    <div
      style={{ opacity: dragging ? 0.4 : 1, transition: 'opacity .15s' }}
      draggable
      onDragStart={e => {
        e.dataTransfer.setData('block-id', block.id);
        e.dataTransfer.effectAllowed = 'move';
        onDragStart(block.id);
      }}
      onDragOver={e => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); onDrop(e, index); }}
    >
      {over && <div className="h-1 bg-indigo-400 rounded-sm mx-2 my-0.5" />}

      <div className={`canvas-block ${selected ? 'selected' : ''}`} onClick={onClick}>
        {/* Block top bar */}
        <div
          className="flex items-center gap-[7px] px-2.5 py-[7px] border-b border-gray-100 cursor-default"
          style={{ background: selected ? '#f5f3ff' : '#fafafa' }}
        >
          <span className="cursor-grab text-gray-300 text-[13px] leading-none" title="Drag to reorder">⠿</span>
          <span
            className="text-[9px] font-bold tracking-[.06em] uppercase px-[7px] py-[2px] rounded-full"
            style={{ background: meta.color, color: meta.tc }}
          >
            {meta.label}
          </span>

          {/* Toolbar — visible on hover via CSS */}
          <div className="block-toolbar">
            <button className="ctrl-btn" disabled={index === 0} onClick={e => { e.stopPropagation(); onMoveUp(); }} title="Move up">↑</button>
            <button className="ctrl-btn" disabled={index === total - 1} onClick={e => { e.stopPropagation(); onMoveDown(); }} title="Move down">↓</button>
            <button className="ctrl-btn" onClick={e => { e.stopPropagation(); onDup(); }} title="Duplicate">⧉</button>
            <button className="ctrl-btn del" onClick={e => { e.stopPropagation(); onDelete(); }} title="Delete">✕</button>
          </div>
        </div>

        <BlockPreview block={block} />
      </div>
    </div>
  );
}

// ─── Main Canvas Area ───
export function Canvas({ blocks, selectedId, onSelect, onUpdateBlocks, onDeleteBlock }) {
  const [draggingId, setDraggingId] = useState(null);
  const [canvasOver, setCanvasOver] = useState(false);

  const handleDrop = (e, targetIdx) => {
    e.preventDefault();
    setCanvasOver(false);

    const btype = e.dataTransfer.getData('block-type');
    const bid   = e.dataTransfer.getData('block-id');

    if (btype) {
      const nb = mkBlock(btype);
      const arr = [...blocks];
      arr.splice(targetIdx !== undefined ? targetIdx + 1 : arr.length, 0, nb);
      onUpdateBlocks(arr);
      onSelect(nb.id);
      return;
    }

    if (bid) {
      const fi = blocks.findIndex(b => b.id === bid);
      const ti = targetIdx !== undefined ? targetIdx : blocks.length - 1;
      if (fi === ti) return;
      const arr = [...blocks];
      const [moved] = arr.splice(fi, 1);
      arr.splice(ti, 0, moved);
      onUpdateBlocks(arr);
    }

    setDraggingId(null);
  };

  const moveUp   = i => { if (i === 0) return; const a = [...blocks]; [a[i-1], a[i]] = [a[i], a[i-1]]; onUpdateBlocks(a); };
  const moveDown = i => { if (i === blocks.length - 1) return; const a = [...blocks]; [a[i], a[i+1]] = [a[i+1], a[i]]; onUpdateBlocks(a); };
  const dup = i => {
    const b = blocks[i];
    const n = { ...b, id: crypto.randomUUID(), data: structuredClone(b.data) };
    const a = [...blocks];
    a.splice(i + 1, 0, n);
    onUpdateBlocks(a);
    onSelect(n.id);
  };

  if (blocks.length === 0) {
    return (
      <main
        className="flex-1 overflow-y-auto p-7 flex items-center justify-center"
        onDragOver={e => { e.preventDefault(); setCanvasOver(true); }}
        onDragLeave={() => setCanvasOver(false)}
        onDrop={e => handleDrop(e)}
      >
        <div
          className="max-w-[520px] w-full rounded-[18px] p-16 flex flex-col items-center gap-3.5 transition-all duration-200"
          style={{
            border: `2px dashed ${canvasOver ? '#818cf8' : '#e5e7eb'}`,
            background: canvasOver ? '#eef2ff' : 'transparent',
          }}
        >
          <div
            className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-2xl transition-colors duration-200"
            style={{ background: canvasOver ? '#c7d2fe' : '#f3f4f6' }}
          >
            {canvasOver ? '✦' : '⊞'}
          </div>
          <p className="text-[15px] font-semibold text-center" style={{ color: canvasOver ? '#4f46e5' : '#6b7280' }}>
            {canvasOver ? 'Drop to add block' : 'Your canvas is empty'}
          </p>
          <p className="text-[13px] text-gray-400 text-center">
            Drag blocks from the left panel onto the canvas to start building your page
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="flex-1 overflow-y-auto px-7 py-6"
      onDragOver={e => { e.preventDefault(); setCanvasOver(true); }}
      onDragLeave={() => setCanvasOver(false)}
      onDrop={e => { if (!e.defaultPrevented) handleDrop(e); setCanvasOver(false); }}
    >
      <div className="max-w-[700px] mx-auto flex flex-col gap-2.5">
        {blocks.map((block, i) => (
          <CanvasBlock
            key={block.id}
            block={block}
            index={i}
            total={blocks.length}
            selected={selectedId === block.id}
            onClick={() => onSelect(selectedId === block.id ? null : block.id)}
            onDelete={() => onDeleteBlock(block.id)}
            onDup={() => dup(i)}
            onMoveUp={() => moveUp(i)}
            onMoveDown={() => moveDown(i)}
            onDragStart={id => setDraggingId(id)}
            onDrop={handleDrop}
            dragging={draggingId === block.id}
          />
        ))}

        {/* Bottom drop zone */}
        <div
          className="h-[50px] rounded-xl flex items-center justify-center text-[12px] transition-all duration-150"
          style={{
            border: `2px dashed ${canvasOver ? '#818cf8' : '#e5e7eb'}`,
            color: canvasOver ? '#818cf8' : '#d1d5db',
            background: canvasOver ? '#eef2ff' : 'transparent',
          }}
          onDragOver={e => { e.preventDefault(); e.stopPropagation(); setCanvasOver(true); }}
          onDrop={e => { e.stopPropagation(); handleDrop(e); }}
        >
          Drop here to add at end
        </div>
      </div>
    </main>
  );
}