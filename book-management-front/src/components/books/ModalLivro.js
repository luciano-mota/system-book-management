import React, { useState, useEffect } from 'react';
// Importa os formulários de Autor, Assunto e Livro que serão usados dentro do modal.
import FormularioAutor from './FormularioAutor';
import FormularioAssunto from './FormularioAssunto';
import FormularioLivro from './FormularioLivro';

// Define o estado inicial para os dados de um livro.
// Usado para resetar o formulário ou como base para um novo livro.
const estadoInicialLivro = {
  title: '',
  bookCode: '',
  publisher: '',
  edition: '',
  yearPublication: '',
  price: '',
  authors: [], // Lista de autores associados ao livro.
  subjects: [], // Lista de assuntos associados ao livro.
};

/**
 * Componente ModalLivro: Gerencia a exibição e a lógica de um modal para
 * cadastrar um novo livro ou editar um livro existente.
 *
 * @param {object} props - As propriedades do componente.
 * @param {boolean} props.exibir - Controla a visibilidade do modal.
 * @param {function} props.onOcultar - Função de callback para fechar o modal.
 * @param {function} props.onSalvar - Função de callback para salvar os dados do livro.
 * @param {object|null} props.livroExistente - Objeto do livro a ser editado, ou null para novo cadastro.
 */
export default function ModalLivro({ exibir, onOcultar, onSalvar, livroExistente }) {
  // dadosLivro: Estado que armazena os dados do livro sendo manipulado no formulário.
  const [dadosLivro, setDadosLivro] = useState(estadoInicialLivro);

  /**
   * useEffect: Hook para inicializar ou resetar os dados do formulário
   * sempre que o modal é exibido ou um livro existente é passado para edição.
   */
  useEffect(() => {
    if (exibir) { // Só executa se o modal estiver visível.
      if (livroExistente) { // Se houver um livro para edição, preenche o formulário com seus dados.
        setDadosLivro({
          ...estadoInicialLivro, // Garante que campos não presentes em livroExistente sejam resetados.
          ...livroExistente,
          authors: livroExistente.authors || [], // Garante que 'authors' seja um array.
          subjects: livroExistente.subjects || [], // Garante que 'subjects' seja um array.
        });
      } else { // Se não houver livro existente, reseta o formulário para o estado inicial.
        setDadosLivro(estadoInicialLivro);
      }
    }
  }, [exibir, livroExistente]); // Dependências: executa quando 'exibir' ou 'livroExistente' mudam.

  // Se o modal não estiver visível, não renderiza nada.
  if (!exibir) return null;

  /**
   * selecionarAutor: Adiciona um autor à lista de autores do livro, se ainda não estiver presente.
   * @param {object} autor - O objeto do autor selecionado.
   */
  function selecionarAutor(autor) {
    // Verifica se o autor já está na lista para evitar duplicatas.
    if (!dadosLivro.authors.find(a => a.id === autor.id)) {
      setDadosLivro(dadosAnteriores => ({
        ...dadosAnteriores,
        authors: [...dadosAnteriores.authors, autor], // Adiciona o novo autor à lista.
      }));
      alert(`Autor "${autor.name}" adicionado!`); // Feedback para o usuário.
    } else {
      alert(`Autor "${autor.name}" já foi adicionado.`); // Feedback se o autor já existe.
    }
  }

  /**
   * selecionarAssunto: Adiciona um assunto à lista de assuntos do livro, se ainda não estiver presente.
   * @param {object} assunto - O objeto do assunto selecionado.
   */
  function selecionarAssunto(assunto) {
    // Verifica se o assunto já está na lista para evitar duplicatas.
    if (!dadosLivro.subjects.find(s => s.id === assunto.id)) {
      setDadosLivro(dadosAnteriores => ({
        ...dadosAnteriores,
        subjects: [...dadosAnteriores.subjects, assunto], // Adiciona o novo assunto à lista.
      }));
      alert(`Assunto "${assunto.description}" adicionado!`); // Feedback para o usuário.
    } else {
      alert(`Assunto "${assunto.description}" já foi adicionado.`); // Feedback se o assunto já existe.
    }
  }

  /**
   * manipularMudanca: Manipula a mudança de valores nos campos de input do formulário principal do livro.
   * @param {object} e - O evento de mudança.
   */
  function manipularMudanca(e) {
    const { name, value } = e.target;
    setDadosLivro(dadosAnteriores => ({ ...dadosAnteriores, [name]: value })); // Atualiza o estado do livro.
  }

  /**
   * removerAutor: Remove um autor da lista de autores do livro.
   * @param {number} autorId - O ID do autor a ser removido.
   */
  function removerAutor(autorId) {
    setDadosLivro(dadosAnteriores => ({
      ...dadosAnteriores,
      authors: dadosAnteriores.authors.filter(a => a.id !== autorId), // Filtra o autor a ser removido.
    }));
  }

  /**
   * removerAssunto: Remove um assunto da lista de assuntos do livro.
   * @param {number} assuntoId - O ID do assunto a ser removido.
   */
  function removerAssunto(assuntoId) {
    setDadosLivro(dadosAnteriores => ({
      ...dadosAnteriores,
      subjects: dadosAnteriores.subjects.filter(s => s.id !== assuntoId), // Filtra o assunto a ser removido.
    }));
  }

  /**
   * salvarFinal: Função chamada quando o formulário principal do livro é submetido.
   * Delega a lógica de salvar para a função 'onSalvar' passada via props.
   */
  function salvarFinal() {
    onSalvar(dadosLivro);
  }

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    // O modal é exibido com um overlay de fundo escuro.
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl"> {/* Define o tamanho do modal como extra grande. */}
        <div className="modal-content">
          <div className="modal-header">
            {/* Título do modal, muda conforme é edição ou novo cadastro. */}
            <h5 className="modal-title">{livroExistente ? 'Editar Livro' : 'Cadastrar Novo Livro'}</h5>
            {/* Botão para fechar o modal. */}
            <button type="button" className="btn-close" onClick={onOcultar}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {/* Coluna esquerda: Formulários para adicionar autores e assuntos. */}
              <div className="col-md-6 border-end">
                <h5>Adicionar Autores</h5>
                <FormularioAutor onAutorSelecionado={selecionarAutor} /> {/* Passa a função para selecionar autor. */}
                <hr />
                <h5>Adicionar Assuntos</h5>
                <FormularioAssunto onAssuntoSelecionado={selecionarAssunto} /> {/* Passa a função para selecionar assunto. */}
              </div>
              {/* Coluna direita: Formulário principal do livro. */}
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