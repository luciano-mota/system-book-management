import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const API_RELATORIOS = "http://localhost:8080/api/v1/reports";

export default function RelatorioLivros() {
  const [dadosRelatorio, setDadosRelatorio] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const relatorioRef = useRef();

  useEffect(() => {
    const buscarDadosRelatorio = async () => {
      try {
        const resposta = await axios.get(API_RELATORIOS);
        setDadosRelatorio(resposta.data.data);
      } catch (err) {
        setErro("Erro ao carregar dados do relatório.");
        console.error("Erro ao carregar dados do relatório:", err);
      } finally {
        setCarregando(false);
      }
    };

    buscarDadosRelatorio();
  }, []);

  const exportarPdf = () => {
    const elemento = relatorioRef.current;
    const opt = {
      margin:       1,
      filename:     'relatorio-livros.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
    };

    html2pdf().set(opt).from(elemento).save();
  };

  if (carregando) {
    return <div className="container mt-4">Carregando relatório...</div>;
  }

  if (erro) {
    return <div className="container mt-4 text-danger">{erro}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Relatório Completo de Livros</h2>
        <button className="btn btn-primary" onClick={exportarPdf}>
          Gerar PDF
        </button>
      </div>

      <div ref={relatorioRef}>
        <h3 className="text-center mb-3">Relatório de Livros</h3>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Código</th>
              <th>Título</th>
              <th>Editora</th>
              <th>Edição</th>
              <th>Ano</th>
              <th>Preço</th>
              <th>Autores</th>
              <th>Assuntos</th>
            </tr>
          </thead>
          <tbody>
            {dadosRelatorio.length > 0 ? (
              dadosRelatorio.map((item, index) => (
                <tr key={index}>
                  <td>{item.bookCode}</td>
                  <td>{item.bookTitle}</td>
                  <td>{item.publisher}</td>
                  <td>{item.edition}</td>
                  <td>{item.yearPublication}</td>
                  <td>{item.price}</td>
                  <td>{item.authors}</td>
                  <td>{item.subjects}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">Nenhum dado de relatório disponível.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}