import { useState, useEffect } from 'react';

export default function useDebounce(valor, atraso) {
  const [valorDebounced, setValorDebounced] = useState(valor);

  useEffect(() => {
    const manipulador = setTimeout(() => {
      setValorDebounced(valor);
    }, atraso);

    return () => {
      clearTimeout(manipulador);
    };
  }, [valor, atraso]);

  return valorDebounced;
}