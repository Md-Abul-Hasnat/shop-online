const navLinks = document.querySelector(".nav-links");
const menuIcon = document.querySelector(".fa-bars");

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
