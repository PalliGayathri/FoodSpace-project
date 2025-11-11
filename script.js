// script.js
// Shared navbar + cart logic across all pages

document.addEventListener("DOMContentLoaded", () => {
  // Highlight active nav link
  const current = window.location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });

  // Initialize cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Update cart counter on navbar
  const updateCartCount = () => {
    const count = cart.reduce((acc, item) => acc + item.qty, 0);
    const countEl = document.querySelector(".cart-btn span");
    if (countEl) countEl.textContent = count;
  };
  updateCartCount();

  // Save cart to localStorage
  const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  };

  // Add to cart buttons (used in menu.html)
  document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = {
        name: btn.dataset.name,
        price: parseInt(btn.dataset.price),
        img: btn.dataset.img,
        qty: 1
      };

      const existing = cart.find(i => i.name === item.name);
      if (existing) {
        existing.qty++;
      } else {
        cart.push(item);
      }

      saveCart();

      // small feedback
      alert(`${item.name} added to cart!`);
    });
  });
});
