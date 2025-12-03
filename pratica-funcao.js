const produtos = [
  { id: 1, nome: "Sabonete", preco: 3.5, estoque: 10 },
  { id: 2, nome: "Xampu", preco: 12.0, estoque: 5 },
  { id: 3, nome: "Máscara", preco: 25.0, estoque: 2 },
];

const mapaProdutos = new Map();
produtos.forEach(p => mapaProdutos.set(p.id, p));

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
    const item = mapaProdutos.get(produtoId);
    
    if (!item) {
        throw new Error('Produto não encontrado');
    }

    if (novaQtd < 1 || novaQtd > item.estoque) {
        throw new Error('Nova quantidade inválida');
    }

    return carrinho.map((item) => {
    if (item.produtoId === produtoId) {
        return { ...item, quantidade: novaQtd };
    }
    return item;
    });
    
}

function calcularTotal(carrinho) {
  return carrinho.reduce((total, item) => {
    const produto = mapaProdutos.get(item.produtoId);
    return total + produto.preco * item.quantidade;
  }, 0);
}

function contarQuantidadeDeItens(carrinho) {
  return carrinho.reduce((qtd, item) => {
    return qtd + item.quantidade;
  }, 0);
}

console.log("Carrinho:", carrinho);
console.log("Total: R$", calcularTotal(carrinho).toFixed(2));

try {    
    const carrinhoAtualizado = alterarQuantidade(carrinho, 1, 5);
    console.log(carrinhoAtualizado);
} catch (error) {
    console.error('Erro ao alterar quantidade:', error.message);
}

//EXTRAS

//----ORDENAR POR PREÇO----
function ordenarProdutosPorPreco(produtos) {
  return [...produtos].sort((produtoA, produtoB) => {
    return produtoA.preco - produtoB.preco;
  });
}

let produtosOrdenados = ordenarProdutosPorPreco(produtos);
console.log("Produtos ordenados por preço:", produtosOrdenados);

//----HISTORICO----

const carrinho1 = [
  { produtoId: 1, quantidade: 2 },
  { produtoId: 2, quantidade: 1 },
  { produtoId: 3, quantidade: 1 },
];

const carrinho2 = [
    {produtoId: 1, quantidade: 3},
    {produtoId: 2, quantidade: 2}
];

const carrinho3 = [
    {produtoId: 2, quantidade: 1},
    {produtoId: 3, quantidade: 1}   
];

const historico = new Map();
historico.set(1, { total: calcularTotal(carrinho1), itens: contarQuantidadeDeItens(carrinho1) });
historico.set(2, { total: calcularTotal(carrinho2), itens: contarQuantidadeDeItens(carrinho2) });
historico.set(3, { total: calcularTotal(carrinho3), itens: contarQuantidadeDeItens(carrinho3) });

console.log('Histórico de Pedidos:');
console.log(historico)

