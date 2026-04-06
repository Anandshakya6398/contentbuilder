// ─── Storage Key ───
export const STORAGE_KEY = 'pagecraft_v3';

// ─── Block Type Enums ───
export const BLOCK_TYPES = {
  HEADER:   'header',
  RICHTEXT: 'richtext',
  MARKDOWN: 'markdown',
  IMAGE:    'image',
  DIVIDER:  'divider',
  QUOTE:    'quote',
  CTA:      'cta',
  CODE:     'code',
};

// ─── Block Display Metadata ───
export const BLOCK_META = {
  header:   { label: 'Header',       desc: 'Title with level & style',  icon: 'H',  color: '#eef2ff', tc: '#4f46e5' },
  richtext: { label: 'Rich Text',    desc: 'WYSIWYG formatted text',    icon: 'T',  color: '#eff6ff', tc: '#2563eb' },
  markdown: { label: 'Markdown',     desc: 'Write & preview markdown',  icon: 'MD', color: '#f0fdf4', tc: '#16a34a' },
  image:    { label: 'Image',        desc: 'Display an image by URL',   icon: '⬜', color: '#fffbeb', tc: '#d97706' },
  divider:  { label: 'Divider',      desc: 'Visual separator line',     icon: '—',  color: '#f9fafb', tc: '#6b7280' },
  quote:    { label: 'Quote',        desc: 'Blockquote with author',    icon: '"',  color: '#fdf4ff', tc: '#9333ea' },
  cta:      { label: 'Button / CTA', desc: 'Call-to-action button',     icon: '↗',  color: '#fff7ed', tc: '#ea580c' },
  code:     { label: 'Code Block',   desc: 'Syntax-styled code',        icon: '<>', color: '#f8fafc', tc: '#475569' },
};

// ─── Palette Drag Order ───
export const PALETTE_ORDER = [
  'header', 'richtext', 'markdown', 'image',
  'quote', 'cta', 'code', 'divider',
];

// ─── Default Block Data ───
export const BLOCK_DEFAULTS = {
  header:   { text: 'Hello, World!', level: 'h1', align: 'left', color: '#111827' },
  richtext: { html: '<p>Start writing your content here. You can <strong>bold</strong>, <em>italicize</em>, and more.</p>' },
  markdown: { raw: '## My Section\n\nWrite **markdown** and see it previewed live.\n\n- Point one\n- Point two\n- Point three\n\n> A great quote goes here.' },
  image:    { url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80', alt: 'Mountain lake', caption: '', width: '100%', align: 'center', radius: 10 },
  divider:  { style: 'solid', color: '#e5e7eb', thickness: 1, margin: 16 },
  quote:    { text: 'The best way to predict the future is to create it.', author: 'Peter Drucker', accent: '#5B73F5' },
  cta:      { label: 'Get Started', href: '#', bg: '#5B73F5', fg: '#ffffff', align: 'center', size: 'md', shape: 'lg' },
  code:     { code: 'function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));', lang: 'javascript' },
};