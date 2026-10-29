type Formatador = (valor: number) => string;

const formatarReal: Formatador = (valor: number): string => {
  return `R$ ${valor.toFixed(2)}`;
};

const formatarMeses = (meses: number): string => {
  const anos = Math.floor(meses / 12);
  const restoMeses = meses % 12;

  if (anos === 0) {
    return `${meses} ${meses === 1 ? 'mês' : 'meses'}`;
  } else if (restoMeses === 0) {
    return `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
  } else {
    const strAnos = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
    const strMeses = `${restoMeses} ${restoMeses === 1 ? 'mês' : 'meses'}`;
    return `${strAnos} e ${strMeses}`;
  }
};

function calcularMeses(meta: number, deposito: number, taxa: number = 0.5): { meses: number; saldo: number; depositado: number } {
  let saldo = 0;
  let meses = 0;
  let totalDepositado = 0;
  const maxMeses = 600;

  while (saldo < meta && meses < maxMeses) {
    meses++;
    // Primeiro o saldo rende
    saldo = saldo * (1 + taxa / 100);
    
    // A cada mês 12, 24, 36... o cliente deposita o dobro (13º salário)
    let valorDepositoAtual = deposito;
    if (meses % 12 === 0) {
      valorDepositoAtual = deposito * 2;
    }

    saldo += valorDepositoAtual;
    totalDepositado += valorDepositoAtual;
  }

  return { meses, saldo, depositado: totalDepositado };
}

function exibirValor(rotulo: string, valor: number, formatar: Formatador): string {
  return `${rotulo}: ${formatar(valor)}`;
}

const campoMeta = document.getElementById('meta') as HTMLInputElement;
const campoDeposito = document.getElementById('deposito') as HTMLInputElement;
const campoTaxa = document.getElementById('taxa') as HTMLInputElement;
const botaoCalcEx04 = document.getElementById('calcular') as HTMLButtonElement;
const saidaEx04 = document.getElementById('resultado') as HTMLElement;

botaoCalcEx04.addEventListener('click', () => {
  const meta = campoMeta.valueAsNumber;
  const deposito = campoDeposito.valueAsNumber;
  const taxaStr = campoTaxa.value;
  const taxa = taxaStr !== "" ? Number(taxaStr) : 0.5;

  if (isNaN(meta) || meta <= 0 || isNaN(deposito) || deposito <= 0) {
    saidaEx04.textContent = "Informe valores positivos";
    saidaEx04.className = "erro";
    return;
  }

  const resultadoSimulacao = calcularMeses(meta, deposito, taxa);
  const rendimento = resultadoSimulacao.saldo - resultadoSimulacao.depositado;

  if (resultadoSimulacao.meses >= 600 && resultadoSimulacao.saldo < meta) {
    saidaEx04.textContent = `Meta inalcançável em 50 anos. Saldo após 600 meses: R$ ${resultadoSimulacao.saldo.toFixed(2)}`;
    saidaEx04.className = "erro";
  } else {
    const tempoFormatado = formatarMeses(resultadoSimulacao.meses);
    saidaEx04.textContent = 
      `Você atinge a meta em ${resultadoSimulacao.meses} meses (${tempoFormatado}).
Saldo final: ${formatarReal(resultadoSimulacao.saldo)}
Total depositado: ${formatarReal(resultadoSimulacao.depositado)}
Rendimento: ${formatarReal(rendimento)}`;
    saidaEx04.className = "sucesso";
  }
});