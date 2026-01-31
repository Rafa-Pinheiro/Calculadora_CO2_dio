
/**
 * CONFIG.js - Arquivo de Configurações Globais
 * 
 * Contém constantes e fatores de emissão de CO2 para o projeto EcoTrip
 * Padrão: Objeto Global (sem módulos ES6)
 */

// Objeto global de configuração
const CONFIG = {
  
  /**
   * EMISSION_FACTORS
   * Fatores de emissão em kg de CO2 por quilômetro (km)
   * Baseado em estudos de impacto ambiental de transportes
   */
  EMISSION_FACTORS: {
    aviao: 0.255,              // Avião: 255g CO2/km
    carro_gasolina: 0.192,     // Carro a gasolina: 192g CO2/km
    carro_eletrico: 0.053,     // Carro elétrico: 53g CO2/km
    onibus: 0.089,             // Ônibus: 89g CO2/km
    trem: 0.041                // Trem: 41g CO2/km
  },

  /**
   * TREES_PER_TON
   * Número de árvores necessárias para compensar 1 tonelada de CO2
   * Baseado em: 1 árvore compensa aproximadamente 16.67kg de CO2/ano
   * Para compensação total em um ano: 1000kg / 16.67kg por árvore ≈ 6 árvores
   */
  TREES_PER_TON: 6,

  /**
   * Configurações adicionais úteis
   */
  APP_NAME: 'EcoTrip',
  APP_VERSION: '1.0.0',
  
  /**
   * Métodos auxiliares
   */
  
  /**
   * Obtém o fator de emissão para um tipo de transporte
   * @param {string} transportType - Tipo de transporte (aviao, carro_gasolina, etc)
   * @returns {number} Fator de emissão em kg CO2/km
   */
  getEmissionFactor: function(transportType) {
    return this.EMISSION_FACTORS[transportType] || 0;
  },

  /**
   * Calcula quantas árvores são necessárias para compensar uma quantidade de CO2
   * @param {number} co2Kg - Quantidade de CO2 em kg
   * @returns {number} Número de árvores necessárias
   */
  calculateTreesNeeded: function(co2Kg) {
    const toneladas = co2Kg / 1000;
    return Math.ceil(toneladas * this.TREES_PER_TON);
  }
};

// Garantir que CONFIG está disponível globalmente
window.CONFIG = CONFIG;
