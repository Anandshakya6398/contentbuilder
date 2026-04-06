// ─── Block Preview Renderer ───
// Renders each block type as its visual output
export default function BlockPreview({ block }) {
  const { type, data } = block;

  if (type === 'header') {
    const Tag = data.level || 'h1';
    const fontSize = { h1: '1.9rem', h2: '1.5rem', h3: '1.2rem', h4: '1rem' };
    return (
      <div className="px-5 py-[18px]" style={{ textAlign: data.align }}>
        <Tag style={{ fontSize: fontSize[Tag] || '1.5rem', fontWeight: 600, color: data.color, margin: 0, lineHeight: 1.25 }}>
          {data.text}
        </Tag>
      </div>
    );
  }

  if (type === 'richtext') {
    return (
      <div
        className="rich-preview px-5 py-[14px] text-sm"
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
    );
  }

  if (type === 'markdown') {
    // marked is loaded globally via CDN
    const html = window.marked?.parse(data.raw || '') || data.raw;
    return (
      <div
        className="md-preview px-5 py-[14px]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  if (type === 'image') {
    const alignMap = { left: 'flex-start', center: 'center', right: 'flex-end' };
    return (
      <div className="px-5 py-[14px] flex flex-col" style={{ alignItems: alignMap[data.align] || 'center' }}>
        {data.url ? (
          <img
            src={data.url}
            alt={data.alt}
            style={{ width: data.width, borderRadius: data.radius + 'px', maxWidth: '100%', display: 'block' }}
            onError={e => (e.target.style.display = 'none')}
          />
        ) : (
          <div className="h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
            No image URL
          </div>
        )}
        {data.caption && (
          <p className="text-[11px] text-gray-400 mt-1.5 text-center">{data.caption}</p>
        )}
      </div>
    );
  }

  if (type === 'divider') {
    return (
      <div style={{ padding: `${data.margin}px 20px` }}>
        <hr style={{ border: 'none', borderTop: `${data.thickness}px ${data.style} ${data.color}` }} />
      </div>
    );
  }

  if (type === 'quote') {
    return (
      <div className="px-5 py-[18px]">
        <blockquote style={{ borderLeft: `3px solid ${data.accent}`, paddingLeft: '1rem', margin: 0, fontStyle: 'italic', color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.65 }}>
          "{data.text}"
        </blockquote>
        {data.author && (
          <p className="mt-2 text-[12px] text-gray-400 pl-4">— {data.author}</p>
        )}
      </div>
    );
  }

  if (type === 'cta') {
    const sizeMap  = { sm: '0.45rem 1rem', md: '0.7rem 1.8rem', lg: '0.95rem 2.4rem' };
    const shapeMap = { md: '6px', lg: '10px', full: '999px' };
    const alignMap = { left: 'flex-start', center: 'center', right: 'flex-end' };
    return (
      <div className="px-5 py-[18px] flex" style={{ justifyContent: alignMap[data.align] || 'center' }}>
        <a
          href={data.href}
          onClick={e => e.preventDefault()}
          style={{
            display: 'inline-block',
            background: data.bg,
            color: data.fg,
            padding: sizeMap[data.size] || sizeMap.md,
            borderRadius: shapeMap[data.shape] || '10px',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.9rem',
            transition: 'opacity .15s',
          }}
          onMouseOver={e => (e.target.style.opacity = '.85')}
          onMouseOut={e => (e.target.style.opacity = '1')}
        >
          {data.label}
        </a>
      </div>
    );
  }

  if (type === 'code') {
    return (
      <div className="px-5 py-[14px]">
        <div className="rounded-[10px] overflow-hidden" style={{ background: '#0f172a' }}>
          <div className="flex items-center gap-1.5 px-3.5 py-2 border-b" style={{ background: '#1e293b', borderColor: '#1e293b' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="ml-2 text-[11px] text-slate-500 font-mono">{data.lang}</span>
          </div>
          <pre className="px-4 py-3.5 m-0 text-[0.78rem] overflow-x-auto leading-[1.65] font-mono" style={{ color: '#86efac' }}>
            <code>{data.code}</code>
          </pre>
        </div>
      </div>
    );
  }

  return null;
}