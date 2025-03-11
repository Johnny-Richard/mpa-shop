document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartSummary = document.getElementById("cart-summary");
    let itemsInput = document.getElementById("items");

    if (cart.length === 0) {
        cartSummary.innerHTML = "<p>Seu carrinho está vazio.</p>";
        return;
    }

    let total = 0;
    let itemsString = "";
    
    cart.forEach((product, index) => {
        total += product.price * product.quantity;
        cartSummary.innerHTML += `
            <p>${product.name} - R$ ${product.price.toFixed(2)} x ${product.quantity}</p>
        `;
        
        // Formato esperado pelo PagSeguro: idProduto;nomeProduto;quantidade;valor
        itemsString += `${index + 1};${product.name};${product.quantity};${product.price.toFixed(2)}|`;
    });

    itemsInput.value = itemsString.slice(0, -1); // Remove o último "|"
});
