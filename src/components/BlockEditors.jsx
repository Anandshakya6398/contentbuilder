import RichEditor from './RichEditor';

// ─── Reusable Field Wrapper ───
export function Field({ label, children }) {
  return (
    <div className="editor-field">
      <span className="editor-label">{label}</span>
      {children}
    </div>
  );
}

// ─── Segmented Button Group ───
export function SegGroup({ value, options, onChange }) {
  return (
    <div className="flex gap-1">
      {options.map(([v, l]) => (
        <button
          key={v}
          className={`seg-btn ${value === v ? 'active' : ''}`}
          onClick={() => onChange(v)}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

// ─── Color Picker + Input Row ───
function ColorRow({ value, onChange }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-9 h-[34px] rounded-[7px] border border-gray-200 p-0.5 cursor-pointer"
      />
      <input
        className="editor-input flex-1"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

// ─── Header Editor ───
export function HeaderEd({ data, onChange }) {
  const up = (k, v) => onChange({ ...data, [k]: v });
  return (
    <>
      <Field label="Text">
        <input className="editor-input" value={data.text} onChange={e => up('text', e.target.value)} placeholder="Header text" />
      </Field>
      <Field label="Level">
        <select className="editor-select" value={data.level} onChange={e => up('level', e.target.value)}>
          <option value="h1">H1 — Hero</option>
          <option value="h2">H2 — Section</option>
          <option value="h3">H3 — Sub-section</option>
          <option value="h4">H4 — Small</option>
        </select>
      </Field>
      <Field label="Alignment">
        <SegGroup value={data.align} options={[['left', 'Left'], ['center', 'Center'], ['right', 'Right']]} onChange={v => up('align', v)} />
      </Field>
      <Field label="Color">
        <ColorRow value={data.color} onChange={v => up('color', v)} />
      </Field>
    </>
  );
}

// ─── Rich Text Editor ───
export function RichEd({ data, onChange }) {
  return (
    <Field label="Content">
      <RichEditor value={data.html} onChange={html => onChange({ ...data, html })} />
    </Field>
  );
}

// ─── Markdown Editor ───
export function MdEd({ data, onChange }) {
  return (
    <Field label="Markdown source">
      <textarea
        className="editor-textarea"
        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, minHeight: 130 }}
        value={data.raw}
        onChange={e => onChange({ ...data, raw: e.target.value })}
        spellCheck={false}
      />
      <span className="text-[10px] text-gray-400">
        Supports headings, **bold**, *italic*, lists, `code`, &gt; quotes
      </span>
    </Field>
  );
}

// ─── Image Editor ───
export function ImageEd({ data, onChange }) {
  const up = (k, v) => onChange({ ...data, [k]: v });
  return (
    <>
      <Field label="Image URL">
        <input className="editor-input" value={data.url} onChange={e => up('url', e.target.value)} placeholder="https://..." />
      </Field>
      <Field label="Alt text">
        <input className="editor-input" value={data.alt} onChange={e => up('alt', e.target.value)} />
      </Field>
      <Field label="Caption">
        <input className="editor-input" value={data.caption} onChange={e => up('caption', e.target.value)} placeholder="Optional caption" />
      </Field>
      <Field label="Width">
        <input className="editor-input" value={data.width} onChange={e => up('width', e.target.value)} placeholder="100%, 400px…" />
      </Field>
      <Field label="Alignment">
        <SegGroup value={data.align} options={[['left', 'Left'], ['center', 'Center'], ['right', 'Right']]} onChange={v => up('align', v)} />
      </Field>
      <Field label={`Border radius: ${data.radius}px`}>
        <input type="range" min={0} max={32} step={2} value={data.radius} onChange={e => up('radius', +e.target.value)} className="w-full" />
      </Field>
    </>
  );
}

// ─── Divider Editor ───
export function DividerEd({ data, onChange }) {
  const up = (k, v) => onChange({ ...data, [k]: v });
  return (
    <>
      <Field label="Style">
        <select className="editor-select" value={data.style} onChange={e => up('style', e.target.value)}>
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
        </select>
      </Field>
      <Field label="Color">
        <ColorRow value={data.color} onChange={v => up('color', v)} />
      </Field>
      <Field label={`Thickness: ${data.thickness}px`}>
        <input type="range" min={1} max={8} step={1} value={data.thickness} onChange={e => up('thickness', +e.target.value)} className="w-full" />
      </Field>
      <Field label={`Margin: ${data.margin}px`}>
        <input type="range" min={0} max={64} step={4} value={data.margin} onChange={e => up('margin', +e.target.value)} className="w-full" />
      </Field>
    </>
  );
}

// ─── Quote Editor ───
export function QuoteEd({ data, onChange }) {
  const up = (k, v) => onChange({ ...data, [k]: v });
  return (
    <>
      <Field label="Quote text">
        <textarea className="editor-textarea" rows={4} value={data.text} onChange={e => up('text', e.target.value)} />
      </Field>
      <Field label="Author">
        <input className="editor-input" value={data.author} onChange={e => up('author', e.target.value)} />
      </Field>
      <Field label="Accent color">
        <ColorRow value={data.accent} onChange={v => up('accent', v)} />
      </Field>
    </>
  );
}

// ─── CTA / Button Editor ───
export function CtaEd({ data, onChange }) {
  const up = (k, v) => onChange({ ...data, [k]: v });
  return (
    <>
      <Field label="Button label">
        <input className="editor-input" value={data.label} onChange={e => up('label', e.target.value)} />
      </Field>
      <Field label="Link URL">
        <input className="editor-input" value={data.href} onChange={e => up('href', e.target.value)} placeholder="https://..." />
      </Field>
      <Field label="Background">
        <ColorRow value={data.bg} onChange={v => up('bg', v)} />
      </Field>
      <Field label="Text color">
        <ColorRow value={data.fg} onChange={v => up('fg', v)} />
      </Field>
      <Field label="Size">
        <SegGroup value={data.size} options={[['sm', 'SM'], ['md', 'MD'], ['lg', 'LG']]} onChange={v => up('size', v)} />
      </Field>
      <Field label="Shape">
        <SegGroup value={data.shape} options={[['md', 'Square'], ['lg', 'Rounded'], ['full', 'Pill']]} onChange={v => up('shape', v)} />
      </Field>
      <Field label="Alignment">
        <SegGroup value={data.align} options={[['left', 'Left'], ['center', 'Center'], ['right', 'Right']]} onChange={v => up('align', v)} />
      </Field>
    </>
  );
}

// ─── Code Editor ───
export function CodeEd({ data, onChange }) {
  const up = (k, v) => onChange({ ...data, [k]: v });
  const langs = ['javascript', 'typescript', 'python', 'html', 'css', 'json', 'bash', 'rust', 'go', 'java', 'cpp', 'sql'];
  return (
    <>
      <Field label="Language">
        <select className="editor-select" value={data.lang} onChange={e => up('lang', e.target.value)}>
          {langs.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </Field>
      <Field label="Code">
        <textarea
          className="editor-textarea"
          rows={10}
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}
          value={data.code}
          onChange={e => up('code', e.target.value)}
          spellCheck={false}
        />
      </Field>
    </>
  );
}

// ─── Editor Registry ───
export const EDITORS = {
  header:   HeaderEd,
  richtext: RichEd,
  markdown: MdEd,
  image:    ImageEd,
  divider:  DividerEd,
  quote:    QuoteEd,
  cta:      CtaEd,
  code:     CodeEd,
};