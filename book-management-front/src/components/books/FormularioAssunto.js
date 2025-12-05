import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce'; // Hook para atrasar a execução de uma função.

// Endereço da API para operações com assuntos.
const API_ASSUNTOS = "http://localhost:8080/api/v1/subjects";

/**
 * Componente FormularioAssunto: Permite buscar, selecionar ou cadastrar um novo assunto.
 *
 * @param {object} props - As propriedades do componente.
 * @param {function} props.onAssuntoSelecionado - Função de callback chamada quando um assunto
 *                                                é selecionado ou criado.
 */
export default function FormularioAssunto({ onAssuntoSelecionado }) {
  // descricao: Estado que armazena o texto digitado no campo de busca/cadastro de assunto.
  const [descricao, setDescricao] = useState('');
  // resultadosBusca: Estado que armazena a lista de assuntos retornada pela API de busca.
  const [resultadosBusca, setResultadosBusca] = useState([]);
  // termoBuscaDebounced: Versão "atrasada" de descricao, usada para evitar chamadas excessivas à API.
  const termoBuscaDebounced = useDebounce(descricao, 300); // Atraso de 300ms.

  // --- FUNÇÕES DE LÓGICA E DADOS ---

  /**
   * buscarAssuntos: Função assíncrona para buscar assuntos na API com base na descrição.
   * Utiliza useCallback para memorizar a função.
   * @param {string} termoBusca - O termo de busca para assuntos.
   */
  const buscarAssuntos = useCallback(async (termoBusca) => {
    // Só realiza a busca se o termo tiver pelo menos 2 caracteres.
    if (termoBusca.trim().length < 2) {
      setResultadosBusca([]); // Limpa os resultados se o termo for muito curto.
      return;
    }
    try {
      // Faz a chamada GET para a API, passando o termo de busca como parâmetro 'subject'.
      const resposta = await axios.get(API_ASSUNTOS, { params: { subject: termoBusca } });
      setResultadosBusca(resposta.data.data); // Atualiza os resultados da busca.
    } catch (error) {
      console.error("Erro ao buscar assuntos:", error);
    }
  }, []); // Dependências vazias, pois 'termoBusca' é passado como argumento.

  /**
   * useEffect: Hook que observa mudanças no 'termoBuscaDebounced'.
   * Quando o termo debounced muda, a função 'buscarAssuntos' é chamada.
   */
  useEffect(() => {
    buscarAssuntos(termoBuscaDebounced);
  }, [termoBuscaDebounced, buscarAssuntos]); // Dependências: executa quando o termo debounced ou a função de busca mudam.

  /**
   * selecionarAssunto: Função chamada quando um assunto é selecionado da lista de resultados.
   * @param {object} assunto - O objeto do assunto selecionado.
   */
  function selecionarAssunto(assunto) {
    onAssuntoSelecionado(assunto); // Notifica o componente pai com o assunto selecionado.
    setDescricao(''); // Limpa o campo de busca.
    setResultadosBusca([]); // Esconde a lista de resultados.
  }

  /**
   * criarAssunto: Função assíncrona para cadastrar um novo assunto ou selecionar um existente.
   * Chamada na submissão do formulário.
   * @param {object} e - Evento de submissão do formulário.
   */
  async function criarAssunto(e) {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página.
    if (!descricao.trim()) return; // Não faz nada se o campo estiver vazio.

    // Verifica se a descrição digitada corresponde exatamente a um assunto já listado nos resultados da busca.
    const assuntoExistente = resultadosBusca.find(s => s.description.toLowerCase() === descricao.trim().toLowerCase());
    if (assuntoExistente) {
      selecionarAssunto(assuntoExistente); // Se existir, trata como uma seleção.
      return;
    }

    try {
      // Se não existe, faz uma requisição POST para criar um novo assunto.
      const resposta = await axios.post(API_ASSUNTOS, { description: descricao });
      onAssuntoSelecionado(resposta.data.data); // Notifica o pai com os dados do novo assunto.
      setDescricao(''); // Limpa o campo de busca.
    } catch (error) {
      console.error("Erro ao criar assunto:", error);
      alert("Não foi possível criar o assunto. Tente novamente.");
    }
  }

  // --- RENDERIZAÇÃO DO COMPONENTE ---
  return (
    <form onSubmit={criarAssunto}>
      <div className="mb-3 position-relative">
        <label htmlFor="descricaoAssunto" className="form-label">Descrição do Assunto</label>
        <input
          type="text"
          className="form-control"
          id="descricaoAssunto"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)} // Atualiza o estado 'descricao' ao digitar.
          placeholder="Pesquise ou cadastre um novo assunto"
          autoComplete="off" // Desativa o preenchimento automático do navegador.
          required // Campo obrigatório.
        />
        {/* Exibe a lista de resultados da busca apenas se houver resultados. */}
        {resultadosBusca.length > 0 && (
          <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto', top: '100%' }}>
            {resultadosBusca.map(assunto => (
              <li
                key={assunto.id}
                className="list-group-item list-group-item-action"
                onClick={() => selecionarAssunto(assunto)} // Ao clicar, seleciona o assunto.
                style={{ cursor: 'pointer' }}
              >
                {assunto.description}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Botão para submeter o formulário (criar ou selecionar assunto). */}
      <button type="submit" className="btn btn-primary">Salvar Assunto</button>
    </form>
  );
}