import React, { useState, useEffect } from 'react';
import AuthorForm from './AuthorForm';
import SubjectForm from './SubjectForm';
import BookForm from './BookForm';

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

export default function BookModal({ show, onHide, onSave, existingBook }) {
  const [bookData, setBookData] = useState(initialBookState);

  useEffect(() => {
    if (show) {
      if (existingBook) {
        setBookData({
          ...initialBookState,
          ...existingBook,
          authors: existingBook.authors || [],
          subjects: existingBook.subjects || [],
        });
      } else {
        setBookData(initialBookState);
      }
    }
  }, [show, existingBook]);

  if (!show) return null;

  function handleAuthorSelected(author) {
    if (!bookData.authors.find(a => a.id === author.id)) {
      setBookData(prevData => ({
        ...prevData,
        authors: [...prevData.authors, author],
      }));
      alert(`Autor "${author.name}" adicionado!`);
    }
  }

  function handleSubjectSelected(subject) {
    if (!bookData.subjects.find(s => s.id === subject.id)) {
      setBookData(prevData => ({
        ...prevData,
        subjects: [...prevData.subjects, subject],
      }));
      alert(`Assunto "${subject.description}" adicionado!`);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setBookData(prev => ({ ...prev, [name]: value }));
  }

  function handleRemoveAuthor(authorId) {
    setBookData(prev => ({
      ...prev,
      authors: prev.authors.filter(a => a.id !== authorId),
    }));
  }

  function handleRemoveSubject(subjectId) {
    setBookData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s.id !== subjectId),
    }));
  }

  function handleFinalSave() {
    onSave(bookData);
  }

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
              <div className="col-md-6 border-end">
                <h5>Adicionar Autores</h5>
                <AuthorForm onAuthorSelected={handleAuthorSelected} />
                <hr />
                <h5>Adicionar Assuntos</h5>
                <SubjectForm onSubjectSelected={handleSubjectSelected} />
              </div>
              <div className="col-md-6">
                <BookForm
                  bookData={bookData}
                  onSave={handleFinalSave}
                  onChange={handleChange}
                  onRemoveAuthor={handleRemoveAuthor}
                  onRemoveSubject={handleRemoveSubject}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}