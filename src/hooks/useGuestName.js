import { useState, useEffect } from 'react';

import config from '../data/config.json';

export const useGuestName = () => {
  const defaultName = config.default_guest_name || 'Temanku <3';

  // Get initial name immediately to prevent flickering
  const getInitialName = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      return url.searchParams.get('kepada') || url.searchParams.get('to') || defaultName;
    }
    return defaultName;
  };

  const [guestName, setGuestName] = useState(getInitialName);

  useEffect(() => {
    // Only update if the name actually changes
    const newName = getInitialName();
    if (newName !== guestName) {
      setGuestName(newName);
    }
  }, []);

  return guestName;
};
