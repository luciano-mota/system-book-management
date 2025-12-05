import React from 'react';

/**
 * Componente de Paginação reutilizável.
 * Exibe botões para navegar entre as páginas de resultados.
 *
 * @param {object} props - As propriedades do componente.
 * @param {number} props.paginaAtual - O índice da página atualmente selecionada (base 0).
 * @param {number} props.totalPaginas - O número total de páginas disponíveis.
 * @param {function} props.onMudarPagina - Função de callback chamada quando uma nova página é selecionada.
 */
const Paginacao = ({ paginaAtual, totalPaginas, onMudarPagina }) => {
  // Converte o total de páginas e a página atual para números inteiros, garantindo o tipo correto.
  const numeroTotalPaginas = parseInt(totalPaginas, 10);
  const numeroPaginaAtual = parseInt(paginaAtual, 10);

  // Se houver apenas uma página ou menos, não exibe a paginação.
  if (numeroTotalPaginas <= 1) {
    return null;
  }

  // Cria um array com os índices de todas as páginas (ex: [0, 1, 2] para 3 páginas).
  const paginas = Array.from({ length: numeroTotalPaginas }, (_, i) => i);

  /**
   * irParaAnterior: Função para navegar para a página anterior.
   * Chama onMudarPagina com o índice da página anterior, se não estiver na primeira página.
   */
  const irParaAnterior = () => {
    if (numeroPaginaAtual > 0) {
      onMudarPagina(numeroPaginaAtual - 1);
    }
  };

  /**
   * irParaProxima: Função para navegar para a próxima página.
   * Chama onMudarPagina com o índice da próxima página, se não estiver na última página.
   */
  const irParaProxima = () => {
    if (numeroPaginaAtual < numeroTotalPaginas - 1) {
      onMudarPagina(numeroPaginaAtual + 1);
    }
  };

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <nav aria-label="Navegação de Páginas">
      <ul className="pagination">
        {/* Botão "Anterior" */}
        <li className={`page-item ${numeroPaginaAtual === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={irParaAnterior} disabled={numeroPaginaAtual === 0}>
            Anterior
          </button>
        </li>

        {/* Botões numéricos para cada página */}
        {paginas.map(pagina => (
          <li key={pagina} className={`page-item ${numeroPaginaAtual === pagina ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onMudarPagina(pagina)}>
              {pagina + 1} {/* Exibe o número da página (base 1 para o usuário) */}
            </button>
          </li>
        ))}

        {/* Botão "Próximo" */}
        <li className={`page-item ${numeroPaginaAtual === numeroTotalPaginas - 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={irParaProxima} disabled={numeroPaginaAtual === numeroTotalPaginas - 1}>
            Próximo
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginacao;