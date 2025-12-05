import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Paginacao from "../components/common/Paginacao";

const API_AUTORES = "http://localhost:8080/api/v1/authors";

export default function Autores() {

  const [autores, setAutores] = useState([]);
  const [nome, setNome] = useState("");
  const [idEdicao, setIdEdicao] = useState(null);
  const [termoBusca, setTermoBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalRegistros, setTotalRegistros] = useState(0);

  const listarAutores = useCallback(async () => {
    try {
      const resposta = await axios.get(API_AUTORES, {
        params: { name: termoBusca, page: paginaAtual, size: 10 }
      });
      setAutores(resposta.data.data);
      setTotalPaginas(resposta.headers['x-total-pages']);
      setTotalRegistros(resposta.headers['x-total-count']);
    } catch (error) {
      console.error("Erro ao carregar autores:", error);
      const mensagemErro = error.response?.data?.message || "Ocorreu um erro ao carregar os autores.";
      alert(mensagemErro);
    }
  }, [termoBusca, paginaAtual]);

  async function salvarAutor(e) {
    e.preventDefault();

    try {
      if (idEdicao) {
        await axios.put(`${API_AUTORES}/${idEdicao}`, {name: nome});
      } else {
        await axios.post(API_AUTORES, {name: nome});
      }

      setNome("");
      setIdEdicao(null);
      listarAutores();
    } catch (error) {
      console.error("Erro ao salvar autor:", error);
      const mensagemErro = error.response?.data?.message || "Ocorreu um erro ao salvar o autor.";
      alert(mensagemErro);
    }
  }

  function editarAutor(autor) {
    setNome(autor.name);
    setIdEdicao(autor.id);
  }

  async function excluirAutor(id) {
    if (!window.confirm("Confirmar excluir?")) return;
    try {
      await axios.delete(`${API_AUTORES}/${id}`);
      listarAutores();
    } catch (error) {
      console.error("Erro ao excluir autor:", error);
      const mensagemErro = error.response?.data?.message || "Ocorreu um erro ao excluir o autor.";
      alert(mensagemErro);
    }
  }

  useEffect(() => {
    listarAutores();
  }, [listarAutores]);

  return (
    <div className="container mt-4">
      <h2>Autores ({totalRegistros})</h2>

      <form className="mt-3 mb-4" onSubmit={salvarAutor}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nome do autor"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">{idEdicao ? "Atualizar" : "Cadastrar"}</button>
        {idEdicao && (
          <button
            className="btn btn-secondary ms-2"
            type="button"
            onClick={() => {
              setIdEdicao(null);
              setNome("")}}>
            Cancelar
          </button>
        )}
      </form>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar por nome"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
        </tr>
        </thead>
        <tbody>
          {autores.map((autor) => (
            <tr key={autor.id}>
              <td>{autor.id}</td>
              <td>{autor.name}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarAutor(autor)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => excluirAutor(autor.id)}>Excluir</button>
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
  )
}