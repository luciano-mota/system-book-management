import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Paginacao from "../components/common/Paginacao"; // Componente de paginação

// Endereço da API para operações com autores.
const API_AUTORES = "http://localhost:8080/api/v1/authors";

export default function Autores() {
  // --- ESTADOS DO COMPONENTE ---
  // autores: Armazena a lista de autores exibida na tabela.
  const [autores, setAutores] = useState([]);
  // nome: Armazena o nome do autor digitado no campo de input (para cadastro/edição).
  const [nome, setNome] = useState("");
  // idEdicao: Armazena o ID do autor que está sendo editado (null para novo cadastro).
  const [idEdicao, setIdEdicao] = useState(null);
  // termoBusca: Armazena o texto digitado pelo usuário para filtrar a lista de autores.
  const [termoBusca, setTermoBusca] = useState("");
  // paginaAtual: Indica a página atual dos resultados da busca (começa em 0).
  const [paginaAtual, setPaginaAtual] = useState(0);
  // totalPaginas: Armazena o número total de páginas disponível na API.
  const [totalPaginas, setTotalPaginas] = useState(0);
  // totalRegistros: Armazena o número total de autores encontrados na API.
  const [totalRegistros, setTotalRegistros] = useState(0);

  // --- FUNÇÕES DE LÓGICA E DADOS ---

  /**
   * listarAutores: Função assíncrona para buscar autores da API.
   * Utiliza useCallback para memorizar a função e evitar recriações desnecessárias,
   * otimizando o desempenho e evitando loops infinitos no useEffect.
   */
  const listarAutores = useCallback(async () => {
    try {
      // Realiza a chamada GET para a API de autores, incluindo termo de busca e paginação.
      const resposta = await axios.get(API_AUTORES, {
        params: { name: termoBusca, page: paginaAtual, size: 10 } // Parâmetros de busca e paginação
      });
      // Atualiza os estados com os dados recebidos da API e informações de paginação dos headers.
      setAutores(resposta.data.data);
      setTotalPaginas(resposta.headers['x-total-pages']); // Cabeçalho com o total de páginas
      setTotalRegistros(resposta.headers['x-total-count']); // Cabeçalho com o total de registros
    } catch (error) {
      // Em caso de erro na requisição, exibe uma mensagem no console e um alerta para o usuário.
      console.error("Erro ao carregar autores:", error);
      const mensagemErro = error.response?.data?.message || "Ocorreu um erro ao carregar os autores.";
      alert(mensagemErro);
    }
  }, [termoBusca, paginaAtual]); // Dependências: a função é recriada se o termo de busca ou a página atual mudar.

  /**
   * salvarAutor: Função assíncrona para cadastrar um novo autor ou atualizar um existente.
   * @param {object} e - Evento de submissão do formulário.
   */
  async function salvarAutor(e) {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página.

    try {
      // Verifica se há um idEdicao, indicando que é uma atualização (PUT).
      if (idEdicao) {
        await axios.put(`${API_AUTORES}/${idEdicao}`, {name: nome}); // Requisição PUT para atualizar.
      } else {
        await axios.post(API_AUTORES, {name: nome}); // Requisição POST para cadastrar.
      }

      // Limpa o campo de nome, reseta o idEdicao e recarrega a lista de autores.
      setNome("");
      setIdEdicao(null);
      listarAutores();
    } catch (error) {
      // Tratamento de erro ao salvar/atualizar o autor.
      console.error("Erro ao salvar autor:", error);
      const mensagemErro = error.response?.data?.message || "Ocorreu um erro ao salvar o autor.";
      alert(mensagemErro);
    }
  }

  /**
   * editarAutor: Preenche o formulário com os dados do autor selecionado para edição.
   * @param {object} autor - O objeto do autor a ser editado.
   */
  function editarAutor(autor) {
    setNome(autor.name); // Preenche o campo de nome com o nome do autor.
    setIdEdicao(autor.id); // Define o ID do autor para indicar modo de edição.
  }

  /**
   * excluirAutor: Função assíncrona para deletar um autor da API.
   * @param {number} id - O ID do autor a ser excluído.
   */
  async function excluirAutor(id) {
    // Confirmação antes de prosseguir com a exclusão.
    if (!window.confirm("Confirmar excluir?")) return;
    try {
      await axios.delete(`${API_AUTORES}/${id}`); // Chama a API para deletar.
      listarAutores(); // Recarrega a lista de autores após a exclusão.
    } catch (error) {
      // Tratamento de erro na exclusão.
      console.error("Erro ao excluir autor:", error);
      const mensagemErro = error.response?.data?.message || "Ocorreu um erro ao excluir o autor.";
      alert(mensagemErro);
    }
  }

  /**
   * useEffect: Hook que executa a função listarAutores quando o componente é montado
   * ou quando a função listarAutores (e suas dependências) é alterada.
   */
  useEffect(() => {
    listarAutores();
  }, [listarAutores]); // Dependência: listarAutores (que já encapsula termoBusca e paginaAtual).

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <div className="container mt-4">
      {/* Título da página com o total de registros */}
      <h2>Autores ({totalRegistros})</h2>

      {/* Formulário de Cadastro/Edição de Autor */}
      <form className="mt-3 mb-4" onSubmit={salvarAutor}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nome do autor"
          value={nome}
          onChange={(e) => setNome(e.target.value)} // Atualiza o estado 'nome' conforme o input.
        />
        {/* Botão de submissão do formulário, muda o texto dependendo se está editando ou cadastrando. */}
        <button className="btn btn-primary" type="submit">{idEdicao ? "Atualizar" : "Cadastrar"}</button>
        {/* Botão "Cancelar" aparece apenas em modo de edição. */}
        {idEdicao && (
          <button
            className="btn btn-secondary ms-2"
            type="button"
            onClick={() => {
              setIdEdicao(null); // Reseta o ID de edição.
              setNome(""); // Limpa o campo de nome.
            }}>
            Cancelar
          </button>
        )}
      </form>

      {/* Campo de busca para filtrar autores por nome */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar por nome"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)} // Atualiza o estado 'termoBusca'.
        />
      </div>

      {/* Tabela para exibir a lista de autores */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
        </tr>
        </thead>
        <tbody>
          {/* Mapeia a lista de autores para criar uma linha na tabela para cada um. */}
          {autores.map((autor) => (
            <tr key={autor.id}>
              <td>{autor.id}</td>
              <td>{autor.name}</td>
              <td>
                {/* Botões de ação para editar e excluir autores. */}
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarAutor(autor)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => excluirAutor(autor.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Componente Paginacao: exibe os controles de paginação */}
      <Paginacao
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onMudarPagina={setPaginaAtual} // Função para atualizar a página atual.
      />
    </div>
  )
}