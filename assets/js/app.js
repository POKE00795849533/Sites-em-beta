let cart = [];
let currentItem = {};

function openEscolha(name, price) {
  currentItem = { name, price };
  const tabelaDeEscolha = document.getElementById("escolher");
  tabelaDeEscolha.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("escolherForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const cor = form.elements["cor"].value;
    const tamanho = form.elements["tamanho"].value;

    const existingItem = cart.find(
      (i) =>
        i.name === currentItem.name &&
        i.price === currentItem.price &&
        i.cor === cor &&
        i.tamanho === tamanho
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        name: currentItem.name,
        price: currentItem.price,
        cor,
        tamanho,
        quantity: 1,
      });
    }

    updateCart();

    document.getElementById("escolher").style.display = "none";

    const buttonCar = document.getElementById("openCarall");
    const lojaButton = document.getElementById("buttonLoja");
    lojaButton.classList.add("bi-gift-fill")
    buttonCar.classList.add("animate-once");
    buttonCar.style.color = "red"
    buttonCar.style.backgroundColor = "pink"
    buttonCar.style.outline = "none"
    buttonCar.style.boxShadow = "0px 0px 20px #ff007d"

    setTimeout(() => {
      buttonCar.classList.remove("animate-once");
      lojaButton.classList.remove("bi-gift-fill");
      lojaButton.classList.add("bi-cart-check");
      buttonCar.style.color = "black"
      buttonCar.style.backgroundColor = "transparent"
      buttonCar.style.outline = "2px solid black"
       buttonCar.style.boxShadow = "none"
    }, 1000);
  });
});

function removeItem(name, cor, tamanho) {
  cart = cart.filter(
    (item) =>
      item.name !== name || item.cor !== cor || item.tamanho !== tamanho
  );
  updateCart();
}

function removeOne(name, cor, tamanho) {
  const item = cart.find(
    (i) => i.name === name && i.cor === cor && i.tamanho === tamanho
  );
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    removeItem(name, cor, tamanho);
  }
  updateCart();
}

function updateCart() {
  const cartItemsElement = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");

  cartItemsElement.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      ${item.name.trim()} - R$${item.price} - ${item.cor.trim()} - ${item.tamanho.trim()} x ${item.quantity}
      <button onclick="removeOne('${item.name}', '${item.cor}', '${item.tamanho}')" class="remove-one"><i class="bi bi-x-lg"></i></button>
      <button onclick="removeItem('${item.name}', '${item.cor}', '${item.tamanho}')" class="remove-all"><i class="bi bi-trash3-fill"></i></button>
    `;
    cartItemsElement.appendChild(li);

    total += item.price * item.quantity;
  });

  totalElement.textContent = total.toFixed(2);
}

const fechar = document.querySelector(".backCar");
const car = document.querySelector(".carContener");
const carButton = document.querySelector(".bi-bag");

function abrirCar() {
  car.style.display = "block";
}

function closeCar() {
  const tabela = document.querySelector(".carContener");
  tabela.style.display = "none";
}

function openCar() {
  const tabela = document.querySelector(".carContener");
  tabela.style.display = "block";
}
// Zap
function gerarMensagemWhatsApp() {
  if (cart.length === 0) return "Carrinho vazio.";

  let mensagem = "Olá! Gostaria de fazer o pedido com os seguintes itens:%0A%0A";

  cart.forEach((item) => {
    mensagem += `${item.quantity}x ${item.name} - R$${item.price} (${item.cor}, ${item.tamanho})%0A`;
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  mensagem += `%0ATotal: R$${total.toFixed(2)}`;

  return mensagem;
}
function enviarWhatsapp() {
  const mensagem = gerarMensagemWhatsApp();
  const telefone = "5521988759154";
  const link = `https://wa.me/${telefone}?text=${mensagem}`;
  window.open(link, "_blank");
}
