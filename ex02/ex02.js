function tarifaPorKwh(tipo) {
    switch (tipo) {
        case 'residencial':
        case 'rural':
            return 0.80;
        case 'comercial':
        case 'industrial':
            return 0.95;
    }
}
function adicionalBandeira(consumo, bandeira = 'verde') {
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
function mensagemBandeira(bandeira) {
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
const campoConsumo = document.getElementById('consumo');
const campoTipo = document.getElementById('tipo');
const campoBandeira = document.getElementById('bandeira');
const botaoEx02 = document.getElementById('calcular');
const saidaEx02 = document.getElementById('resultado');
botaoEx02.addEventListener('click', () => {
    const consumo = campoConsumo.valueAsNumber;
    const tipo = campoTipo.value;
    const bandeira = campoBandeira.value;
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
export {};
//# sourceMappingURL=ex02.js.map