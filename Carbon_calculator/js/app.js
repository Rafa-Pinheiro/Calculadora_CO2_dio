
/**
 * APP.js - Inicialização e Gerenciamento de Eventos
 * 
 * Arquivo principal que orquestra a aplicação, conectando UI, CALCULATOR e dados
 * Dependências: CONFIG, ROUTES_DATA, CALCULATOR, UI
 * Ordem de carregamento: config.js → routes-data.js → calculator.js → ui.js → app.js
 */

/**
 * Aguarda o carregamento completo do DOM
 * Executa todas as inicializações e configurações de listeners
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 APP: DOMContentLoaded - Inicializando aplicação EcoTrip');

  // Inicializa cache de elementos UI
  UI.initializeCache();

  // Valida se todos os elementos necessários foram encontrados
  if (!UI.elements.form || !UI.elements.calculateBtn || !UI.elements.originSelect) {
    console.error('❌ APP: Elementos críticos do DOM não encontrados!');
    UI.showError('Erro: Interface não carregada corretamente. Recarregue a página.');
    return;
  }

  // Popula os selects com as cidades disponíveis
  try {
    UI.populateSelects();
    console.log('✅ APP: Selects populados com cidades');
  } catch (error) {
    console.error('❌ APP: Erro ao popular selects', error);
    UI.showError('Erro ao carregar cidades. Recarregue a página.');
    return;
  }

  // Adiciona listener de submit no formulário
  UI.elements.form.addEventListener('submit', handleFormSubmit);
  console.log('✅ APP: Listener de submit adicionado ao formulário');

  console.log('✨ APP: Inicialização concluída com sucesso!');
});

/**
 * Manipulador para o evento de submit do formulário
 * Orquestra todo o fluxo de cálculo
 * 
 * @param {Event} event - Evento do formulário
 */
function handleFormSubmit(event) {
  event.preventDefault();
  console.log('📋 APP: Formulário enviado');

  try {
    // Desabilita botão durante o processamento
    const calculateBtn = UI.elements.calculateBtn;
    calculateBtn.disabled = true;
    calculateBtn.textContent = 'Calculando...';

    // Etapa 1: Captura dados do formulário
    console.log('📝 APP: Etapa 1 - Capturando dados do formulário');
    const formData = UI.getFormData();

    if (!formData) {
      console.warn('⚠️ APP: Validação do formulário falhou');
      calculateBtn.disabled = false;
      calculateBtn.textContent = 'Calcular Pegada';
      return;
    }

    console.log('✅ APP: Dados capturados:', formData);

    // Etapa 2: Obtém a distância entre as cidades
    console.log('📏 APP: Etapa 2 - Obtendo distância da rota');
    const distance = CALCULATOR.getDistance(formData.origin, formData.destination);

    if (distance === null) {
      console.error('❌ APP: Rota não encontrada ou inválida');
      UI.showError(`Desculpe, não encontramos uma rota entre ${formData.origin} e ${formData.destination}. Tente outras cidades.`);
      calculateBtn.disabled = false;
      calculateBtn.textContent = 'Calcular Pegada';
      return;
    }

    if (distance === 0) {
      console.error('❌ APP: Distância é zero (origem = destino)');
      UI.showError('A origem e o destino não podem ser a mesma cidade.');
      calculateBtn.disabled = false;
      calculateBtn.textContent = 'Calcular Pegada';
      return;
    }

    console.log(`✅ APP: Distância encontrada: ${distance} km`);

    // Etapa 3: Calcula a emissão de CO2
    console.log('💨 APP: Etapa 3 - Calculando emissão de CO2');
    const emission = CALCULATOR.calculateEmission(
      distance,
      formData.transportMode,
      formData.passengers
    );

    if (emission === 0 && distance > 0) {
      console.error('❌ APP: Erro ao calcular emissão');
      UI.showError('Erro ao calcular emissão. Verifique o meio de transporte selecionado.');
      calculateBtn.disabled = false;
      calculateBtn.textContent = 'Calcular Pegada';
      return;
    }

    console.log(`✅ APP: Emissão calculada: ${emission} kg CO₂`);

    // Etapa 4: Calcula árvores necessárias para compensação
    console.log('🌳 APP: Etapa 4 - Calculando árvores necessárias');
    const treesNeeded = CALCULATOR.calculateTreesNeeded(emission);

    console.log(`✅ APP: Árvores necessárias: ${treesNeeded}`);

    // Etapa 5: Calcula emissão por passageiro
    const emissionPerPassenger = parseFloat((emission / formData.passengers).toFixed(2));

    // Etapa 6: Exibe os resultados
    console.log('📊 APP: Etapa 5 - Exibindo resultados');
    const resultData = {
      origin: formData.origin,
      destination: formData.destination,
      transportMode: formData.transportMode,
      passengers: formData.passengers,
      distance: distance,
      emission: emission,
      emissionPerPassenger: emissionPerPassenger,
      treesNeeded: treesNeeded
    };

    UI.showResult(resultData);
    console.log('✅ APP: Resultados exibidos com sucesso!');

  } catch (error) {
    console.error('❌ APP: Erro inesperado durante o cálculo', error);
    UI.showError('Ocorreu um erro inesperado. Por favor, recarregue a página e tente novamente.');
  } finally {
    // Reabilita botão
    const calculateBtn = UI.elements.calculateBtn;
    calculateBtn.disabled = false;
    calculateBtn.textContent = 'Calcular Pegada';
  }
}

/**
 * Log de verificação: Valida se todas as dependências estão carregadas
 */
window.addEventListener('load', function() {
  console.log('🔍 APP: Verificação de dependências');
  console.log('  ✓ CONFIG:', typeof window.CONFIG !== 'undefined' ? '✅' : '❌');
  console.log('  ✓ ROUTES_DATA:', typeof window.ROUTES_DATA !== 'undefined' ? '✅' : '❌');
  console.log('  ✓ CALCULATOR:', typeof window.CALCULATOR !== 'undefined' ? '✅' : '❌');
  console.log('  ✓ UI:', typeof window.UI !== 'undefined' ? '✅' : '❌');

  if (typeof window.CONFIG === 'undefined' || 
      typeof window.ROUTES_DATA === 'undefined' || 
      typeof window.CALCULATOR === 'undefined' || 
      typeof window.UI === 'undefined') {
    console.error('❌ APP: Algumas dependências não foram carregadas!');
  } else {
    console.log('✨ APP: Todas as dependências carregadas com sucesso!');
  }
});

console.log('📄 APP: Arquivo app.js carregado');
