import {useEffect, useState} from "react";
import axios from "axios";

const API = "http://localhost:8080/api/v1/authors";

export default function Autores() {

  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  async function listar() {
    const response = await axios.get(API);
    setAuthors(response.data.data);
  }

  async function salvar(e) {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, {name});
    } else {
      await axios.post(API, {name});
    }

    setName("");
    setEditId(null);
    listar();
  }

  async function editar(autor) {
    setName(autor.name);
    setEditId(autor.id);
  }

  async function deletar(id) {
    if (!window.confirm("Confirmar excluir?")) return;
    await axios.delete(`${API}/${id}`);
    listar();
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    listar();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Autores</h2>

      <form className="mt-3 mb-4" onSubmit={salvar}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nome do autor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">{editId ? "Atualizar" : "Cadastrar"}</button>
        {editId && (
          <button
            className="btn btn-secondary ms-2"
            type="button"
            onClick={() => {
              setEditId(null);
              setName("")}}>
            Cancelar
          </button>
        )}
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
        </tr>
        </thead>
        <tbody>
          {authors.map((autor) => (
            <tr key={autor.id}>
              <td>{autor.id}</td>
              <td>{autor.name}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editar(autor)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => deletar(autor.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}