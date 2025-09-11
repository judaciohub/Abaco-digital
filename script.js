document.addEventListener('DOMContentLoaded', () => {
  const contas = document.querySelectorAll('.conta');
  const resultado = document.getElementById('resultado');

  contas.forEach((conta, index) => {
    conta.style.top = `${index * 40 + 10}px`;

    conta.addEventListener('click', () => {
      const currentTop = parseInt(conta.style.top);
      const newTop = currentTop === 10 ? 200 : 10;
      conta.style.top = `${newTop}px`;
      calcularValor();
    });
  });

  function calcularValor() {
    let total = 0;
    contas.forEach(conta => {
      if (parseInt(conta.style.top) === 200) {
        total += parseInt(conta.dataset.valor);
      }
    });
    resultado.textContent = `Valor: ${total}`;
  }
});
