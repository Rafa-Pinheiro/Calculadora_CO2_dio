# 🌿 EcoTrip – Calculadora de Pegada de Carbono de Viagens

Aplicação web que estima as emissões de CO₂ de uma viagem com base em origem, destino, meio de transporte e número de passageiros, ajudando o usuário a planejar deslocamentos mais sustentáveis. [page:2][page:3]

---

## 🎯 Objetivo do Projeto

A **EcoTrip** tem como objetivo conscientizar sobre o impacto ambiental de viagens, permitindo comparar diferentes meios de transporte e entender como escolhas de mobilidade afetam a pegada de carbono. [page:3]

O projeto foi desenvolvido no contexto do curso/bootcamp da DIO, com foco em prática de HTML, CSS e JavaScript, além do uso do GitHub Copilot na escrita de código e na produtividade. [page:2]

---

## 🧱 Tecnologias Utilizadas

A aplicação é totalmente front-end, executada diretamente no navegador:

- **HTML5** – Estrutura da página da calculadora (formulário, selects de origem/destino, transporte e campo de passageiros). [page:3]
- **CSS3** – Estilização da interface (layout, tipografia, responsividade). [page:1]
- **JavaScript (ES6+)** – Lógica de cálculo de pegada de carbono, manipulação do DOM, preenchimento dinâmico de campos e exibição dos resultados. [page:2]
- **Git e GitHub** – Controle de versão e hospedagem do código. [page:2]
- **GitHub Copilot** – Assistente de código utilizado na implementação de funções e estrutura do projeto. [page:2]

---

## 🖥️ Demonstração da Interface

A página principal apresenta: [page:3]

- Título **“EcoTrip – Calculadora de Pegada de Carbono”**.
- Seção de formulário “Planeje sua Viagem Sustentável”.
- Campos de **Origem**, **Destino**, **Meio de Transporte** e **Número de Passageiros**.
- Botão de ação para **“Calcular Pegada”**.
- Seção “Resultado da Análise” para exibir o impacto da viagem.
- Rodapé com a assinatura *“Rafaela Pinheiro ♥ Github Copilot”*. [page:3]
---

## 📂 Estrutura do Repositório

Estrutura geral do projeto: [page:1][page:2]

```text
Calculadora_CO2_dio/
├── Carbon_calculator/
│   ├── css/          # Arquivos de estilo (CSS)
│   ├── img/          # Imagens e ícones da aplicação
│   ├── js/           # Scripts JavaScript (lógica de cálculo, DOM, etc.)
│   └── index.html    # Página principal da EcoTrip
├── Certificados/     # Certificados relacionados ao curso/bootcamp DIO
└── README.md         # Documentação do repositório
```


---

## 🧮 Como Funciona a Calculadora

Na página `index.html`, o usuário encontra um formulário com os seguintes campos: [page:3]

- **Origem**
Select `origin-select` onde o usuário escolhe a cidade de partida.
- **Destino**
Select `destination-select` onde o usuário escolhe a cidade de chegada.
- **Meio de Transporte** (`transport-select`)
Opções disponíveis:
    - Avião (`aviao`)
    - Carro Gasolina (`carro_gasolina`)
    - Carro Elétrico (`carro_eletrico`)
    - Ônibus (`onibus`)
    - Trem (`trem`)
[page:3]
- **Número de Passageiros** (`passengers-input`)
Campo numérico com valor mínimo 1, usado para dividir ou multiplicar a pegada por pessoa, conforme a regra de negócio definida no JavaScript. [page:3]
- **Botão “Calcular Pegada”**
Ao clicar, a lógica JavaScript é acionada para:
    - Obter os valores selecionados/inseridos.
    - Calcular a distância entre origem e destino (fixa ou a partir de uma matriz/tabela de distâncias).
    - Aplicar um fator de emissão diferente para cada tipo de transporte.
    - Exibir o resultado na seção “Resultado da Análise”.

---

## 🚀 Como Executar o Projeto Localmente

1. **Clonar o repositório**

```bash
git clone https://github.com/Rafa-Pinheiro/Calculadora_CO2_dio.git
```

2. **Acessar a pasta da aplicação**

```bash
cd Calculadora_CO2_dio/Carbon_calculator
```

3. **Abrir a página no navegador**
    - Clique duas vezes no arquivo `index.html`
**ou**
    - Use a extensão **Live Server** no VS Code para rodar em `http://localhost:5500` (ou similar).
4. **Usar a calculadora**
    - Selecione **Origem** e **Destino**.
    - Escolha um **Meio de Transporte**.
    - Informe o **Número de Passageiros**.
    - Clique em **“Calcular Pegada”** e veja o resultado na seção “Resultado da Análise”. [page:3]

---

## ✅ Requisitos de Acessibilidade

A página utiliza atributos como `aria-label` e `aria-required` nos campos de formulário para melhorar a acessibilidade, especialmente para leitores de tela: [page:3]

- `aria-label` em selects e inputs para descrever a função do campo.
- `required` e `aria-required="true"` para indicar campos obrigatórios.
- Mensagens de placeholder em selects (`-- Selecione uma cidade de origem --`, etc.) auxiliando o entendimento do usuário.

Isso contribui para uma experiência mais inclusiva e alinhada com boas práticas de desenvolvimento web.

---

## 🌱 Possíveis Melhorias Futuras

Algumas ideias para evoluir a EcoTrip:

- Adicionar **mais cidades** e rotas pré-configuradas.
- Calcular a distância com base em **coordenadas geográficas** (ex.: API de mapas).
- Expandir a lista de **meios de transporte** (bicicleta, metrô, carona compartilhada).
- Exibir o resultado com **gráficos** ou comparações visuais (ex.: “equivalente a X árvores plantadas”).
- Implementar **modo claro/escuro** para melhorar a experiência do usuário.
- Salvar o **histórico de cálculos** no navegador (LocalStorage).
- Publicar a aplicação via **GitHub Pages** para acesso público fácil.

---

## 🧪 Como Contribuir

Se quiser contribuir com melhorias:

1. Faça um **fork** do repositório.
2. Crie uma nova branch para sua feature ou correção:

```bash
git checkout -b feature/minha-melhoria
```

3. Faça os commits das alterações:

```bash
git commit -m "Adiciona nova funcionalidade X"
```

4. Envie a branch:

```bash
git push origin feature/minha-melhoria
```

5. Abra um **Pull Request** descrevendo o que foi alterado.

---

## 📜 Licença

Defina aqui a licença do projeto (por exemplo, **MIT**).
Se ainda não escolheu uma licença, você pode criar um arquivo `LICENSE` na raiz do repositório com o texto da licença desejada.

---

## 👩‍💻 Autora

Projeto desenvolvido por **Rafaela Pinheiro**. [page:2][page:3]

Se este projeto te ajudou ou serviu de inspiração, não esqueça de deixar uma ⭐ no repositório!


