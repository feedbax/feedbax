import { useEffect } from 'react';

export default function useMounted(fn: () => void) {
  useEffect(fn, []);
}
