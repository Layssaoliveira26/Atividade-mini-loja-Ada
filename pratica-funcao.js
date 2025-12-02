const produtos = [
  { id: 1, nome: 'Sabonete', preco: 3.5, estoque: 10 },
  { id: 2, nome: 'Xampu', preco: 12.0, estoque: 5 },
  { id: 3, nome: 'Máscara', preco: 25.0, estoque: 2 }
];

function filtrarProdutoPreco(min, max) {
    let filtro = produtos.filter(produto => produto.preco >= min && produto.preco <= max)
    console.log(filtro)
}

function atualizarEstoque(id, delta) {
    let produtof = produtos.find(produto => produto.id == id)
    produtof.estoque += delta
    console.log(produtof)
}

atualizarEstoque(1, 20)
filtrarProdutoPreco(5, 30)
