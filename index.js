const navLinks = document.querySelector(".nav-links");
const menuIcon = document.querySelector(".fa-bars");
let miniCartBody = document.querySelector(".mini-cart-body");
const cartFooter = document.querySelector(".mini-cart-footer");
const miniCartCalculation = document.querySelector(".mini-cart-calculation h3");
const popularEl = document.querySelector(".popular-wrapper");

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

// popular product js start >>>>>

let basket = JSON.parse(localStorage.getItem("data")) || [];

const popularProductData = [
  {
    id: "a",
    title: "Lays Chips",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    price: 10,
    img: "images/p1.png",
  },
  {
    id: "b",
    title: "Crispy Chips",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    price: 5,
    img: "images/p2.jpg",
  },
  {
    id: "c",
    title: "Potato Chips",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    price: 12,
    img: "images/p3.jpg",
  },
  {
    id: "d",
    title: "Doritos",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    price: 7,
    img: "images/p4.png",
  },
  {
    id: "e",
    title: "Chocolate Biscuit",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    price: 20,
    img: "images/p5.png",
  },
  {
    id: "f",
    title: "Chocolate Biscuit",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    price: 40,
    img: "images/p6.png",
  },
  {
    id: "g",
    title: "Strawberry Pocky",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    price: 19,
    img: "images/p11.png",
  },
  {
    id: "h",
    title: "Mango Juice",
    text: `Some quick example text to build on the card title and make up the
    bulk of the card's content.`,
    price: 50,
    img: "images/product-2.jpg",
  },
];

function generatePopularProduct() {
  popularProductData.forEach((data) => {
    const { id, title, text, img, price } = data;

    const div = document.createElement("div");
    div.innerHTML = `
    <article id=${id} class="popular-product ">
    <img  src=${img} class="product-img" />
    <div class="product-body">
      <h5 class="product-title"> ${title} </h5>
      <p class="product-text">
        ${text}
      </p>
      <h5 class="product-price">$${price}</h5>
        <a onclick="addToCart(${id})" href="#" class="popular-btn">Add To Cart </a>
        </div>
        </div>
        </article>
        `;
    popularEl.appendChild(div);
  });
}
generatePopularProduct();

function addToCart(id) {
  const selectedProduct = id.id;

  const searchBasket = basket.find((product) => product.id === selectedProduct);

  if (searchBasket === undefined) {
    basket.push({
      id: selectedProduct,
      quantity: 1,
    });
    localStorage.setItem("data", JSON.stringify(basket));
    updateCart();
  } else return;
}

function updateCart() {
  const cartQuantity = document.querySelector(".quantity");
  cartQuantity.innerText = basket.length;
  generateMiniCart();
}
updateCart();

// popular product js end >>>>>

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

function removeMiniCartItem(id) {
  const selectedProduct = id[0];
  basket = basket.filter((item) => selectedProduct.id !== item.id);
  localStorage.setItem("data", JSON.stringify(basket));
  generateMiniCart();
  updateCart();
}

function increment(id) {
  const selectedProduct = id[0];

  const search = basket.find((item) => item.id === selectedProduct.id);
  search.quantity++;
  localStorage.setItem("data", JSON.stringify(basket));
  generateMiniCart();
}

function decrement(id) {
  const selectedProduct = id[0];
  const search = basket.find((item) => item.id === selectedProduct.id);

  if (search.quantity > 1) {
    search.quantity--;
    localStorage.setItem("data", JSON.stringify(basket));
    generateMiniCart();
  }
}

function clearCart() {
  basket = [];
  localStorage.setItem("data", JSON.stringify(basket));
  generateMiniCart();
  updateCart();
}
// mini cart js end >>>>>
