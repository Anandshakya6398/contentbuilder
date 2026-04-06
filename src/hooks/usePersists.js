import { useState, useEffect } from 'react';
import { STORAGE_KEY } from '../constants/blocks';

// ─── Custom hook: auto-save blocks to localStorage ───
export function usePersist() {
  const [blocks, setBlocks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedAt, setSavedAt] = useState(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDirty(true);

    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
        setSavedAt(new Date());
        setDirty(false);
      } catch {
        // localStorage unavailable — silently fail
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [blocks]);

  return { blocks, setBlocks, savedAt, dirty };
}