// Importações necessárias do React e da biblioteca axios para chamadas HTTP.
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

// Componentes filhos que serão usados nesta página.
import ListaLivros from "../components/books/ListaLivros";
import ModalLivro from "../components/books/ModalLivro";
import Paginacao from "../components/common/Paginacao";

// Endereços das APIs que serão consumidas.
const API_LIVROS = "http://localhost:8080/api/v1/books";
const API_AUTORES = "http://localhost:8080/api/v1/authors";
const API_ASSUNTOS = "http://localhost:8080/api/v1/subjects";

export default function Livros() {
  // --- ESTADOS DO COMPONENTE ---
  const [livros, setLivros] = useState([]);
  const [exibirModal, setExibirModal] = useState(false);
  const [livroEmEdicao, setLivroEmEdicao] = useState(null);
  const [termoBusca, setTermoBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalRegistros, setTotalRegistros] = useState(0);

  // --- FUNÇÕES DE LÓGICA E DADOS ---

  const carregarLivros = useCallback(async () => {
    try {
      const [respostaLivros, respostaAutores, respostaAssuntos] = await Promise.all([
        axios.get(API_LIVROS, { params: { nome: termoBusca, page: paginaAtual, size: 10 } }),
        axios.get(API_AUTORES),
        axios.get(API_ASSUNTOS)
      ]);

      const mapaAutores = new Map(respostaAutores.data.data.map(a => [a.id, a.name]));
      const mapaAssuntos = new Map(respostaAssuntos.data.data.map(s => [s.id, s.description]));

      const livrosEnriquecidos = respostaLivros.data.data.map(livro => ({
        ...livro,
        autores: livro.authors.map(autorId => ({ id: autorId, nome: mapaAutores.get(autorId) || "Autor desconhecido" })),
        assuntos: livro.subjects.map(assuntoId => ({
          id: assuntoId,
          descricao: mapaAssuntos.get(assuntoId) || "Assunto desconhecido"
        }))
      }));

      setLivros(livrosEnriquecidos);
      setTotalPaginas(respostaLivros.headers['x-total-pages']);
      setTotalRegistros(respostaLivros.headers['x-total-count']);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      alert("Não foi possível carregar os dados. Tente novamente mais tarde.");
    }
  }, [termoBusca, paginaAtual]);

  useEffect(() => {
    carregarLivros();
  }, [carregarLivros]);

  function editarLivro(livro) {
    setLivroEmEdicao(livro);
    setExibirModal(true);
  }

  async function excluirLivro(id) {
    if (window.confirm("Confirmar exclusão?")) {
      try {
        await axios.delete(`${API_LIVROS}/${id}`);
        carregarLivros();
      } catch (error) {
        console.error("Erro ao excluir livro:", error);
        const mensagemErro = error.response?.data?.message || "Ocorreu um erro ao excluir o livro.";
        alert(mensagemErro);
      }
    }
  }

  async function salvarLivro(dadosLivro) {
    const payload = {
      ...dadosLivro,
      bookCode: parseInt(dadosLivro.bookCode),
      authorsIds: dadosLivro.authors.map(a => a.id),
      subjectsIds: dadosLivro.subjects.map(s => s.id),
    };
    delete payload.authors;
    delete payload.subjects;

    try {
      if (livroEmEdicao) {
        await axios.put(`${API_LIVROS}/${livroEmEdicao.id}`, payload);
      } else {
        await axios.post(API_LIVROS, payload);
      }

      setExibirModal(false);
      setLivroEmEdicao(null);
      carregarLivros();
    } catch (error) {
      console.error("Erro ao salvar livro:", error);
      const mensagemErro = error.response?.data?.error || "";

      if (mensagemErro.includes("CONFLICT")) {
        alert("Já existe um livro com este código. Por favor, verifique os dados e tente novamente.");
      } else {
        alert("Ocorreu um erro ao salvar o livro. Verifique os dados e tente novamente.");
      }
    }
  }

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <div className="container mt-4">
      <h2>Gerenciador de Livros ({totalRegistros})</h2>

      <button className="btn btn-primary mb-3" onClick={() => { setLivroEmEdicao(null); setExibirModal(true); }}>
        Cadastrar Livro
      </button>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar por nome"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />
      </div>

      <ListaLivros livros={livros} onEditar={editarLivro} onExcluir={excluirLivro} />

      <Paginacao
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onMudarPagina={setPaginaAtual}
      />

      <ModalLivro
        exibir={exibirModal}
        onOcultar={() => setExibirModal(false)}
        onSalvar={salvarLivro}
        livroExistente={livroEmEdicao}
      />
    </div>
  );
}