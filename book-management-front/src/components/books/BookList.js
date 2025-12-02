import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

export default function BookList({ books, onEdit, onDelete }) {
  const pdfContentRef = useRef(); // Referência para o conteúdo completo a ser exportado

  const handleExportPdf = () => {
    const element = pdfContentRef.current;

    // Encontra a tabela dentro do elemento de conteúdo do PDF
    const tableElement = element.querySelector('table');

    // Seleciona o cabeçalho e todas as células da coluna "Ações"
    const actionsHeader = tableElement.querySelector('th:last-child');
    const actionCells = tableElement.querySelectorAll('td:last-child');

    // Armazena os elementos e os remove temporariamente
    const removedElements = [];
    if (actionsHeader) {
      removedElements.push({ parent: actionsHeader.parentNode, element: actionsHeader, nextSibling: actionsHeader.nextSibling });
      actionsHeader.remove();
    }
    actionCells.forEach(cell => {
      removedElements.push({ parent: cell.parentNode, element: cell, nextSibling: cell.nextSibling });
      cell.remove();
    });

    const opt = {
      margin:       1,
      filename:     'book-list.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      // Após salvar o PDF, reinserir os elementos no DOM
      removedElements.forEach(({ parent, element, nextSibling }) => {
        if (nextSibling) {
          parent.insertBefore(element, nextSibling);
        } else {
          parent.appendChild(element);
        }
      });
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={handleExportPdf}>
          Exportar para PDF
        </button>
      </div>
      {/* Novo div que envolve o título e a tabela, e será o alvo do PDF */}
      <div ref={pdfContentRef}>
        <h2 className="text-center mb-3">Relatório de Livros</h2> {/* Título adicionado */}
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Título</th>
              <th>Editora</th>
              <th>Ano</th>
              <th>Preço</th>
              <th>Autores</th>
              <th>Assuntos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.bookCode}</td>
                <td>{b.title}</td>
                <td>{b.publisher}</td>
                <td>{b.yearPublication}</td>
                <td>{b.price}</td>
                <td>{b.authors.map(a => a.name).join(", ")}</td>
                <td>{b.subjects.map(s => s.description).join(", ")}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(b)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(b.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
