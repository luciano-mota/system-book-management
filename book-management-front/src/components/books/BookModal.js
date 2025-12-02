import React, { useState } from 'react';
import AuthorForm from './AuthorForm';
import SubjectForm from './SubjectForm';
import BookForm from './BookForm';

export default function BookModal({ show, onHide, onSave, existingBook }) {
  const [step, setStep] = useState(1);

  if (!show) return null;

  function handleAuthorCreated() {
    alert('Autor criado com sucesso! Prossiga para o próximo passo.');
  }

  function handleSubjectCreated() {
    alert('Assunto criado com sucesso! Prossiga para o próximo passo.');
  }

  function handleNext() {
    setStep(prev => prev + 1);
  }

  function handleBack() {
    setStep(prev => prev - 1);
  }

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Cadastrar Novo Livro - Passo {step} de 3</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            {step === 1 && <AuthorForm onAuthorCreated={handleAuthorCreated} />}
            {step === 2 && <SubjectForm onSubjectCreated={handleSubjectCreated} />}
            {step === 3 && <BookForm onBookSaved={onSave} existingBook={existingBook} />}
          </div>
          <div className="modal-footer">
            {step > 1 && <button className="btn btn-secondary" onClick={handleBack}>Voltar</button>}
            {step < 3 && <button className="btn btn-primary" onClick={handleNext}>Avançar</button>}
            {step === 3 && <button className="btn btn-success" onClick={onHide}>Finalizar</button>}
          </div>
        </div>
      </div>
    </div>
  );
}