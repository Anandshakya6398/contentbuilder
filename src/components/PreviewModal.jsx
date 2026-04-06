import { useState } from 'react';
import BlockPreview from './BlockPreview';

// ─── Preview Modal (Desktop / Mobile toggle) ───
export default function PreviewModal({ blocks, onClose }) {
  const [mode, setMode] = useState('desktop');

  return (
    <div
      className="modal-backdrop"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal-box animate-fade-up w-full"
        style={{ maxWidth: mode === 'desktop' ? 860 : 440, maxHeight: '88vh' }}
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100 shrink-0">
          <p className="text-[13px] font-semibold flex-1">Page Preview</p>

          {/* Desktop / Mobile Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-[3px] gap-0.5">
            {[['desktop', '🖥 Desktop'], ['mobile', '📱 Mobile']].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setMode(v)}
                className="px-3 py-1 rounded-md border-none text-[11px] font-medium cursor-pointer transition-all duration-150"
                style={{
                  background:  mode === v ? '#fff' : 'transparent',
                  color:       mode === v ? '#1f2937' : '#9ca3af',
                  boxShadow:   mode === v ? '0 1px 3px rgba(0,0,0,.06)' : 'none',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 border-none bg-gray-100 rounded-[7px] cursor-pointer text-sm text-gray-500 hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Preview body */}
        <div className="flex-1 overflow-y-auto p-5" style={{ background: '#f4f6fb' }}>
          <div
            className="bg-white rounded-[14px] overflow-hidden mx-auto transition-all duration-300"
            style={{
              maxWidth: mode === 'mobile' ? 390 : 720,
              boxShadow: '0 1px 6px rgba(0,0,0,.06)',
            }}
          >
            {blocks.length === 0 ? (
              <div className="p-[60px] text-center text-gray-400 text-[13px]">
                Nothing to preview yet — add some blocks!
              </div>
            ) : (
              blocks.map(b => <BlockPreview key={b.id} block={b} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}