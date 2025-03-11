document.addEventListener("DOMContentLoaded", function() {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            let productList = document.getElementById("product-list");
            productList.innerHTML = ""; // Limpa a lista antes de adicionar os produtos

            // Embaralha os produtos aleatoriamente
            let shuffledProducts = products.sort(() => 0.5 - Math.random());
            
            // Seleciona os primeiros 4 produtos
            let selectedProducts = shuffledProducts.slice(0, 4);

            selectedProducts.forEach(product => {
                let productElement = document.createElement("div");
                productElement.classList.add("product");
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>R$ ${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
                `;
                productList.appendChild(productElement);
            });
        })
        .catch(error => console.error("Erro ao carregar produtos:", error));
});

document.addEventListener("DOMContentLoaded", function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    showSlide(currentSlide);
    setInterval(nextSlide, 5000); // Alterna a cada 5 segundos
});