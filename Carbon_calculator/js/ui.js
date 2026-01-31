/**
 * UI.js - Manipulação do DOM e Interação com Interface
 * 
 * Contém métodos para atualizar a interface, capturar dados de formulários
 * e exibir resultados dinamicamente
 * Dependências: ROUTES_DATA, CALCULATOR
 */

const UI = {

  /**
   * Seletores DOM para cache de elementos
   */
  selectors: {
    originSelect: '#origin-select',
    destinationSelect: '#destination-select',
    transportSelect: '#transport-select',
    passengersInput: '#passengers-input',
    calculateBtn: '#calculate-btn',
    form: '#calculator-form',
    resultContainer: '#result-container',
    resultsContent: '#results-content'
  },

  /**
   * Cache de elementos DOM para melhor performance
   */
  elements: {},

  /**
   * Inicializa cache de elementos do DOM
   * Deve ser chamado quando o DOM está pronto
   */
  initializeCache: function() {
    this.elements.originSelect = document.querySelector(this.selectors.originSelect);
    this.elements.destinationSelect = document.querySelector(this.selectors.destinationSelect);
    this.elements.transportSelect = document.querySelector(this.selectors.transportSelect);
    this.elements.passengersInput = document.querySelector(this.selectors.passengersInput);
    this.elements.calculateBtn = document.querySelector(this.selectors.calculateBtn);
    this.elements.form = document.querySelector(this.selectors.form);
    this.elements.resultContainer = document.querySelector(this.selectors.resultContainer);
    this.elements.resultsContent = document.querySelector(this.selectors.resultsContent);
  },

  /**
   * Popula os selects de Origem e Destino com as cidades de ROUTES_DATA
   * 
   * Cria uma opção para cada cidade ordenada alfabeticamente
   */
  populateSelects: function() {
    if (!this.elements.originSelect || !this.elements.destinationSelect) {
      console.error('UI.populateSelects: Elementos de select não encontrados no DOM');
      return;
    }

    // Obtém cidades ordenadas
    const cities = ROUTES_DATA.getCitiesSorted();

    // Limpa as opções existentes (mantém a first option vazia)
    this.elements.originSelect.innerHTML = '<option value="">-- Selecione uma cidade de origem --</option>';
    this.elements.destinationSelect.innerHTML = '<option value="">-- Selecione uma cidade de destino --</option>';

    // Adiciona cidades como opções
    cities.forEach(city => {
      // Opção para Origem
      const optionOrigin = document.createElement('option');
      optionOrigin.value = city;
      optionOrigin.textContent = city;
      this.elements.originSelect.appendChild(optionOrigin);

      // Opção para Destino
      const optionDestination = document.createElement('option');
      optionDestination.value = city;
      optionDestination.textContent = city;
      this.elements.destinationSelect.appendChild(optionDestination);
    });

    console.log(`UI.populateSelects: ${cities.length} cidades carregadas nos selects`);
  },

  /**
   * Captura os dados do formulário e retorna um objeto
   * 
   * Valida se:
   * - Todos os campos obrigatórios foram preenchidos
   * - Origem e destino são diferentes
   * - Número de passageiros é válido
   * 
   * @returns {object|null} Objeto com dados do formulário ou null se inválido
   *   {
   *     origin: string,
   *     destination: string,
   *     transportMode: string,
   *     passengers: number
   *   }
   */
  getFormData: function() {
    const origin = this.elements.originSelect?.value?.trim();
    const destination = this.elements.destinationSelect?.value?.trim();
    const transportMode = this.elements.transportSelect?.value?.trim();
    const passengers = parseInt(this.elements.passengersInput?.value, 10);

    // Validação: campos vazios
    if (!origin || !destination || !transportMode) {
      this.showError('Por favor, preencha todos os campos obrigatórios.');
      return null;
    }

    // Validação: origem e destino iguais
    if (origin === destination) {
      this.showError('A origem e o destino não podem ser a mesma cidade. Escolha cidades diferentes.');
      return null;
    }

    // Validação: número de passageiros
    if (isNaN(passengers) || passengers < 1) {
      this.showError('O número de passageiros deve ser no mínimo 1.');
      return null;
    }

    return {
      origin: origin,
      destination: destination,
      transportMode: transportMode,
      passengers: passengers
    };
  },

  /**
   * Exibe os resultados do cálculo na interface
   * 
   * Remove a classe 'hidden' do container de resultados e injeta
   * HTML dinâmico com as informações
   * 
   * @param {object} data - Objeto com resultados
   *   {
   *     distance: number,
   *     emission: number,
   *     treesNeeded: number,
   *     emissionPerPassenger: number,
   *     origin: string,
   *     destination: string,
   *     transportMode: string,
   *     passengers: number
   *   }
   */
  showResult: function(data) {
    if (!this.elements.resultContainer || !this.elements.resultsContent) {
      console.error('UI.showResult: Container de resultados não encontrado no DOM');
      return;
    }

    // Formata os dados para exibição
    const distanceFormatted = data.distance.toLocaleString('pt-BR');
    const emissionFormatted = data.emission.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const emissionPerPassengerFormatted = data.emissionPerPassenger.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Mapeia o tipo de transporte para texto amigável
    const transportNames = {
      'aviao': 'Avião',
      'carro_gasolina': 'Carro a Gasolina',
      'carro_eletrico': 'Carro Elétrico',
      'onibus': 'Ônibus',
      'trem': 'Trem'
    };
    const transportName = transportNames[data.transportMode] || data.transportMode;

    // Cria HTML dinâmico com os resultados
    const resultHTML = `
      <div class="result-item">
        <span class="result-label">📍 Rota</span>
        <span class="result-value">${data.origin} → ${data.destination}</span>
      </div>

      <div class="result-item">
        <span class="result-label">📏 Distância Percorrida</span>
        <span class="result-value">${distanceFormatted} km</span>
      </div>

      <div class="result-item">
        <span class="result-label">🚗 Meio de Transporte</span>
        <span class="result-value">${transportName}</span>
      </div>

      <div class="result-item">
        <span class="result-label">👥 Número de Passageiros</span>
        <span class="result-value">${data.passengers} passageiro${data.passengers > 1 ? 's' : ''}</span>
      </div>

      <div class="co2-highlight">
        ${emissionFormatted}
        <span class="co2-unit">kg CO₂</span>
      </div>

      <div class="result-item">
        <span class="result-label">💨 Emissão por Passageiro</span>
        <span class="result-value">${emissionPerPassengerFormatted} kg CO₂</span>
      </div>

      <div class="result-message">
        <strong>🌱 Compensação Ambiental:</strong><br>
        Seria necessário plantar <strong>${data.treesNeeded} árvore${data.treesNeeded > 1 ? 's' : ''}</strong> para compensar a emissão de CO₂ desta viagem em um ano.
      </div>
    `;

    // Injeta o HTML no container
    this.elements.resultsContent.innerHTML = resultHTML;

    // Remove a classe 'hidden' para exibir o container
    this.elements.resultContainer.classList.remove('hidden');

    // Scroll suave até os resultados
    this.elements.resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

    console.log('UI.showResult: Resultados exibidos com sucesso');
  },

  /**
   * Exibe uma mensagem de erro na interface
   * 
   * Pode exibir via alert ou injetar HTML no DOM (mais elegante)
   * 
   * @param {string} message - Mensagem de erro a exibir
   */
  showError: function(message) {
    if (!message) {
      console.error('UI.showError: Mensagem de erro não fornecida');
      return;
    }

    // Opção 1: Usar alert (simples)
    alert(`⚠️ Erro: ${message}`);

    // Opção 2: Injetar no DOM (comentado para não duplicar)
    // Pode ser implementado para mostrar em um elemento dedicado
    // Exemplo:
    // const errorDiv = document.createElement('div');
    // errorDiv.className = 'error-message';
    // errorDiv.textContent = message;
    // document.body.insertBefore(errorDiv, document.body.firstChild);

    console.warn(`UI.showError: ${message}`);
  },

  /**
   * Limpa o formulário e oculta resultados
   * Útil para permitir novo cálculo
   */
  resetForm: function() {
    if (this.elements.form) {
      this.elements.form.reset();
    }

    if (this.elements.resultContainer) {
      this.elements.resultContainer.classList.add('hidden');
      this.elements.resultsContent.innerHTML = '';
    }

    console.log('UI.resetForm: Formulário resetado');
  }
};

// Garantir que UI está disponível globalmente
window.UI = UI;