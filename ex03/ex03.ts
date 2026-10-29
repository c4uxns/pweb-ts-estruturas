function calcularTotal(valor: number, parcelas: number): number {
  if (parcelas <= 3) {
    return valor;
  }
  // Juros compostos de 2% ao mês a partir de 4 parcelas
  return valor * (1.02 ** parcelas);
}

function simularParcelamento(preco: number, entrada?: number): string {
  let financiado = preco;
  if (typeof entrada !== 'undefined' && !isNaN(entrada)) {
    financiado = preco - entrada;
  }

  if (financiado <= 0) {
    return "";
  }

  let htmlLinhas = "";

  for (let p = 1; p <= 12; p++) {
    // Pula 7, 8, 9 e 11 parcelas conforme regras da loja
    if (p === 7 || p === 8 || p === 9 || p === 11) {
      continue;
    }

    const total = calcularTotal(financiado, p);
    const valorParcela = total / p;

    // Se a parcela ficar abaixo de R$ 50,00, as opções acabam
    if (valorParcela < 50.00) {
      break;
    }

    const tipoJuros = p <= 3 ? "sem juros" : "2% a.m.";

    htmlLinhas += `<tr>
      <td>${p}x</td>
      <td>R$ ${valorParcela.toFixed(2)}</td>
      <td>R$ ${total.toFixed(2)}</td>
      <td>${tipoJuros}</td>
    </tr>`;
  }

  return htmlLinhas;
}

const campoPreco = document.getElementById('preco') as HTMLInputElement;
const campoEntrada = document.getElementById('entrada') as HTMLInputElement;
const botaoSimular = document.getElementById('simular') as HTMLButtonElement;
const saidaEx03 = document.getElementById('resultado') as HTMLElement;
const tbodyParcelas = document.getElementById('parcelas') as HTMLTableSectionElement;

botaoSimular.addEventListener('click', () => {
  const preco = campoPreco.valueAsNumber;
  const entradaStr = campoEntrada.value;
  const entrada = entradaStr !== "" ? Number(entradaStr) : undefined;

  tbodyParcelas.innerHTML = "";

  if (isNaN(preco) || preco <= 0) {
    saidaEx03.textContent = "Informe um preço válido.";
    saidaEx03.className = "erro";
    return;
  }

  if (typeof entrada !== 'undefined' && entrada >= preco) {
    saidaEx03.textContent = "A entrada cobre o valor total. Não há parcelas.";
    saidaEx03.className = "sucesso";
    return;
  }

  const financiado = typeof entrada !== 'undefined' ? preco - entrada : preco;
  saidaEx03.textContent = `Valor financiado: R$ ${financiado.toFixed(2)}`;
  saidaEx03.className = "";

  tbodyParcelas.innerHTML = simularParcelamento(preco, entrada);
});