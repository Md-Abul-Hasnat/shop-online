const navLinks = document.querySelector(".nav-links");
const menuIcon = document.querySelector(".fa-bars");
let miniCartBody = document.querySelector(".mini-cart-body");
const cartFooter = document.querySelector(".mini-cart-footer");
const miniCartCalculation = document.querySelector(".mini-cart-calculation h3");
const popularEl = document.querySelector(".popular-wrapper");
const tableBody = document.querySelector("tbody");
const grandTotal = document.querySelector(".grand-total");

let basket = JSON.parse(localStorage.getItem("data")) || [];

// sticky nav functionality >>>>
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("sticky", window.scrollY > 380);
});

// navbar functionality >>>>>
menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("show-links");
});

// mini cart functionality >>>>>>

const miniCart = document.querySelector(".mini-cart");
const blur = document.querySelector(".blur");
const shoppingCartIcon = document.querySelector(".fa-cart-shopping");
const closeCartIcon = document.querySelector(".close-cart");

shoppingCartIcon.addEventListener("click", showCart);
closeCartIcon.addEventListener("click", showCart);
blur.addEventListener("click", showCart);

function showCart() {
  if (miniCart.classList.contains("show-mini-cart")) {
    miniCart.classList.remove("show-mini-cart");
    blur.style.display = "none";
  } else {
    miniCart.classList.add("show-mini-cart");
    blur.style.display = "block";
  }
}

function updateCart() {
  const cartQuantity = document.querySelector(".quantity");
  cartQuantity.innerText = basket.length;
}
updateCart();

// mini cart js start >>>>>

function generateMiniCart() {
  miniCartBody.innerHTML = "";

  if (basket.length === 0) {
    miniCartBody.innerHTML = `<h1 class="empty-text">Cart is empty</h1>`;
    cartFooter.style.display = "none";
    miniCartCalculation.style.display = "none";
  } else {
    const item = basket.map((product) => {
      const search = popularProductData.find((data) => data.id === product.id);
      return product.quantity * search.price;
    });
    const totalPrice = item.reduce((cur, sum) => cur + sum, 0);

    basket.forEach((product) => {
      const search = popularProductData.find((item) => item.id === product.id);
      const { id, img, price, title } = search;
      const minicartDiv = document.createElement("div");

      minicartDiv.innerHTML = `
        <article  class="mini-cart-item">
              <div class='mini-cart-left'>
              <img src=${img} alt="" />
              <p> ${product.quantity} </p>
              </div>
              <div class="info">
                <h4> ${title} </h4>
                <div class="plus-minus-icon">
                  <i onclick=" decrement(${id})" class="fa-solid fa-minus"></i>
                  <p id = ${id}>$${price * product.quantity} </p>
                  <i onclick=" increment(${id})" class="fa-solid fa-plus"></i>
                </div>
              </div>
              <i onclick="removeMiniCartItem(${id})" class="fa-solid fa-xmark"></i>
    
            </article>
        `;
      miniCartBody.appendChild(minicartDiv);
    });
    miniCartCalculation.innerText = `Total Price : $${totalPrice}`;
    miniCartCalculation.style.display = "block";
    cartFooter.style.display = "block";
  }
}
generateMiniCart();

function removeMiniCartItem(id) {
  const selectedProduct = id.id;
  basket = basket.filter((item) => selectedProduct !== item.id);
  localStorage.setItem("data", JSON.stringify(basket));
  generateMiniCart();
  generateCartPage();
  updateCart();
}

function increment(id) {
  const selectedProduct = id.id;

  const search = basket.find((item) => item.id === selectedProduct);
  search.quantity++;
  localStorage.setItem("data", JSON.stringify(basket));
  generateMiniCart();
  generateCartPage();
}

function decrement(id) {
  const selectedProduct = id.id;
  const search = basket.find((item) => item.id === selectedProduct);

  if (search.quantity > 1) {
    search.quantity--;
    localStorage.setItem("data", JSON.stringify(basket));
    generateMiniCart();
    generateCartPage();
  }
}

function clearCart() {
  basket = [];
  localStorage.setItem("data", JSON.stringify(basket));
  generateMiniCart();
  generateCartPage();
  updateCart();
}
// mini cart js end >>>>>

// cart page functionality start >>>>>>

function generateCartPage() {
  tableBody.innerHTML = "";

  const item = basket.map((product) => {
    const search = popularProductData.find((data) => data.id === product.id);
    return product.quantity * search.price;
  });
  const totalPrice = item.reduce((cur, sum) => cur + sum, 0);

  basket.forEach((item) => {
    const search = popularProductData.find((product) => product.id === item.id);
    const { id, img, price, title } = search;

    const cartTr = document.createElement("tr");

    cartTr.innerHTML = `
    <td><img src=${img} /></td>
    <td> ${title} </td>
    <td>$${price}</td>
    <td class="qty">
      <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
      <p> ${item.quantity}</p>
      <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
    </td>
    <td>$${item.quantity * price}</td>
    <td><i onclick='removeMiniCartItem(${id})' class="fa-solid fa-xmark"></i></td>
    `;

    tableBody.appendChild(cartTr);
  });

  if (basket.length === 0) {
    grandTotal.innerHTML = "";
  } else {
    grandTotal.innerHTML = `
    <h2>Total Price : $ ${totalPrice}</h2>
          <a class="checkout" href="#">Checkout</a>
    `;
  }
}
generateCartPage();

// cart page functionality end >>>>>>
