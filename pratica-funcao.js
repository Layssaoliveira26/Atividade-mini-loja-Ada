const produtos = [
  { id: 1, nome: "Sabonete", preco: 3.5, estoque: 10 },
  { id: 2, nome: "Xampu", preco: 12.0, estoque: 5 },
  { id: 3, nome: "Máscara", preco: 25.0, estoque: 2 },
];

function filtrarProdutoPreco(min, max) {
  let filtro = produtos.filter(
    (produto) => produto.preco >= min && produto.preco <= max
  );
  console.log(filtro);
}

function atualizarEstoque(id, delta) {
  let produtof = produtos.find((produto) => produto.id == id);
  produtof.estoque += delta;
  console.log(produtof);
}

function listar() {
  return produtos;
}

function buscarPorNome(nome) {
  return produtos.find(function (p) {
    return p.nome === nome;
  });
}

console.log("Atualização de Estoque:");
atualizarEstoque(1, 20);
console.log("Filtragem por faixa de preço:");
filtrarProdutoPreco(5, 30);
console.log("Lista de produtos:");
console.log(listar());
console.log("Produto desejado:");
console.log(buscarPorNome("Xampu"));

//CARRINHO

const carrinho = [
  { produtoId: 1, quantidade: 2 },
  { produtoId: 2, quantidade: 1 },
  { produtoId: 3, quantidade: 1 },
];

function adicionar(carrinho, produtoId, qtd) {
  if (carrinho.length === 0) {
    carrinho.push({ produtoId: produtoId, quantidade: qtd });
    return;
  }

  for (let item of carrinho) {
    if (item.produtoId === produtoId) {
      item.qtd += qtd;
      return;
    }
  }

  carrinho.push({ produtoId: produtoId, quantidade: qtd });
}

function remover(carrinho, produtoId) {
  if (carrinho.length === 0) {
    return;
  }
  const index = carrinho.findIndex((item) => item.produtoId === produtoId);
  if (index !== -1) {
    carrinho.splice(index, 1);
  }
}

function alterarQuantidade(carrinho, produtoId, novaQtd) {
  if (novaQtd < 1) {
    return carrinho.filter((item) => item.produtoId !== produtoId);
  }

  const item = produtos.find((item) => item.id === produtoId);

  if (!item) {
    if (novaQtd > item.estoque) {
      console.log(
        `Quantidade solicitada para ${item.nome} excede o estoque disponível.`
      );
      return carrinho;
    }
    return carrinho.map((item) => {
      if (item.produtoId === produtoId) {
        return { ...item, quantidade: novaQtd };
      }
      return item;
    });
  }
}

function calcularTotal(carrinho) {
  return carrinho.reduce((total, item) => {
    const produto = produtos.find((prod) => prod.id === item.produtoId);
    return total + produto.preco * item.quantidade;
  }, 0);
}

//EXTRA
function ordenarProdutosPorPreco(produtos) {
  return [...produtos].sort((produtoA, produtoB) => {
    return produtoA.preco - produtoB.preco;
  });
}

console.log("Carrinho original:", carrinho);
console.log("Total original: R$", calcularTotal(carrinho).toFixed(2));
let produtosOrdenados = ordenarProdutosPorPreco(produtos);
console.log("Produtos ordenados por preço:", produtosOrdenados);
