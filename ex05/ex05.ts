type FormatadorEx05 = (valor: number) => string;

const formatarMoeda: FormatadorEx05 = (valor: number): string => {
  return `R$ ${valor.toFixed(2)}`;
};

function lerPrecos(texto: string): { precos: number[]; ignorados: number } {
  const linhas = texto.split('\n');
  const precos: number[] = [];
  let ignorados = 0;
  let contadorItens = 0;

  for (let i = 0; i < linhas.length; i++) {
    const linhaLimpa = linhas[i].trim();

    // Ignora linhas vazias
    if (linhaLimpa === "") {
      continue;
    }

    // Aceita ponto ou vírgula substituindo por ponto
    const valorConvertido = Number(linhaLimpa.replace(',', '.'));

    // Verifica se é um número válido e maior que zero
    if (isNaN(valorConvertido) || valorConvertido <= 0) {
      ignorados++;
      continue;
    }

    // No máximo 20 itens por compra
    if (contadorItens >= 20) {
      ignorados++;
      continue;
    }

    precos.push(valorConvertido);
    contadorItens++;
  }

  return { precos, ignorados };
}

function somarItens(...precos: number[]): number {
  let soma = 0;
  for (let p of precos) {
    soma += p;
  }
  return soma;
}

// Sobrecarga de funções
function calcularDesconto(total: number, percentual: number): number;
function calcularDesconto(total: number, cupom: string): number;
function calcularDesconto(total: number, arg: number | string): number {
  if (typeof arg === 'number') {
    return (total * arg) / 100;
  } else {
    const cupomUpper = arg.trim().toUpperCase();
    switch (cupomUpper) {
      case 'BEMVINDO':
        return total * 0.10;
      case 'PROMO20':
        return total * 0.20;
      case 'MENOS15':
        return total >= 100 ? 15.00 : 0;
      default:
        return 0;
    }
  }
}

const campoItens = document.getElementById('itens') as HTMLTextAreaElement;
const campoCupom = document.getElementById('cupom') as HTMLInputElement;
const checkFidelidade = document.getElementById('fidelidade') as HTMLInputElement;
const botaoFechar = document.getElementById('fechar') as HTMLButtonElement;
const saidaEx05 = document.getElementById('resultado') as HTMLElement;

botaoFechar.addEventListener('click', () => {
  const textoItens = campoItens.value;
  const cupomTexto = campoCupom.value.trim();
  const possuiFidelidade = checkFidelidade.checked;

  const resultadoLeitura = lerPrecos(textoItens);

  if (resultadoLeitura.precos.length === 0) {
    saidaEx05.textContent = "Nenhum item válido";
    saidaEx05.className = "erro";
    return;
  }

  const subtotal = somarItens(...resultadoLeitura.precos);
  let descontoCupom = 0;
  let cupomValidoMsg = "";

  if (cupomTexto !== "") {
    const cupomUpper = cupomTexto.toUpperCase();
    if (cupomUpper === 'BEMVINDO' || cupomUpper === 'PROMO20' || (cupomUpper === 'MENOS15' && subtotal >= 100)) {
      descontoCupom = calcularDesconto(subtotal, cupomTexto);
      cupomValidoMsg = `Cupom ${cupomUpper}: - ${formatarMoeda(descontoCupom)}`;
    } else {
      cupomValidoMsg = `Cupom inválido ou não aplicável`;
    }
  }

  const subtotalComCupom = Math.max(0, subtotal - descontoCupom);
  
  let descontoFidelidade = 0;
  if (possuiFidelidade) {
    descontoFidelidade = calcularDesconto(subtotalComCupom, 5);
  }

  const totalFinal = Math.max(0, subtotalComCupom - descontoFidelidade);

  const totalItensValidos = resultadoLeitura.precos.length;
  const infoIgnorados = resultadoLeitura.ignorados > 0 ? ` (${resultadoLeitura.ignorados} ${resultadoLeitura.ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})` : '';

  let textoResultado = `Itens: ${totalItensValidos}${infoIgnorados}
Subtotal: ${formatarMoeda(subtotal)}`;

  if (cupomTexto !== "") {
    textoResultado += `\n${cupomValidoMsg}`;
  }

  if (possuiFidelidade) {
    textoResultado += `\nFidelidade (5%): - ${formatarMoeda(descontoFidelidade)}`;
  }

  textoResultado += `\nTotal a pagar: ${formatarMoeda(totalFinal)}`;

  saidaEx05.textContent = textoResultado;
  saidaEx05.className = "sucesso";
});