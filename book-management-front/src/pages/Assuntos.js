import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Paginacao from "../components/common/Paginacao";

const API_ASSUNTOS = "http://localhost:8080/api/v1/subjects";

export default function Assuntos() {

  const [assuntos, setAssuntos] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [idEdicao, setIdEdicao] = useState(null);
  const [termoBusca, setTermoBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalRegistros, setTotalRegistros] = useState(0);

  const listarAssuntos = useCallback(async () => {
    try {
      const resposta = await axios.get(API_ASSUNTOS, {
        params: { subject: termoBusca, page: paginaAtual, size: 10 }
      });
      setAssuntos(resposta.data.data);
      setTotalPaginas(resposta.headers['x-total-pages']);
      setTotalRegistros(resposta.headers['x-total-count']);
    } catch (error) {
      console.error("Erro ao carregar assuntos:", error);
      const mensagemErro = error.response?.data?.message || "Ocorreu um erro ao carregar os assuntos.";
      alert(mensagemErro);
    }
  }, [termoBusca, paginaAtual]);

  async function salvarAssunto(e) {
    e.preventDefault();

    try {
      if (idEdicao) {
        await axios.put(`${API_ASSUNTOS}/${idEdicao}`, { description: descricao });
      } else {
        await axios.post(API_ASSUNTOS, { description: descricao });
      }
      setDescricao("");
      setIdEdicao(null);
      listarAssuntos();
    } catch (error) {
      console.error("Erro ao salvar assunto:", error);
      const mensagemErro = error.response?.data?.message || "Ocorreu um erro ao salvar o assunto.";
      alert(mensagemErro);
    }
  }

  function editarAssunto(assunto) {
    setDescricao(assunto.description);
    setIdEdicao(assunto.id);
  }

  async function excluirAssunto(id) {
    if (!window.confirm("Confirmar excluir?")) return;
    try {
      await axios.delete(`${API_ASSUNTOS}/${id}`);
      listarAssuntos();
    } catch (error) {
      console.error("Erro ao excluir assunto:", error);
      const mensagemErro = error.response?.data?.message || "Ocorreu um erro ao excluir o assunto.";
      alert(mensagemErro);
    }
  }

  useEffect(() => {
    listarAssuntos();
  }, [listarAssuntos]);

  return (
    <div className="container mt-4">
      <h2>Gerenciar Assuntos ({totalRegistros})</h2>

      <form className="mt-3 mb-4" onSubmit={salvarAssunto}>
          <input
              type="text"
              className="form-control mb-2"
              placeholder="Descrição do assunto"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
          />
          <button className="btn btn-primary" type="submit">{idEdicao ? "Atualizar" : "Cadastrar"}</button>
          {idEdicao && (
            <button className="btn btn-secondary ms-2"
              onClick={() => {
                setIdEdicao(null);
                setDescricao("");
                }}>
              Cancelar
            </button>
          )}
        </form>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar assuntos por descrição..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />
      </div>

      <table className="table table-striped">
        <thead>
        <tr>
          <th>ID</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
        </thead>
        <tbody>
          {assuntos.map((assunto) => (
            <tr key={assunto.id}>
              <td>{assunto.id}</td>
              <td>{assunto.description}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarAssunto(assunto)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => excluirAssunto(assunto.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Paginacao
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onMudarPagina={setPaginaAtual}
      />
    </div>
  );
}