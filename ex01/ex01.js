function calcularMedia(n1, n2) {
    return (n1 + n2) / 2;
}
function dadosValidos(n1, n2, frequencia) {
    return n1 >= 0 && n1 <= 10 && n2 >= 0 && n2 <= 10 && frequencia >= 0 && frequencia <= 100;
}
function situacao(media, frequencia) {
    if (frequencia < 75) {
        return "Reprovado por falta";
    }
    else if (media >= 7) {
        return "Aprovado";
    }
    else if (media >= 4) {
        return `Exame final (precisa tirar ${(10 - media).toFixed(1)})`;
    }
    else {
        return "Reprovado por nota";
    }
}
const campoNome = document.getElementById('nome');
const campoN1 = document.getElementById('n1');
const campoN2 = document.getElementById('n2');
const campoFrequencia = document.getElementById('frequencia');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const nome = campoNome.value.trim();
    const n1 = campoN1.valueAsNumber;
    const n2 = campoN2.valueAsNumber;
    const frequencia = campoFrequencia.valueAsNumber;
    if (!dadosValidos(n1, n2, frequencia)) {
        saida.textContent = "Dados inválidos";
        saida.className = "erro";
        return;
    }
    const media = calcularMedia(n1, n2);
    const resultadoSituacao = situacao(media, frequencia);
    const aprovado = resultadoSituacao === "Aprovado";
    saida.textContent = `${nome ? nome + ': ' : ''}média ${media.toFixed(1)}. ${resultadoSituacao}.`;
    saida.className = aprovado ? "sucesso" : "erro";
});
export {};
//# sourceMappingURL=ex01.js.map