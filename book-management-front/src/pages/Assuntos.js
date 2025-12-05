import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Paginacao from "../components/common/Paginacao"; // Componente de paginação

// Endereço da API para operações com assuntos.
const API_ASSUNTOS = "http://localhost:8080/api/v1/subjects";

export default function Assuntos() {
  // --- ESTADOS DO COMPONENTE ---
  // assuntos: Armazena a lista de assuntos exibida na tabela.
  const [assuntos, setAssuntos] = useState([]);
  // descricao: Armazena a descrição do assunto digitado no campo de input (para cadastro/edição).
  const [descricao, setDescricao] = useState("");
  // idEdicao: Armazena o ID do assunto que está sendo editado (null para novo cadastro).
  const [idEdicao, setIdEdicao] = useState(null);
  // termoBusca: Armazena o texto digitado pelo usuário para filtrar a lista de assuntos.
  const [termoBusca, setTermoBusca] = useState("");
  // paginaAtual: Indica a página atual dos resultados da busca (começa em 0).
  const [paginaAtual, setPaginaAtual] = useState(0);
  // totalPaginas: Armazena o número total de páginas disponível na API.
  const [totalPaginas, setTotalPaginas] = useState(0);
  // totalRegistros: Armazena o número total de assuntos encontrados na API.
  const [totalRegistros, setTotalRegistros] = useState(0);

  // --- FUNÇÕES DE LÓGICA E DADOS ---

  /**
   * listarAssuntos: Função assíncrona para buscar assuntos da API.
   * Utiliza useCallback para memorizar a função e evitar recriações desnecessárias,
   * otimizando o desempenho e evitando loops infinitos no useEffect.
   */
  const listarAssuntos = useCallback(async () => {
    try {
      // Realiza a chamada GET para a API de assuntos, incluindo termo de busca e paginação.
      const resposta = await axios.get(API_ASSUNTOS, {
        params: { subject: termoBusca, page: paginaAtual, size: 10 } // Parâmetros de busca e paginação
      });
      // Atualiza os estados com os dados recebidos da API e informações de paginação dos headers.
      setAssuntos(resposta.data.data);
      setTotalPaginas(resposta.headers['x-total-pages']); // Cabeçalho com o total de páginas
      setTotalRegistros(resposta.headers['x-total-count']); // Cabeçalho com o total de registros
    } catch (error) {
      // Em caso de erro na requisição, exibe uma mensagem no console e um alerta para o usuário.
      console.error("Erro ao carregar assuntos:", error);
      const mensagemErro = error.response?.data?.message || "Ocorreu um erro ao carregar os assuntos.";
      alert(mensagemErro);
    }
  }, [termoBusca, paginaAtual]); // Dependências: a função é recriada se o termo de busca ou a página atual mudar.

  /**
   * salvarAssunto: Função assíncrona para cadastrar um novo assunto ou atualizar um existente.
   * @param {object} e - Evento de submissão do formulário.
   */
  async function salvarAssunto(e) {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página.

    try {
      // Verifica se há um idEdicao, indicando que é uma atualização (PUT).
      if (idEdicao) {
        await axios.put(`${API_ASSUNTOS}/${idEdicao}`, { description: descricao }); // Requisição PUT para atualizar.
      } else {
        await axios.post(API_ASSUNTOS, { description: descricao }); // Requisição POST para cadastrar.
      }
      // Limpa o campo de descrição, reseta o idEdicao e recarrega a lista de assuntos.
      setDescricao("");
      setIdEdicao(null);
      listarAssuntos();
    } catch (error) {
      // Tratamento de erro ao salvar/atualizar o assunto.
      console.error("Erro ao salvar assunto:", error);
      const mensagemErro = error.response?.data?.message || "Ocorreu um erro ao salvar o assunto.";
      alert(mensagemErro);
    }
  }

  /**
   * editarAssunto: Preenche o formulário com os dados do assunto selecionado para edição.
   * @param {object} assunto - O objeto do assunto a ser editado.
   */
  function editarAssunto(assunto) {
    setDescricao(assunto.description); // Preenche o campo de descrição com a descrição do assunto.
    setIdEdicao(assunto.id); // Define o ID do assunto para indicar modo de edição.
  }

  /**
   * excluirAssunto: Função assíncrona para deletar um assunto da API.
   * @param {number} id - O ID do assunto a ser excluído.
   */
  async function excluirAssunto(id) {
    // Confirmação antes de prosseguir com a exclusão.
    if (!window.confirm("Confirmar excluir?")) return;
    try {
      await axios.delete(`${API_ASSUNTOS}/${id}`); // Chama a API para deletar.
      listarAssuntos(); // Recarrega a lista de assuntos após a exclusão.
    } catch (error) {
      // Tratamento de erro na exclusão.
      console.error("Erro ao excluir assunto:", error);
      const mensagemErro = error.response?.data?.message || "Ocorreu um erro ao excluir o assunto.";
      alert(mensagemErro);
    }
  }

  /**
   * useEffect: Hook que executa a função listarAssuntos quando o componente é montado
   * ou quando a função listarAssuntos (e suas dependências) é alterada.
   */
  useEffect(() => {
    listarAssuntos();
  }, [listarAssuntos]); // Dependência: listarAssuntos (que já encapsula termoBusca e paginaAtual).

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <div className="container mt-4">
      {/* Título da página com o total de registros */}
      <h2>Gerenciar Assuntos ({totalRegistros})</h2>

      {/* Formulário de Cadastro/Edição de Assunto */}
      <form className="mt-3 mb-4" onSubmit={salvarAssunto}>
          <input
              type="text"
              className="form-control mb-2"
              placeholder="Assunto"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)} // Atualiza o estado 'descricao' conforme o input.
              required // Campo obrigatório.
              maxLength="20"
          />
          {/* Botão de submissão do formulário, muda o texto dependendo se está editando ou cadastrando. */}
          <button className="btn btn-primary" type="submit">{idEdicao ? "Atualizar" : "Cadastrar"}</button>
          {/* Botão "Cancelar" aparece apenas em modo de edição. */}
          {idEdicao && (
            <button className="btn btn-secondary ms-2"
              onClick={() => {
                setIdEdicao(null); // Reseta o ID de edição.
                setDescricao(""); // Limpa o campo de descrição.
                }}>
              Cancelar
            </button>
          )}
        </form>

      {/* Campo de busca para filtrar assuntos por descrição */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar assuntos..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)} // Atualiza o estado 'termoBusca'.
        />
      </div>

      {/* Tabela para exibir a lista de assuntos */}
      <table className="table table-striped">
        <thead>
        <tr>
          <th>ID</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
        </thead>
        <tbody>
          {/* Mapeia a lista de assuntos para criar uma linha na tabela para cada um. */}
          {assuntos.map((assunto) => (
            <tr key={assunto.id}>
              <td>{assunto.id}</td>
              <td>{assunto.description}</td>
              <td>
                {/* Botões de ação para editar e excluir assuntos. */}
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarAssunto(assunto)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => excluirAssunto(assunto.id)}>Excluir</button>
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
  );
}