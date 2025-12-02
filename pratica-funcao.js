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

function listar() {
  return produtos;
}

function buscarPorNome(nome) {
  return produtos.find(function (p) {
    return p.nome === nome;
  });
}

console.log("Atualização de Estoque:")
atualizarEstoque(1, 20)
console.log("Filtragem por faixa de preço:")
filtrarProdutoPreco(5, 30)
console.log("Lista de produtos:");
console.log(listar());
console.log("Produto desejado:");
console.log(buscarPorNome("Xampu"));
