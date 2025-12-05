import React from 'react';

const Paginacao = ({ paginaAtual, totalPaginas, onMudarPagina }) => {
  const numeroTotalPaginas = parseInt(totalPaginas, 10);
  const numeroPaginaAtual = parseInt(paginaAtual, 10);

  if (numeroTotalPaginas <= 1) {
    return null;
  }

  const paginas = Array.from({ length: numeroTotalPaginas }, (_, i) => i);

  const irParaAnterior = () => {
    if (numeroPaginaAtual > 0) {
      onMudarPagina(numeroPaginaAtual - 1);
    }
  };

  const irParaProxima = () => {
    if (numeroPaginaAtual < numeroTotalPaginas - 1) {
      onMudarPagina(numeroPaginaAtual + 1);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${numeroPaginaAtual === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={irParaAnterior}>
            Anterior
          </button>
        </li>
        {paginas.map(pagina => (
          <li key={pagina} className={`page-item ${numeroPaginaAtual === pagina ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onMudarPagina(pagina)}>
              {pagina + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${numeroPaginaAtual === numeroTotalPaginas - 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={irParaProxima}>
            Próximo
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginacao;