document.addEventListener('DOMContentLoaded', () => {
  const itens = [
    "Banha Rama", "Cabeça", "Carne da sangria", "Carne da traqueia", "Carne de cabeça",
    "Cauda", "Coração", "Estômago", "Figado", "Glândulas e linfonodos",
    "Gordura em excesso", "Lingua", "Mão", "Máscara", "Papada",
    "Pé", "Pele", "Pernas na altura dos jarretes", "Rabo", "Rabo",
    "Sangue", "Tripa", "Unhas e casco", "Víscera"
  ];

  const contagem = {};
  const lista = document.getElementById('itens-lista');
  const resultado = document.getElementById('resultado');
  const resumoFinal = document.getElementById('resumo-final');

  function gerarCorAleatoria() {
    const letras = '0123456789ABCDEF';
    let cor = '#';
    for (let i = 0; i < 6; i++) {
      cor += letras[Math.floor(Math.random() * 16)];
    }
    return cor;
  }

  itens.forEach((nome) => {
    contagem[nome] = 0;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.style.backgroundColor = gerarCorAleatoria();

    const nomeSpan = document.createElement('span');
    nomeSpan.textContent = `${nome}: 0`;
    nomeSpan.addEventListener('click', () => {
      contagem[nome]++;
      nomeSpan.textContent = `${nome}: ${contagem[nome]}`;
      atualizarResumo();
    });

    itemDiv.appendChild(nomeSpan);
    lista.appendChild(itemDiv);
  });

  function atualizarResumo() {
    let texto = `<strong>Resumo:</strong><br>`;
    for (const [nome, valor] of Object.entries(contagem)) {
      if (valor > 0) {
        texto += `${nome}: ${valor}<br>`;
      }
    }
    resultado.innerHTML = texto || "Nenhum item selecionado";
  }

  document.getElementById('finalizar').addEventListener('click', async () => {
    const agora = new Date();
    const dataHora = agora.toLocaleString('pt-BR');

    let textoFinal = `Resumo Final\n`;
    textoFinal += `Data e Hora: ${dataHora}\n\n`;
    textoFinal += `Contagem:\n`;

    for (const [nome, valor] of Object.entries(contagem)) {
      if (valor > 0) {
        textoFinal += `${nome}: ${valor}\n`;
      }
    }

    textoFinal += `\nAssinatura: __________________________\n`;
    textoFinal += `Ábaco Domporquito S/A`;

    // Exibe na tela
    resumoFinal.innerHTML = `
      <h3>Resumo Final</h3>
      <strong>Data e Hora:</strong> ${dataHora}<br><br>
      <strong>Contagem:</strong><br>` +
      Object.entries(contagem)
        .filter(([_, valor]) => valor > 0)
        .map(([nome, valor]) => `${nome}: ${valor}<br>`)
        .join('') +
      `<br><strong>Assinatura:</strong> __________________________<br>
      <em>Ábaco Domporquito S/A</em>`;

    // Gera o PDF usando jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFont("Helvetica");
    doc.setFontSize(12);
    doc.text(textoFinal, 10, 10);
    doc.save("contagem-abaco.pdf");
  });
});
