const Sideb = document.getElementById("sidebar");
const Btn = document.querySelector("#shop button");
const closeCart = document.getElementById("delete");
const ItemsContainer = document.getElementById("items");
const Totals = document.getElementById("total");

let carts = [];

Btn.onclick = () => Sideb.classList.add("active");
if (closeCart) {
  closeCart.onclick = () => Sideb.classList.remove("active");
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const itemElement = button.closest(".sala, .burger, .cola, .ice");

    if (itemElement) {
      const name = itemElement.querySelector("h3").innerText;
      const imgSrc = itemElement.querySelector("img").src;
      const priceText = itemElement.querySelector("h4").innerText;
      const price = parseFloat(priceText.replace("$", "").trim());

      if (button.querySelector(".fa-plus")) {
        updateCart(name, price, imgSrc, 1);
      } else {
        updateCart(name, price, imgSrc, -1);
      }

      Sideb.classList.add("active");
    }
  });
});

function updateCart(name, price, imgSrc, change) {
  const existingItem = carts.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += change;

    if (existingItem.quantity <= 0) {
      carts = carts.filter((item) => item.name !== name);
    }
  } else if (change > 0) {
    carts.push({ name, price, imgSrc, quantity: 1 });
  }
  renderCart();
}

function renderCart() {
  ItemsContainer.innerHTML = "";
  let total = 0;

  carts.forEach((item) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
            <img src="${item.imgSrc}" class="cart-item-img">
            <div class="cart-item-details">
                <span style="font-weight:bold;">${item.name}</span>
                <span>${item.quantity} x $${item.price.toFixed(2)}</span>
            </div>
            <span style="font-weight:bold;">$${(item.price * item.quantity).toFixed(2)}</span>
        `;

    ItemsContainer.appendChild(cartItem);
  });

  Totals.innerText = total.toFixed(2);
}
