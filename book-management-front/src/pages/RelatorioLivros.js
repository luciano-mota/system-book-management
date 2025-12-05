import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js'; // Biblioteca para gerar PDF a partir de HTML.

// Endereço da API para buscar dados de relatórios.
const API_RELATORIOS = "http://localhost:8080/api/v1/reports";

export default function RelatorioLivros() {
  // --- ESTADOS DO COMPONENTE ---
  // dadosRelatorio: Armazena os dados brutos recebidos da API para o relatório.
  const [dadosRelatorio, setDadosRelatorio] = useState([]);
  // carregando: Indica se os dados do relatório estão sendo carregados.
  const [carregando, setCarregando] = useState(true);
  // erro: Armazena uma mensagem de erro caso a requisição falhe.
  const [erro, setErro] = useState(null);
  // relatorioRef: Referência para o elemento HTML que contém o conteúdo a ser exportado para PDF.
  const relatorioRef = useRef();

  // --- FUNÇÕES DE LÓGICA E DADOS ---

  /**
   * useEffect: Hook que executa a função buscarDadosRelatorio uma vez,
   * quando o componente é montado, para carregar os dados iniciais.
   */
  useEffect(() => {
    /**
     * buscarDadosRelatorio: Função assíncrona para buscar os dados do relatório da API.
     */
    const buscarDadosRelatorio = async () => {
      try {
        const resposta = await axios.get(API_RELATORIOS); // Faz a requisição GET para a API.
        setDadosRelatorio(resposta.data.data); // Atualiza o estado com os dados recebidos.
      } catch (err) {
        // Em caso de erro, define a mensagem de erro e loga no console.
        setErro("Erro ao carregar dados do relatório.");
        console.error("Erro ao carregar dados do relatório:", err);
      } finally {
        setCarregando(false); // Finaliza o estado de carregamento, independentemente do sucesso ou falha.
      }
    };

    buscarDadosRelatorio(); // Chama a função para buscar os dados.
  }, []); // Array de dependências vazio, executa apenas na montagem do componente.

  /**
   * exportarPdf: Função para gerar um arquivo PDF a partir do conteúdo do relatório.
   * Utiliza a biblioteca html2pdf.js.
   */
  const exportarPdf = () => {
    const elemento = relatorioRef.current; // Obtém o elemento HTML referenciado.
    // Opções de configuração para a geração do PDF.
    const opt = {
      margin:       1, // Margem do documento.
      filename:     'relatorio-livros.pdf', // Nome do arquivo PDF.
      image:        { type: 'jpeg', quality: 0.98 }, // Qualidade da imagem.
      html2canvas:  { scale: 2 }, // Escala para renderização do HTML para canvas.
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' } // Configurações do PDF (unidade, formato, orientação).
    };

    // Inicia o processo de geração do PDF.
    html2pdf().set(opt).from(elemento).save();
  };

  // --- RENDERIZAÇÃO CONDICIONAL ---
  // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados.
  if (carregando) {
    return <div className="container mt-4">Carregando relatório...</div>;
  }

  // Exibe uma mensagem de erro se a requisição falhar.
  if (erro) {
    return <div className="container mt-4 text-danger">{erro}</div>;
  }

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Relatório Completo de Livros</h2>
        {/* Botão para acionar a exportação do PDF. */}
        <button className="btn btn-primary" onClick={exportarPdf}>
          Gerar PDF
        </button>
      </div>

      {/* Div que contém o conteúdo a ser exportado para PDF. */}
      <div ref={relatorioRef}>
        <h3 className="text-center mb-3">Relatório de Livros</h3>
        {/* Tabela para exibir os dados do relatório. */}
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
            {/* Renderiza as linhas da tabela se houver dados, caso contrário, exibe uma mensagem. */}
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