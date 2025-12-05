// Importações necessárias do React e da biblioteca axios para chamadas HTTP.
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

// Componentes filhos que serão usados nesta página.
// ListaLivros: Exibe a tabela de livros.
import ListaLivros from "../components/books/ListaLivros";
// ModalLivro: Formulário modal para cadastrar ou editar um livro.
import ModalLivro from "../components/books/ModalLivro";
// Paginacao: Componente para navegar entre as páginas de resultados.
import Paginacao from "../components/common/Paginacao";

// Endereços das APIs que serão consumidas.
const API_LIVROS = "http://localhost:8080/api/v1/books"; // Endpoint para operações com livros
const API_AUTORES = "http://localhost:8080/api/v1/authors"; // Endpoint para buscar autores (para enriquecer dados do livro)
const API_ASSUNTOS = "http://localhost:8080/api/v1/subjects"; // Endpoint para buscar assuntos (para enriquecer dados do livro)

export default function Livros() {
  // --- ESTADOS DO COMPONENTE ---
  // livros: Armazena a lista de livros exibida na tabela.
  const [livros, setLivros] = useState([]);
  // exibirModal: Controla a visibilidade do modal de cadastro/edição.
  const [exibirModal, setExibirModal] = useState(false);
  // livroEmEdicao: Armazena os dados do livro que está sendo editado (ou null para novo cadastro).
  const [livroEmEdicao, setLivroEmEdicao] = useState(null);
  // termoBusca: Armazena o texto digitado pelo usuário para filtrar a lista de livros.
  const [termoBusca, setTermoBusca] = useState("");
  // paginaAtual: Indica a página atual dos resultados da busca (começa em 0).
  const [paginaAtual, setPaginaAtual] = useState(0);
  // totalPaginas: Armazena o número total de páginas disponível na API.
  const [totalPaginas, setTotalPaginas] = useState(0);
  // totalRegistros: Armazena o número total de livros encontrados na API.
  const [totalRegistros, setTotalRegistros] = useState(0);

  // --- FUNÇÕES DE LÓGICA E DADOS ---

  /**
   * carregarLivros: Função assíncrona para buscar livros, autores e assuntos da API.
   * Utiliza useCallback para memorizar a função e evitar recriações desnecessárias,
   * otimizando o desempenho e evitando loops infinitos no useEffect.
   */
  const carregarLivros = useCallback(async () => {
    try {
      // Realiza chamadas paralelas para buscar livros, autores e assuntos.
      // A busca de livros inclui o termo de busca e os parâmetros de paginação.
      // CORREÇÃO AQUI: Buscando todos os autores e assuntos (size=9999) para garantir que o mapa esteja completo.
      const [respostaLivros, respostaAutores, respostaAssuntos] = await Promise.all([
        // CORREÇÃO AQUI: Alterado 'nome' para 'name' no parâmetro de busca para a API de livros.
        axios.get(API_LIVROS, { params: { name: termoBusca, page: paginaAtual, size: 10 } }),
        axios.get(API_AUTORES, { params: { size: 9999 } }), // Busca todos os autores
        axios.get(API_ASSUNTOS, { params: { size: 9999 } })  // Busca todos os assuntos
      ]);

      // Cria mapas para facilitar a busca de nomes de autores e descrições de assuntos por ID.
      const mapaAutores = new Map(respostaAutores.data.data.map(a => [a.id, a.name]));
      const mapaAssuntos = new Map(respostaAssuntos.data.data.map(s => [s.id, s.description]));

      // Enriquecimento dos dados dos livros:
      // Mapeia os IDs de autores e assuntos dos livros para seus respectivos nomes/descrições.
      const livrosEnriquecidos = respostaLivros.data.data.map(livro => ({
        ...livro,
        authors: livro.authors.map(autorId => ({ id: autorId, name: mapaAutores.get(autorId) || "Autor desconhecido" })),
        subjects: livro.subjects.map(assuntoId => ({
          id: assuntoId,
          description: mapaAssuntos.get(assuntoId) || "Assunto desconhecido"
        }))
      }));

      setLivros(livrosEnriquecidos);
      setTotalPaginas(respostaLivros.headers['x-total-pages']); // Cabeçalho com o total de páginas
      setTotalRegistros(respostaLivros.headers['x-total-count']); // Cabeçalho com o total de registros
    } catch (error) {
      // Em caso de erro na requisição, exibe uma mensagem no console e um alerta para o usuário.
      console.error("Erro ao carregar dados:", error);
      alert("Não foi possível carregar os dados. Tente novamente mais tarde.");
    }
  }, [termoBusca, paginaAtual]); // Dependências: a função é recriada se o termo de busca ou a página atual mudar.

  /**
   * useEffect: Hook que executa a função carregarLivros quando o componente é montado
   * ou quando a função carregarLivros (e suas dependências) é alterada.
   */
  useEffect(() => {
    carregarLivros();
  }, [carregarLivros]); // Dependência: carregarLivros (que já encapsula termoBusca e paginaAtual).

  /**
   * editarLivro: Define o livro a ser editado e abre o modal.
   * @param {object} livro - O objeto do livro a ser editado.
   */
  function editarLivro(livro) {
    setLivroEmEdicao(livro);
    setExibirModal(true);
  }

  /**
   * excluirLivro: Função assíncrona para deletar um livro da API.
   * @param {number} id - O ID do livro a ser excluído.
   */
  async function excluirLivro(id) {
    // Confirmação antes de prosseguir com a exclusão.
    if (window.confirm("Confirmar exclusão?")) {
      try {
        await axios.delete(`${API_LIVROS}/${id}`); // Chama a API para deletar.
        carregarLivros(); // Recarrega a lista de livros após a exclusão.
      } catch (error) {
        // Tratamento de erro na exclusão.
        console.error("Erro ao excluir livro:", error);
        const mensagemErro = error.response?.data?.message || "Ocorreu um erro ao excluir o livro.";
        alert(mensagemErro);
      }
    }
  }

  /**
   * salvarLivro: Função assíncrona para cadastrar um novo livro ou atualizar um existente.
   * @param {object} dadosLivro - Os dados do livro a serem salvos.
   */
  async function salvarLivro(dadosLivro) {
    // Prepara o payload para a API, convertendo bookCode para inteiro
    // e mapeando autores/assuntos para seus respectivos IDs.
    const payload = {
      ...dadosLivro,
      bookCode: parseInt(dadosLivro.bookCode),
      authorsIds: dadosLivro.authors.map(a => a.id),
      subjectsIds: dadosLivro.subjects.map(s => s.id),
    };
    // Remove as propriedades 'authors' e 'subjects' originais, pois a API espera 'authorsIds' e 'subjectsIds'.
    delete payload.authors;
    delete payload.subjects;

    try {
      // Verifica se é uma edição (livroEmEdicao existe) ou um novo cadastro.
      if (livroEmEdicao) {
        await axios.put(`${API_LIVROS}/${livroEmEdicao.id}`, payload); // Requisição PUT para atualizar.
      } else {
        await axios.post(API_LIVROS, payload); // Requisição POST para cadastrar.
      }

      // Fecha o modal, limpa o livro em edição e recarrega a lista.
      setExibirModal(false);
      setLivroEmEdicao(null);
      carregarLivros();
    } catch (error) {
      // Tratamento de erro ao salvar/atualizar o livro.
      console.error("Erro ao salvar livro:", error);
      // Extrai a mensagem de erro da resposta da API, se disponível.
      const mensagemErroApi = error.response?.data?.message || "";
      
      // Validação: Verifica se a mensagem de erro indica um conflito (ex: código de livro duplicado).
      // A string "CONFLICT" é um exemplo; ajuste conforme a mensagem exata do seu backend.
      if (mensagemErroApi.includes("CONFLICT")) {
        alert("Já existe um livro com este código. Por favor, verifique os dados e tente novamente.");
      } else {
        alert("Ocorreu um erro ao salvar o livro. Verifique os dados e tente novamente.");
      }
    }
  }

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <div className="container mt-4">
      {/* Título da página com o total de registros */}
      <h2>Gerenciador de Livros ({totalRegistros})</h2>

      {/* Botão para abrir o modal de cadastro de novo livro */}
      <button className="btn btn-primary mb-3" onClick={() => { setLivroEmEdicao(null); setExibirModal(true); }}>
        Cadastrar Livro
      </button>

      {/* Campo de busca para filtrar livros por nome */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar por nome"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />
      </div>

      {/* Componente ListaLivros: exibe a tabela de livros e passa funções de edição/exclusão */}
      <ListaLivros livros={livros} onEditar={editarLivro} onExcluir={excluirLivro} />

      <Paginacao
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onMudarPagina={setPaginaAtual} // Função para atualizar a página atual
      />

      {/* Componente ModalLivro: modal de cadastro/edição de livros */}
      <ModalLivro
        exibir={exibirModal}
        onOcultar={() => setExibirModal(false)} // Função para fechar o modal
        onSalvar={salvarLivro} // Função para salvar os dados do livro
        livroExistente={livroEmEdicao} // Dados do livro a ser editado
      />
    </div>
  );
}