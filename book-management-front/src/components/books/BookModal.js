// Importações necessárias do React.
import React, { useState, useEffect } from 'react';

// Componentes filhos que compõem o modal.
import AuthorForm from './AuthorForm';   // Formulário para buscar/adicionar autores.
import SubjectForm from './SubjectForm'; // Formulário para buscar/adicionar assuntos.
import BookForm from './BookForm';       // Formulário com os detalhes principais do livro.

// =====================================================================================
// 2. O ORQUESTRADOR DO FORMULÁRIO: `BookModal.js`
// Este componente é o "cérebro" do modal. Ele gerencia o estado de TODOS os dados
// do livro enquanto o modal está aberto e coordena a interação entre os sub-formulários.
// =====================================================================================

// Define um estado inicial limpo para um livro.
// Usado para garantir que o formulário de "novo livro" sempre abra vazio.
const initialBookState = {
  title: '',
  bookCode: '',
  publisher: '',
  edition: '',
  yearPublication: '',
  price: '',
  authors: [],
  subjects: [],
};

/**
 * Props recebidas do componente pai (`Books.js`):
 * @param {boolean} show - Controla a visibilidade do modal.
 * @param {function} onHide - Função para fechar o modal.
 * @param {function} onSave - Função para salvar os dados finais do livro.
 * @param {object|null} existingBook - Os dados de um livro para edição, ou `null` para criação.
 */
export default function BookModal({ show, onHide, onSave, existingBook }) {
  // --- ESTADO DO COMPONENTE ---
  // `bookData`: A ÚNICA FONTE DA VERDADE para todos os dados do livro sendo editado/criado.
  const [bookData, setBookData] = useState(initialBookState);

  // --- EFEITOS (LIFECYCLE) ---

  /**
   * `useEffect` para inicializar ou limpar o estado do formulário (`bookData`).
   * É executado sempre que o modal é aberto/fechado (`show`) ou quando um livro diferente é passado para edição.
   */
  useEffect(() => {
    // Só executa a lógica se o modal estiver sendo aberto.
    if (show) {
      // Se `existingBook` for passado, estamos em modo de edição.
      if (existingBook) {
        // Preenche o `bookData` com os dados do livro existente.
        setBookData({
          ...initialBookState, // Garante que todos os campos estejam presentes.
          ...existingBook,
          authors: existingBook.authors || [], // Garante que `authors` seja sempre um array.
          subjects: existingBook.subjects || [], // Garante que `subjects` seja sempre um array.
        });
      } else {
        // Se não, estamos criando um novo livro. Reseta o formulário para o estado inicial limpo.
        setBookData(initialBookState);
      }
    }
  }, [show, existingBook]); // Dependências do efeito.

  // Se o modal não deve ser exibido, não renderiza nada.
  if (!show) return null;

  // --- FUNÇÕES DE CALLBACK (passadas para os componentes filhos) ---

  /**
   * Chamada pelo `AuthorForm` quando um autor é selecionado ou criado.
   * Adiciona o autor à lista de autores do livro, evitando duplicatas.
   * @param {object} author - O objeto do autor selecionado/criado.
   */
  function handleAuthorSelected(author) {
    if (!bookData.authors.find(a => a.id === author.id)) {
      setBookData(prevData => ({
        ...prevData,
        authors: [...prevData.authors, author],
      }));
      alert(`Autor "${author.name}" adicionado!`);
    }
  }

  /**
   * Chamada pelo `SubjectForm` quando um assunto é selecionado ou criado.
   * Adiciona o assunto à lista de assuntos do livro, evitando duplicatas.
   * @param {object} subject - O objeto do assunto selecionado/criado.
   */
  function handleSubjectSelected(subject) {
    if (!bookData.subjects.find(s => s.id === subject.id)) {
      setBookData(prevData => ({
        ...prevData,
        subjects: [...prevData.subjects, subject],
      }));
      alert(`Assunto "${subject.description}" adicionado!`);
    }
  }

  /**
   * Chamada pelo `BookForm` sempre que um campo de input (título, preço, etc.) é alterado.
   * Atualiza o estado `bookData` de forma genérica.
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setBookData(prev => ({ ...prev, [name]: value }));
  }

  /**
   * Chamada pelo `BookForm` quando o botão "X" de um autor é clicado.
   * Remove o autor da lista.
   */
  function handleRemoveAuthor(authorId) {
    setBookData(prev => ({
      ...prev,
      authors: prev.authors.filter(a => a.id !== authorId),
    }));
  }

  /**
   * Chamada pelo `BookForm` quando o botão "X" de um assunto é clicado.
   * Remove o assunto da lista.
   */
  function handleRemoveSubject(subjectId) {
    setBookData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s.id !== subjectId),
    }));
  }

  /**
   * Chamada pelo `BookForm` quando o formulário principal é submetido.
   * Repassa os dados completos e atualizados (`bookData`) para a função `onSave` do componente pai (`Books.js`).
   */
  function handleFinalSave() {
    onSave(bookData);
  }

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{existingBook ? 'Editar Livro' : 'Cadastrar Novo Livro'}</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {/* Coluna da Esquerda: Formulários de busca/criação de autores e assuntos. */}
              <div className="col-md-6 border-end">
                <h5>Adicionar Autores</h5>
                {/* O `AuthorForm` recebe a função para notificar quando um autor for selecionado. */}
                <AuthorForm onAuthorSelected={handleAuthorSelected} />
                <hr />
                <h5>Adicionar Assuntos</h5>
                {/* O `SubjectForm` recebe a função para notificar quando um assunto for selecionado. */}
                <SubjectForm onSubjectSelected={handleSubjectSelected} />
              </div>

              {/* Coluna da Direita: Formulário com os detalhes do livro. */}
              <div className="col-md-6">
                {/* O `BookForm` é um componente "controlado". Ele não tem estado próprio.
                    Ele recebe todos os dados e funções de que precisa via props. */}
                <BookForm
                  bookData={bookData}                 // Os dados a serem exibidos.
                  onSave={handleFinalSave}             // Função para salvar.
                  onChange={handleChange}              // Função para atualizar campos de texto.
                  onRemoveAuthor={handleRemoveAuthor}    // Função para remover autor.
                  onRemoveSubject={handleRemoveSubject}  // Função para remover assunto.
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}