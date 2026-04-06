import { BLOCK_DEFAULTS } from '../constants/blocks';

// ─── Create a new block with defaults ───
export function mkBlock(type) {
  return {
    id: crypto.randomUUID(),
    type,
    data: structuredClone(BLOCK_DEFAULTS[type]),
  };
}

// ─── Export page as standalone HTML file ───
export function exportHtml(blocks) {
  const bodyContent = blocks.map(({ type, data }) => {
    let inner = '';

    if (type === 'header') {
      const sz = { h1: '2rem', h2: '1.6rem', h3: '1.25rem', h4: '1.05rem' };
      inner = `<${data.level} style="text-align:${data.align};color:${data.color};font-size:${sz[data.level]};font-weight:600;margin:0 0 .5rem;line-height:1.25">${data.text}</${data.level}>`;
    } else if (type === 'richtext') {
      inner = `<div style="font-size:.9rem;line-height:1.7;color:#374151">${data.html}</div>`;
    } else if (type === 'markdown') {
      inner = `<div style="font-size:.9rem;line-height:1.7;color:#374151;white-space:pre-wrap;font-family:inherit">${data.raw}</div>`;
    } else if (type === 'image') {
      const j = { left: 'flex-start', center: 'center', right: 'flex-end' };
      inner = `<div style="display:flex;justify-content:${j[data.align] || 'center'}"><figure style="margin:0"><img src="${data.url}" alt="${data.alt}" style="width:${data.width};border-radius:${data.radius}px;max-width:100%;display:block"/>${data.caption ? `<figcaption style="text-align:center;font-size:.75rem;color:#9ca3af;margin-top:6px">${data.caption}</figcaption>` : ''}</figure></div>`;
    } else if (type === 'divider') {
      inner = `<div style="padding:${data.margin}px 0"><hr style="border:none;border-top:${data.thickness}px ${data.style} ${data.color}"/></div>`;
    } else if (type === 'quote') {
      inner = `<blockquote style="border-left:3px solid ${data.accent};padding-left:1rem;margin:0;font-style:italic;color:#4b5563;font-size:.95rem;line-height:1.65">"${data.text}"${data.author ? `<br/><cite style="font-size:.8rem;color:#9ca3af;font-style:normal">— ${data.author}</cite>` : ''}</blockquote>`;
    } else if (type === 'cta') {
      const sz = { sm: '.45rem 1rem', md: '.7rem 1.8rem', lg: '.95rem 2.4rem' };
      const sh = { md: '6px', lg: '10px', full: '999px' };
      const al = { left: 'flex-start', center: 'center', right: 'flex-end' };
      inner = `<div style="display:flex;justify-content:${al[data.align] || 'center'}"><a href="${data.href}" style="display:inline-block;background:${data.bg};color:${data.fg};padding:${sz[data.size] || sz.md};border-radius:${sh[data.shape] || '10px'};font-weight:600;text-decoration:none;font-size:.9rem">${data.label}</a></div>`;
    } else if (type === 'code') {
      inner = `<pre style="background:#0f172a;color:#86efac;border-radius:10px;padding:1.25rem;overflow-x:auto;font-size:.8rem;line-height:1.65;font-family:monospace"><code>${data.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
    }

    return `    <div style="margin-bottom:1.75rem">${inner}</div>`;
  }).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>My Page</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'DM Sans',sans-serif;background:#f4f6fb;padding:3rem 1rem;color:#1f2937}
    .wrap{max-width:720px;margin:0 auto;background:#fff;border-radius:16px;padding:3rem 2.5rem;box-shadow:0 2px 16px rgba(0,0,0,.05)}
    img{max-width:100%}
  </style>
</head>
<body>
  <div class="wrap">
${bodyContent}
  </div>
</body>
</html>`;

  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  a.download = 'my-page.html';
  a.click();
}