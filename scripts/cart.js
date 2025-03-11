let cart = JSON.parse(localStorage.getItem("cart")) || []; // Carrega o carrinho do LocalStorage

function showToast() {
    let toast = document.getElementById("toast");
    toast.classList.add("show");

    // Remove o toast após 3 segundos
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function addToCart(productId) {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            let product = products.find(p => p.id === productId);
            let existingProduct = cart.find(p => p.id === productId);

            if (existingProduct) {
                existingProduct.quantity += 1; // Aumenta a quantidade se já estiver no carrinho
            } else {
                product.quantity = 1; // Adiciona o produto com quantidade 1
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart)); // Salva no LocalStorage
            updateCartCount();

            showToast();
        });
}

function updateCartCount() {
    let cartCount = document.getElementById("cart-count");
    let totalItems = cart.reduce((total, product) => total + product.quantity, 0);
    cartCount.textContent = totalItems;
}

// Atualiza o contador ao carregar a página
document.addEventListener("DOMContentLoaded", updateCartCount);

function loadCart() {
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Seu carrinho está vazio.</p>";
        cartTotal.textContent = "0.00";
        return;
    }

    cart.forEach(product => {
        let item = document.createElement("div");
        item.classList.add("cart-item");
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="50">
            <span>${product.name}</span>
            <span>R$ ${product.price.toFixed(2)}</span>
            <span>Qtd: ${product.quantity}</span>
            <button onclick="removeFromCart(${product.id})">Remover</button>
        `;
        cartItems.appendChild(item);
        total += product.price * product.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    loadCart();
    updateCartCount();
}

document.addEventListener("DOMContentLoaded", loadCart);
