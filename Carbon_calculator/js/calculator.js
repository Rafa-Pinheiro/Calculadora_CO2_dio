
/**
 * CALCULATOR.js - Lógica de Negócios para Cálculo de Pegada de Carbono
 * 
 * Contém métodos puros para cálculo de emissões de CO2 e compensação
 * Dependências: CONFIG, ROUTES_DATA
 */

const CALCULATOR = {

  /**
   * Obtém a distância entre duas cidades
   * 
   * Normaliza a chave em ordem alfabética para corresponder ao formato
   * armazenado em ROUTES_DATA.DISTANCES
   * 
   * @param {string} origin - Cidade de origem
   * @param {string} destination - Cidade de destino
   * @returns {number|null} Distância em km ou null se rota não existir
   */
  getDistance: function(origin, destination) {
    if (!origin || !destination) {
      console.warn('CALCULATOR.getDistance: Origem ou destino não informados');
      return null;
    }

    if (origin === destination) {
      console.warn('CALCULATOR.getDistance: Origem e destino são iguais');
      return 0;
    }

    // Normaliza a chave em ordem alfabética
    const cities = [origin, destination].sort();
    const key = cities.join('-');

    const distance = ROUTES_DATA.DISTANCES[key];

    if (distance === undefined) {
      console.warn(`CALCULATOR.getDistance: Rota "${key}" não encontrada`);
      return null;
    }

    return distance;
  },

  /**
   * Calcula a emissão total de CO2
   * 
   * Fórmula: km × fator_emissão × passageiros
   * Onde:
   * - km: distância da viagem
   * - fator_emissão: kg CO2/km para o meio de transporte (de CONFIG)
   * - passageiros: número de pessoas viajando
   * 
   * @param {number} km - Distância em quilômetros
   * @param {string} transportMode - Tipo de transporte (aviao, carro_gasolina, etc)
   * @param {number} passengers - Número de passageiros
   * @returns {number} Emissão total de CO2 em kg (com 2 casas decimais)
   */
  calculateEmission: function(km, transportMode, passengers) {
    // Validações
    if (typeof km !== 'number' || km <= 0) {
      console.error('CALCULATOR.calculateEmission: km deve ser um número positivo');
      return 0;
    }

    if (typeof passengers !== 'number' || passengers < 1) {
      console.error('CALCULATOR.calculateEmission: passageiros deve ser um número >= 1');
      return 0;
    }

    if (!transportMode) {
      console.error('CALCULATOR.calculateEmission: transportMode não informado');
      return 0;
    }

    // Obtém o fator de emissão
    const emissionFactor = CONFIG.getEmissionFactor(transportMode);

    if (emissionFactor === 0 && !CONFIG.EMISSION_FACTORS[transportMode]) {
      console.warn(`CALCULATOR.calculateEmission: Transporte "${transportMode}" não encontrado`);
      return 0;
    }

    // Calcula: km × fator × passageiros
    const totalEmission = km * emissionFactor * passengers;

    // Retorna com 2 casas decimais
    return parseFloat(totalEmission.toFixed(2));
  },

  /**
   * Calcula quantas árvores são necessárias para compensar a emissão de CO2
   * 
   * Baseado em:
   * - 1 tonelada (1000 kg) de CO2 requer CONFIG.TREES_PER_TON árvores
   * - Usa Math.ceil para arredondar para cima (conservador)
   * 
   * @param {number} co2kg - Quantidade de CO2 em quilogramas
   * @returns {number} Número de árvores necessárias
   */
  calculateTreesNeeded: function(co2kg) {
    if (typeof co2kg !== 'number' || co2kg < 0) {
      console.error('CALCULATOR.calculateTreesNeeded: co2kg deve ser um número >= 0');
      return 0;
    }

    // Converte kg para toneladas
    const toneladas = co2kg / 1000;

    // Calcula árvores necessárias
    const treesNeeded = toneladas * CONFIG.TREES_PER_TON;

    // Arredonda para cima (conservador)
    return Math.ceil(treesNeeded);
  },

  /**
   * Realiza o cálculo completo de emissões (método agregador)
   * 
   * @param {object} params - Objeto com parâmetros
   * @param {string} params.origin - Cidade de origem
   * @param {string} params.destination - Cidade de destino
   * @param {string} params.transportMode - Tipo de transporte
   * @param {number} params.passengers - Número de passageiros
   * @returns {object|null} Objeto com resultados ou null se erro
   *   {
   *     distance: number,
   *     emission: number,
   *     treesNeeded: number,
   *     emissionPerPassenger: number
   *   }
   */
  performFullCalculation: function(params) {
    const { origin, destination, transportMode, passengers } = params;

    // Valida parâmetros obrigatórios
    if (!origin || !destination || !transportMode || !passengers) {
      console.error('CALCULATOR.performFullCalculation: Parâmetros incompletos');
      return null;
    }

    // Obtém a distância
    const distance = this.getDistance(origin, destination);
    if (distance === null) {
      console.error('CALCULATOR.performFullCalculation: Distância não encontrada');
      return null;
    }

    // Calcula emissão
    const emission = this.calculateEmission(distance, transportMode, passengers);

    // Calcula árvores necessárias
    const treesNeeded = this.calculateTreesNeeded(emission);

    // Calcula emissão por passageiro
    const emissionPerPassenger = parseFloat((emission / passengers).toFixed(2));

    return {
      distance: distance,
      emission: emission,
      treesNeeded: treesNeeded,
      emissionPerPassenger: emissionPerPassenger
    };
  }
};

// Garantir que CALCULATOR está disponível globalmente
window.CALCULATOR = CALCULATOR;
