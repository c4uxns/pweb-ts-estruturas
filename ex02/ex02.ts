type TipoCliente = 'residencial' | 'rural' | 'comercial' | 'industrial';
type Bandeira = 'verde' | 'amarela' | 'vermelha1' | 'vermelha2';

function tarifaPorKwh(tipo: TipoCliente): number {
  switch (tipo) {
    case 'residencial':
    case 'rural':
      return 0.80;
    case 'comercial':
    case 'industrial':
      return 0.95;
  }
}

function adicionalBandeira(consumo: number, bandeira: Bandeira = 'verde'): number {
  let taxaAdicional = 0;
  switch (bandeira) {
    case 'verde':
      taxaAdicional = 0;
      break;
    case 'amarela':
      taxaAdicional = 0.02;
      break;
    case 'vermelha1':
      taxaAdicional = 0.04;
      break;
    case 'vermelha2':
      taxaAdicional = 0.08;
      break;
  }
  return consumo * taxaAdicional;
}

// Teste do parâmetro padrão solicitado no enunciado:
// Chamando adicionalBandeira(100) sem o segundo argumento assume o valor padrão 'verde',
// resultando em 0.00 de adicional, pois a bandeira verde não gera custo extra por kWh.
console.log("Teste parâmetro padrão:", adicionalBandeira(100));

function mensagemBandeira(bandeira: Bandeira): string {
  switch (bandeira) {
    case 'verde':
      return "Condições favoráveis de geração de energia.";
    case 'amarela':
      return "Condições de geração menos favoráveis.";
    case 'vermelha1':
    case 'vermelha2':
      return "Condições mais caras de geração. Economize!";
    default:
      return "";
  }
}

const campoConsumo = document.getElementById('consumo') as HTMLInputElement;
const campoTipo = document.getElementById('tipo') as HTMLSelectElement;
const campoBandeira = document.getElementById('bandeira') as HTMLSelectElement;
const botaoEx02 = document.getElementById('calcular') as HTMLButtonElement;
const saidaEx02 = document.getElementById('resultado') as HTMLElement;

botaoEx02.addEventListener('click', () => {
  const consumo = campoConsumo.valueAsNumber;
  const tipo = campoTipo.value as TipoCliente;
  const bandeira = campoBandeira.value as Bandeira;

  if (isNaN(consumo) || consumo <= 0) {
    saidaEx02.textContent = "Informe um consumo válido";
    saidaEx02.className = "erro";
    return;
  }

  const valorEnergia = consumo * tarifaPorKwh(tipo);
  const valorBandeira = adicionalBandeira(consumo, bandeira);
  const total = valorEnergia + valorBandeira;
  const mensagem = mensagemBandeira(bandeira);

  const nomeBandeiraFormatada = bandeira === 'verde' ? 'verde' : bandeira === 'amarela' ? 'amarela' : bandeira === 'vermelha1' ? 'vermelha patamar 1' : 'vermelha patamar 2';

  saidaEx02.textContent = 
    `Energia: R$ ${valorEnergia.toFixed(2)}
Bandeira ${nomeBandeiraFormatada}: R$ ${valorBandeira.toFixed(2)}
Total: R$ ${total.toFixed(2)}
${mensagem}`;

  saidaEx02.className = bandeira === 'verde' ? "sucesso" : "alerta";
});