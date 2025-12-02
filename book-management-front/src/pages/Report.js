export default function Report() {
  const API = "http://localhost:8080/api/v1/report/boof/pdf"

  function generate() {
    window.open((API, "_blank"));
  }

  return (
      <div>
        <h2>Relatório de Livros</h2>
        <button className="btn btn-primary" onClick={generate}>Gerar Relatorio</button>
      </div>
  )
}