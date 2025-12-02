import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/api/v1/subjects";

export default function Assuntos() {
  const [assuntos, setAssuntos] = useState([]);
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  async function listar() {
    const response = await axios.get(API);
    setAssuntos(response.data.data);
  }

  async function salvar(e) {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, { description });
    } else {
      await axios.post(API, { description });
    }
    setDescription("");
    setEditId(null);
    listar();
  }

  async function editar(assunto) {
    setDescription(assunto.description);
    setEditId(assunto.id);
  }

  async function deletar(id) {
    if (!window.confirm("Confirmar excluir?")) return;
    await axios.delete(`${API}/${id}`);
    listar();
  }

  useEffect(() => {
    listar();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Gerenciar Assuntos</h2>

      <form className="mt-3 mb-4" onSubmit={salvar}>
          <input
              type="text"
              className="form-control mb-2"
              placeholder="Descrição do assunto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
          />
          <button className="btn btn-primary" type="submit">{editId ? "Atualizar" : "Cadastrar"}</button>
          {editId && (
            <button className="btn btn-secondary ms-2"
              onClick={() => {
                setEditId(null);
                setDescription("");
                }}>
              Cancelar
            </button>
          )}
        </form>

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
                <button className="btn btn-warning btn-sm me-2" onClick={() => editar(assunto)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => deletar(assunto.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}