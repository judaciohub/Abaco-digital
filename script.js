document.addEventListener('DOMContentLoaded', () => {
  const resultado = document.getElementById('resultado');

  // Lista de itens com nomes e cores
  const itens = [
    { nome: "Banha Rama", cor: "#FF5733" },
    { nome: "Cabeça", cor: "#33C1FF" },
    { nome: "Carne da sangria", cor: "#FF33A8" },
    { nome: "Carne da traqueia", cor: "#33FF57" },
    { nome: "Carne de cabeça", cor: "#FFC300" },
    { nome: "Cauda", cor: "#DAF7A6" },
    { nome: "Coração", cor: "#C70039" },
    { nome: "Estômago", cor: "#900C3F" },
    { nome: "Figado", cor: "#581845" },
    { nome: "Glândulas e linfonodos", cor: "#FF8C00" },
    { nome: "Gordura em excesso", cor: "#8B0000" },
    { nome: "Lingua", cor: "#4682B4" },
    { nome: "Mão", cor: "#2E8B57" },
    { nome: "Máscara", cor: "#6A5ACD" },
    { nome: "Papada", cor: "#20B2AA" },
    { nome: "Pé", cor: "#B22222" },
    { nome: "Pele", cor: "#FF1493" },
    { nome: "Pernas na altura dos jarretes", cor: "#7FFF00" },
    { nome: "Rabo", cor: "#FF4500" },
    { nome: "Rabo", cor: "#FF4500" },
    { nome: "Sangue", cor: "#DC143C" },
    { nome: "Tripa", cor: "#A0522D" },
    { nome: "Unhas e casco", cor: "#708090" },
    { nome: "Víscera", cor: "#556B2F" }
  ];

  const abaco = document.querySelector('.abaco');

  // Criar contas dinamicamente
  itens.forEach((item, index) => {
    const conta = document.createElement('div');
    conta.classList.add('conta');
    conta.dataset.nome = item.nome;
    conta.dataset.valor = 1;
    conta.style.top = `${index * 40 + 10}px`;
    conta.style.backgroundColor = item.cor;

    // Adiciona rótulo com nome
    conta.textContent = item.nome;
    conta.style.color = "#fff";
    conta.style.fontSize = "10px";
    conta.style.textAlign = "center";
    conta.style.lineHeight = "30px";

    // Clique para alternar posição
    conta.addEventListener('click', () => {
      const currentTop = parseInt(conta.style.top);
      const newTop = currentTop === 10 ? 200 : 10;
      conta.style.top = `${newTop}px`;
      calcularValor();
    });

    abaco.appendChild(conta);
  });

  function calcularValor() {
    const contagem = {};

    document.querySelectorAll('.conta').forEach(conta => {
      if (parseInt(conta.style.top) === 200) {
        const nome = conta.dataset.nome;
        contagem[nome] = (contagem[nome] || 0) + parseInt(conta.dataset.valor);
      }
    });

    // Exibe resultado formatado
    let texto = `<strong>Resumo:</strong><br>`;
    for (const [nome, valor] of Object.entries(contagem)) {
      texto += `${nome}: ${valor}<br>`;
    }

    resultado.innerHTML = texto || "Nenhum item selecionado";
  }
});
