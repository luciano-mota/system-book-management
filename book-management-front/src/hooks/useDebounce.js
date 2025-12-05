import { useState, useEffect } from 'react';

/**
 * Hook personalizado `useDebounce`.
 * Atrasa a atualização de um valor de estado até que um certo tempo tenha passado
 * desde a última vez que o valor original foi alterado.
 * Útil para otimizar chamadas de API em inputs de busca, por exemplo.
 *
 * @param {*} valor - O valor que você quer "debounced" (atrasar a atualização).
 * @param {number} atraso - O tempo em milissegundos para esperar antes de atualizar o valor debounced.
 * @returns {*} O valor "debounced".
 */
export default function useDebounce(valor, atraso) {
  // Estado interno para armazenar o valor "debounced".
  const [valorDebounced, setValorDebounced] = useState(valor);

  /**
   * useEffect: Configura um temporizador (setTimeout) para atualizar o valor debounced.
   * O temporizador é limpo (clearTimeout) se o valor original ou o atraso mudarem
   * antes que o tempo expire, ou quando o componente é desmontado.
   */
  useEffect(() => {
    // Configura um temporizador para atualizar 'valorDebounced' após o 'atraso'.
    const manipulador = setTimeout(() => {
      setValorDebounced(valor);
    }, atraso);

    // Função de limpeza: é executada antes que o próximo efeito seja executado
    // ou quando o componente é desmontado. Isso evita que temporizadores antigos
    // disparem com valores desatualizados.
    return () => {
      clearTimeout(manipulador);
    };
  }, [valor, atraso]); // Dependências: o efeito é re-executado se 'valor' ou 'atraso' mudarem.

  // Retorna o valor debounced, que só será atualizado após o atraso.
  return valorDebounced;
}