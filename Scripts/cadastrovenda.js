const produtos = [
    { id: 1, nome: 'Produto A', preco: 50 },
    { id: 2, nome: 'Produto B', preco: 100 },
    { id: 3, nome: 'Produto C', preco: 200 },
];

const searchProduto = document.getElementById('search-produto');
const produtoLista = document.getElementById('search-results');
const precoInput = document.getElementById('preco');
const dataInput = document.getElementById('data');
const adicionarProdutoBtn = document.getElementById('adicionar-produto');
const produtosAdicionados = document.getElementById('produtos-adicionados');
const totalVenda = document.getElementById('total-venda');
const formVenda = document.getElementById('form-nova-venda');
const registrarVendaBtn = document.getElementById('registrar-venda');

let produtosSelecionados = [];
const hoje = new Date().toISOString().split('T')[0];
dataInput.value = hoje;

searchProduto.addEventListener('input', () => {
    const query = searchProduto.value.toLowerCase();
    produtoLista.innerHTML = '';

    const produtosFiltrados = produtos.filter(produto => 
        produto.nome.toLowerCase().includes(query)
    );

    produtosFiltrados.forEach(produto => {
        const li = document.createElement('li');
        li.textContent = produto.nome;
        li.dataset.id = produto.id;
        li.dataset.preco = produto.preco;
        produtoLista.appendChild(li);
    });

    produtoLista.style.display = produtosFiltrados.length > 0 ? 'block' : 'none';
});

produtoLista.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        searchProduto.value = event.target.textContent;
        precoInput.value = event.target.dataset.preco;
        produtoLista.style.display = 'none';
    }
});

adicionarProdutoBtn.addEventListener('click', () => {
    const nomeProduto = searchProduto.value;
    const precoProduto = parseFloat(precoInput.value);
    const quantidadeProduto = parseInt(document.getElementById('quantidade').value);

    if (!nomeProduto || !quantidadeProduto || isNaN(precoProduto)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const produto = { nome: nomeProduto, preco: precoProduto, quantidade: quantidadeProduto, total: precoProduto * quantidadeProduto };
    produtosSelecionados.push(produto);

    const li = document.createElement('li');
    li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Total: R$ ${produto.total.toFixed(2)}`;
    produtosAdicionados.appendChild(li);

    const total = produtosSelecionados.reduce((sum, p) => sum + p.total, 0);
    totalVenda.textContent = total.toFixed(2);

    searchProduto.value = '';
    precoInput.value = '';
    document.getElementById('quantidade').value = '';
});

registrarVendaBtn.addEventListener('click', () => {
    if (produtosSelecionados.length === 0) {
        alert('Por favor, adicione pelo menos um produto à venda.');
        return;
    }

    alert('Venda registrada com sucesso!');
    formVenda.reset();
    produtosSelecionados = [];
    produtosAdicionados.innerHTML = '';
    totalVenda.textContent = '0.00';
});

document.addEventListener('click', function(event) {
    // Verificar se o clique foi fora da div
    if (!produtoLista.contains(event.target)) {
      produtoLista.style.display = 'none';
    }
  });