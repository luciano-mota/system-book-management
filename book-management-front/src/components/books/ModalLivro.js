import React, { useState, useEffect } from 'react';
import FormularioAutor from './FormularioAutor';
import FormularioAssunto from './FormularioAssunto';
import FormularioLivro from './FormularioLivro';

const estadoInicialLivro = {
  title: '',
  bookCode: '',
  publisher: '',
  edition: '',
  yearPublication: '',
  price: '',
  authors: [],
  subjects: [],
};

export default function ModalLivro({ exibir, onOcultar, onSalvar, livroExistente }) {
  const [dadosLivro, setDadosLivro] = useState(estadoInicialLivro);

  useEffect(() => {
    if (exibir) {
      if (livroExistente) {
        setDadosLivro({
          ...estadoInicialLivro,
          ...livroExistente,
          authors: livroExistente.authors || [],
          subjects: livroExistente.subjects || [],
        });
      } else {
        setDadosLivro(estadoInicialLivro);
      }
    }
  }, [exibir, livroExistente]);

  if (!exibir) return null;

  function selecionarAutor(autor) {
    if (!dadosLivro.authors.find(a => a.id === autor.id)) {
      setDadosLivro(dadosAnteriores => ({
        ...dadosAnteriores,
        authors: [...dadosAnteriores.authors, autor],
      }));
      alert(`Autor "${autor.name}" adicionado!`);
    }
  }

  function selecionarAssunto(assunto) {
    if (!dadosLivro.subjects.find(s => s.id === assunto.id)) {
      setDadosLivro(dadosAnteriores => ({
        ...dadosAnteriores,
        subjects: [...dadosAnteriores.subjects, assunto],
      }));
      alert(`Assunto "${assunto.description}" adicionado!`);
    }
  }

  function manipularMudanca(e) {
    const { name, value } = e.target;
    setDadosLivro(dadosAnteriores => ({ ...dadosAnteriores, [name]: value }));
  }

  function removerAutor(autorId) {
    setDadosLivro(dadosAnteriores => ({
      ...dadosAnteriores,
      authors: dadosAnteriores.authors.filter(a => a.id !== autorId),
    }));
  }

  function removerAssunto(assuntoId) {
    setDadosLivro(dadosAnteriores => ({
      ...dadosAnteriores,
      subjects: dadosAnteriores.subjects.filter(s => s.id !== assuntoId),
    }));
  }

  function salvarFinal() {
    onSalvar(dadosLivro);
  }

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{livroExistente ? 'Editar Livro' : 'Cadastrar Novo Livro'}</h5>
            <button type="button" className="btn-close" onClick={onOcultar}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6 border-end">
                <h5>Adicionar Autores</h5>
                <FormularioAutor onAutorSelecionado={selecionarAutor} />
                <hr />
                <h5>Adicionar Assuntos</h5>
                <FormularioAssunto onAssuntoSelecionado={selecionarAssunto} />
              </div>
              <div className="col-md-6">
                <FormularioLivro
                  dadosLivro={dadosLivro}
                  onSalvar={salvarFinal}
                  onMudar={manipularMudanca}
                  onRemoverAutor={removerAutor}
                  onRemoverAssunto={removerAssunto}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}