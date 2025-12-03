const produtos = [
  { id: 1, nome: "Sabonete", preco: 3.5, estoque: 10 },
  { id: 2, nome: "Xampu", preco: 12.0, estoque: 5 },
  { id: 3, nome: "Máscara", preco: 25.0, estoque: 2 },
];

const mapaProdutos = new Map();
produtos.forEach(p => mapaProdutos.set(p.id, p));

function listar() {
  return produtos;
}

function buscarPorNome(nome) {
  return produtos.find(function (p) {
    return p.nome === nome;
  });
}

console.log("Lista de produtos:");
console.log(listar());
console.log("Produto desejado:");
console.log(buscarPorNome("Xampu"));

function filtrarProdutoPreco(min, max) {
  let filtro = produtos.filter(
    (produto) => produto.preco >= min && produto.preco <= max
  );
  console.log(filtro);
}

function atualizarEstoque(id, delta) {
  // let produtof = produtos.find((produto) => produto.id == id);
  let produtof = mapaProdutos.get(id);
  produtof.estoque += delta;
  console.log(produtof);
}

console.log("Atualização de Estoque:");
atualizarEstoque(1, 20);
console.log("Filtragem por faixa de preço:");
filtrarProdutoPreco(5, 30);

//CARRINHO

const carrinho = [
  { produtoId: 1, quantidade: 2 },
  { produtoId: 2, quantidade: 1 },
  { produtoId: 3, quantidade: 1 },
];

const mapCarrinho = new Map();
carrinho.forEach((p) => mapCarrinho.set(p.produtoId, p));

function adicionar(mapCarrinho, produtoId, qtd) {
  const produtoNoEstoque = mapaProdutos.get(produtoId);

  try {
    if (qtd <= 0) {
      throw new Error(
        "Não é possível adicionar itens ao carrinho com quantidade zero ou negativa"
      );
    }
    if (!produtoNoEstoque) {
      throw new Error("Produto não existe em estoque");
    }
    if (qtd > produtoNoEstoque.estoque) {
      throw new Error(
        "Quantidade de produtos para inserção no carrinho excede a quantidade em estoque"
      );
    }
  } catch (error) {
    console.error(error.message);
    return;
  }

  if (mapCarrinho.size === 0) {
    mapCarrinho.set(produtoId, { produtoId: produtoId, quantidade: qtd });
      return;
  }

  const produtoNoCarrinho = mapCarrinho.get(produtoId);

  if (!produtoNoCarrinho) {
    mapCarrinho.set(produtoId, { produtoId: produtoId, quantidade: qtd });
    return;
  }

  const quantidadeTotal = produtoNoCarrinho.quantidade + qtd;

  try {
    if (quantidadeTotal > produtoNoEstoque.estoque) {
      throw new Error(
        "Quantidade de produtos para inserção no carrinho excede a quantidade em estoque"
      );
    }
    mapCarrinho.set(produtoId, {
      produtoId: produtoId,
      quantidade: quantidadeTotal,
    });
    return;
  } catch (error) {
    console.error(error.message);
    return;
  }
}

function remover(mapCarrinho, produtoId) {
  const protudoNoCarrinho = mapCarrinho.get(produtoId);
  try {
    if (mapCarrinho.size === 0) {
      throw new Error("Não é possível remover itens de um carrinho vazio.");
    }
    if (!protudoNoCarrinho) {
      throw new Error("Produto não encontrado no carrinho");
    }
  } catch (error) {
    console.error(error.message);
    return;
  }

  mapCarrinho.delete(produtoId);
}

function alterarQuantidade(carrinho, produtoId, novaQtd) {
    const item = mapaProdutos.get(produtoId);
    
    try{
      if (!item) {
        throw new Error('Produto não encontrado');
      }

      if (novaQtd < 1 || novaQtd > item.estoque) {
        throw new Error('Nova quantidade inválida');
      }
      carrinho.set(produtoId, { produtoId: produtoId, quantidade: novaQtd });
      return carrinho;
    }catch (error) {
      console.error('Erro ao alterar quantidade:', error.message);
      return;
    }
    
}

function calcularTotal(carrinho) {
  return Array.from(carrinho.values()).reduce((total, item) => {
    const produto = mapaProdutos.get(item.produtoId);
    return total + produto.preco * item.quantidade;
  }, 0);

}

function contarQuantidadeDeItens(carrinho) {
  return Array.from(carrinho.values()).reduce((qtd, item) => {
    return qtd + item.quantidade;
  }, 0);
}

console.log("Carrinho:", mapCarrinho);
console.log("Total: R$", calcularTotal(mapCarrinho).toFixed(2));

const carrinhoAtualizado = alterarQuantidade(mapCarrinho, 1, 5);
console.log(carrinhoAtualizado);


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

const carrinhoMap1 = new Map();
adicionar(carrinhoMap1, 1, 2);
adicionar(carrinhoMap1, 2, 1);
adicionar(carrinhoMap1, 3, 1);  

const carrinhoMap2 = new Map();
adicionar(carrinhoMap2, 1, 3);
adicionar(carrinhoMap2, 2, 2);

const carrinhoMap3 = new Map();
adicionar(carrinhoMap3, 2, 1);
adicionar(carrinhoMap3, 3, 1);

const historico = new Map();
historico.set(1, { total: calcularTotal(carrinhoMap1), itens: contarQuantidadeDeItens(carrinhoMap1) });
historico.set(2, { total: calcularTotal(carrinhoMap2), itens: contarQuantidadeDeItens(carrinhoMap2) });
historico.set(3, { total: calcularTotal(carrinhoMap3), itens: contarQuantidadeDeItens(carrinhoMap3) });

console.log('Histórico de Pedidos:');
console.log(historico)

//---- SORTEIO PROMO ----
function sorteioPromo(listaProdutos) {
  if (!Array.isArray(listaProdutos) || listaProdutos.length === 0) return null;
  const index = Math.floor(Math.random() * listaProdutos.length);
  return listaProdutos[index];
}

const produtoPromocao = sorteioPromo(produtos);
console.log("Produto em promoção:", produtoPromocao);