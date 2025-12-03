import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

const API_REPORTS = "http://localhost:8080/api/v1/reports";

export default function BookReport() {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reportRef = useRef(); // Ref para o conteúdo do relatório a ser exportado

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get(API_REPORTS);
        setReportData(response.data.data);
      } catch (err) {
        setError("Erro ao carregar dados do relatório.");
        console.error("Erro ao carregar dados do relatório:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const handleExportPdf = () => {
    const element = reportRef.current;
    const opt = {
      margin:       1,
      filename:     'relatorio-livros.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' } // Orientação paisagem para tabelas largas
    };

    html2pdf().set(opt).from(element).save();
  };

  if (loading) {
    return <div className="container mt-4">Carregando relatório...</div>;
  }

  if (error) {
    return <div className="container mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Relatório Completo de Livros</h2>
        <button className="btn btn-primary" onClick={handleExportPdf}>
          Gerar PDF
        </button>
      </div>

      <div ref={reportRef}> {/* Conteúdo a ser exportado */}
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
            {reportData.length > 0 ? (
              reportData.map((item, index) => (
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
