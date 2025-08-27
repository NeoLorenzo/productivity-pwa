// src/hooks/useMediaQuery.jsx

import { useState, useEffect } from 'react';

/**
 * @description A custom hook to determine if a media query matches the current screen state.
 * @param {string} query - The media query string (e.g., '(max-width: 768px)').
 * @returns {boolean} - True if the query matches, false otherwise.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);

    // The 'change' event is more efficient than 'resize'
    mediaQueryList.addEventListener('change', listener);

    // Cleanup the listener on component unmount
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
}