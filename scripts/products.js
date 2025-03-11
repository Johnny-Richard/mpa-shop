// Função para exibir os produtos filtrados
function exibirProdutos(produtosFiltrados) {
    let productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Limpa a lista antes de adicionar os produtos

    produtosFiltrados.forEach(product => {
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
}

// Função para filtrar por categoria
function filtrarCategoria(categoria) {
    if (categoria === 'todos') {
        exibirProdutos(window.produtos); // Exibe todos os produtos
    } else {
        const produtosFiltrados = window.produtos.filter(produto => produto.category === categoria);
        exibirProdutos(produtosFiltrados);
    }
}

// Função para pesquisar produtos por nome
function pesquisarProdutos() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase(); // Captura o termo de pesquisa e converte para minúsculas
    const produtosFiltrados = window.produtos.filter(produto => 
        produto.name.toLowerCase().includes(searchTerm) // Verifica se o nome do produto contém o termo de pesquisa
    );
    exibirProdutos(produtosFiltrados); // Exibe os produtos filtrados
}

// Atualiza a lista de produtos quando a página é carregada
document.addEventListener("DOMContentLoaded", function() {
    if (window.produtos && window.produtos.length > 0) {
        exibirProdutos(window.produtos);
    } else {
        fetch('products.json')
            .then(response => response.json())
            .then(products => {
                window.produtos = products; // Armazena os dados globalmente
                exibirProdutos(window.produtos); // Exibe todos os produtos inicialmente
            })
            .catch(error => {
                console.error('Erro ao carregar os produtos:', error);
            });
    }
});
