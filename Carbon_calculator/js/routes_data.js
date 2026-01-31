
/**
 * ROUTES_DATA.js - Dados de Cidades e Distâncias
 *
 * Contém informações sobre cidades principais e distâncias entre elas
 * Padrão: Objeto Global (sem módulos ES6)
 */

const ROUTES_DATA = {
  /**
   * CITIES
   * Array com 10 cidades principais brasileiras para seleção de origem e destino
   */
  CITIES: [
    "São Paulo",
    "Rio de Janeiro",
    "Brasília",
    "Salvador",
    "Fortaleza",
    "Belo Horizonte",
    "Manaus",
    "Recife",
    "Curitiba",
    "Porto Alegre",
  ],

  /**
   * DISTANCES
   * Objeto com distâncias em km entre cidades brasileiras
   * Chave: "CidadeA-CidadeB" (ordem alfabética para evitar duplicatas)
   * Valor: Distância aproximada em quilômetros
   */
  DISTANCES: {
    // Rotas com Belo Horizonte
    "Belo Horizonte-Brasília": 1100,
    "Belo Horizonte-Curitiba": 1200,
    "Belo Horizonte-Fortaleza": 2400,
    "Belo Horizonte-Manaus": 3900,
    "Belo Horizonte-Porto Alegre": 1800,
    "Belo Horizonte-Recife": 2200,
    "Belo Horizonte-Rio de Janeiro": 450,
    "Belo Horizonte-Salvador": 1600,
    "Belo Horizonte-São Paulo": 580,

    // Rotas com Brasília
    "Brasília-Curitiba": 1600,
    "Brasília-Fortaleza": 2300,
    "Brasília-Manaus": 3200,
    "Brasília-Porto Alegre": 2300,
    "Brasília-Recife": 2100,
    "Brasília-Rio de Janeiro": 1150,
    "Brasília-Salvador": 1800,
    "Brasília-São Paulo": 900,

    // Rotas com Curitiba
    "Curitiba-Fortaleza": 3100,
    "Curitiba-Manaus": 4300,
    "Curitiba-Porto Alegre": 700,
    "Curitiba-Recife": 3000,
    "Curitiba-Rio de Janeiro": 1100,
    "Curitiba-Salvador": 2400,
    "Curitiba-São Paulo": 400,

    // Rotas com Fortaleza
    "Fortaleza-Manaus": 2700,
    "Fortaleza-Porto Alegre": 3700,
    "Fortaleza-Recife": 750,
    "Fortaleza-Rio de Janeiro": 2800,
    "Fortaleza-Salvador": 1200,
    "Fortaleza-São Paulo": 2900,

    // Rotas com Manaus
    "Manaus-Porto Alegre": 4500,
    "Manaus-Recife": 3000,
    "Manaus-Rio de Janeiro": 3800,
    "Manaus-Salvador": 2600,
    "Manaus-São Paulo": 3600,

    // Rotas com Porto Alegre
    "Porto Alegre-Recife": 3200,
    "Porto Alegre-Rio de Janeiro": 1550,
    "Porto Alegre-Salvador": 2800,
    "Porto Alegre-São Paulo": 1150,

    // Rotas com Recife
    "Recife-Rio de Janeiro": 2300,
    "Recife-Salvador": 800,
    "Recife-São Paulo": 2700,

    // Rotas com Rio de Janeiro
    "Rio de Janeiro-Salvador": 1900,
    "Rio de Janeiro-São Paulo": 430,

    // Rotas com Salvador
    "Salvador-São Paulo": 2200,
  },

  /**
   * Obtém a distância entre duas cidades
   * @param {string} city1 - Nome da primeira cidade
   * @param {string} city2 - Nome da segunda cidade
   * @returns {number|null} Distância em km ou null se rota não existir
   */
  getDistance: function (city1, city2) {
    if (city1 === city2) return 0;

    // Cria a chave em ordem alfabética
    const key = [city1, city2].sort().join("-");
    return this.DISTANCES[key] || null;
  },

  /**
   * Verifica se uma rota existe
   * @param {string} city1 - Nome da primeira cidade
   * @param {string} city2 - Nome da segunda cidade
   * @returns {boolean} true se a rota existe
   */
  routeExists: function (city1, city2) {
    return this.getDistance(city1, city2) !== null;
  },

  /**
   * Retorna cidades ordenadas alfabeticamente
   * @returns {array} Array de cidades em ordem alfabética
   */
  getCitiesSorted: function () {
    return this.CITIES.sort();
  },
};

// Garantir que ROUTES_DATA está disponível globalmente
window.ROUTES_DATA = ROUTES_DATA;
