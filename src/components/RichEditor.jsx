import { useRef, useEffect } from 'react';

// ─── WYSIWYG Rich Text Editor (contentEditable based) ───
export default function RichEditor({ value, onChange }) {
  const ref = useRef(null);
  const lastHtml = useRef(value);

  const exec = (cmd, val = null) => {
    ref.current.focus();
    document.execCommand(cmd, false, val);
    syncOut();
  };

  const syncOut = () => {
    const html = ref.current.innerHTML;
    if (html !== lastHtml.current) {
      lastHtml.current = html;
      onChange(html);
    }
  };

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
      lastHtml.current = value;
    }
  }, []); // intentionally runs once

  const headings = ['p', 'h1', 'h2', 'h3', 'h4'];

  return (
    <div className="quill-editor">
      <div className="quill-toolbar">
        <select
          className="q-select"
          onChange={e => exec('formatBlock', e.target.value)}
        >
          {headings.map(h => (
            <option key={h} value={h}>
              {h === 'p' ? 'Normal' : h.toUpperCase()}
            </option>
          ))}
        </select>

        {[
          ['bold', <strong>B</strong>],
          ['italic', <em>I</em>],
          ['underline', <u>U</u>],
          ['strikeThrough', <s>S</s>],
        ].map(([cmd, label]) => (
          <button
            key={cmd}
            className="q-btn"
            onMouseDown={e => { e.preventDefault(); exec(cmd); }}
          >
            {label}
          </button>
        ))}

        <span className="w-px h-[18px] bg-gray-200 mx-0.5" />

        <button className="q-btn" onMouseDown={e => { e.preventDefault(); exec('insertOrderedList'); }}>1.</button>
        <button className="q-btn" onMouseDown={e => { e.preventDefault(); exec('insertUnorderedList'); }}>•</button>
        <button className="q-btn" onMouseDown={e => { e.preventDefault(); exec('formatBlock', 'blockquote'); }}>❝</button>

        <span className="w-px h-[18px] bg-gray-200 mx-0.5" />

        <button className="q-btn" title="Undo" onMouseDown={e => { e.preventDefault(); exec('undo'); }}>↩</button>
        <button className="q-btn" title="Redo" onMouseDown={e => { e.preventDefault(); exec('redo'); }}>↪</button>
        <button className="q-btn" title="Clear formatting" onMouseDown={e => { e.preventDefault(); exec('removeFormat'); }}>✕</button>
      </div>

      <div
        ref={ref}
        className="quill-content rich-preview"
        contentEditable
        suppressContentEditableWarning
        onInput={syncOut}
        onBlur={syncOut}
      />
    </div>
  );
}