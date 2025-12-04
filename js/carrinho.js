import { produtos } from './dados.js';

// Função para obter carrinho do localStorage
function obterCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho') || '[]');
}

// Função para salvar carrinho no localStorage
function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Função para atualizar contador do carrinho no header
export function atualizarContadorCarrinho() {
    const carrinho = obterCarrinho();
    const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = totalItens;
        el.style.display = totalItens > 0 ? 'flex' : 'none';
    });
}

// Função para adicionar produto ao carrinho
export function adicionarAoCarrinho(productId, tamanho = null, cor = null) {
    const produto = produtos.find(p => p.id === productId);
    if (!produto) return;
    
    const carrinho = obterCarrinho();
    const precoFinal = produto.desconto 
        ? produto.preco * (1 - produto.desconto / 100)
        : produto.preco;
    
    // Verificar se o produto já está no carrinho
    const itemExistente = carrinho.find(item => 
        item.id === productId && 
        item.tamanho === tamanho && 
        item.cor === cor
    );
    
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: productId,
            nome: produto.nome,
            preco: precoFinal,
            precoOriginal: produto.preco,
            desconto: produto.desconto || 0,
            imagem: produto.imagem,
            tamanho: tamanho,
            cor: cor,
            quantidade: 1
        });
    }
    
    salvarCarrinho(carrinho);
    atualizarContadorCarrinho();
    
    // Feedback visual (opcional)
    mostrarNotificacao('Produto adicionado ao carrinho!');
}

// Função para remover item do carrinho
export function removerDoCarrinho(index) {
    const carrinho = obterCarrinho();
    carrinho.splice(index, 1);
    salvarCarrinho(carrinho);
    atualizarContadorCarrinho();
    renderizarCarrinho();
}

// Função para atualizar quantidade
export function atualizarQuantidade(index, novaQuantidade) {
    if (novaQuantidade < 1) {
        removerDoCarrinho(index);
        return;
    }
    
    const carrinho = obterCarrinho();
    carrinho[index].quantidade = novaQuantidade;
    salvarCarrinho(carrinho);
    atualizarContadorCarrinho();
    renderizarCarrinho();
}

// Função para renderizar carrinho
export function renderizarCarrinho() {
    const carrinho = obterCarrinho();
    const cartItems = document.getElementById('cartItems');
    
    if (!cartItems) return;
    
    if (carrinho.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Seu carrinho está vazio</h2>
                <p>Adicione produtos ao carrinho para continuar comprando.</p>
                <a href="index.html" class="btn-primary">Continuar Comprando</a>
            </div>
        `;
        atualizarResumoCarrinho();
        return;
    }
    
    cartItems.innerHTML = carrinho.map((item, index) => {
        const detalhes = [];
        if (item.tamanho) detalhes.push(`Tamanho: ${item.tamanho}`);
        if (item.cor) detalhes.push(`Cor: ${item.cor}`);
        
        return `
            <div class="cart-item">
                <img src="${item.imagem}" alt="${item.nome}" class="cart-item-image"
                     onerror="this.src='https://via.placeholder.com/400x400?text=Produto'">
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.nome}</h3>
                    ${detalhes.length > 0 ? `<p class="cart-item-details">${detalhes.join(' • ')}</p>` : ''}
                    <p class="cart-item-price">R$ ${item.preco.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="window.atualizarQuantidade(${index}, ${item.quantidade - 1})">-</button>
                            <span class="quantity-value">${item.quantidade}</span>
                            <button class="quantity-btn" onclick="window.atualizarQuantidade(${index}, ${item.quantidade + 1})">+</button>
                        </div>
                        <button class="remove-btn" onclick="window.removerDoCarrinho(${index})">Remover</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    atualizarResumoCarrinho();
}

// Função para atualizar resumo do carrinho
function atualizarResumoCarrinho() {
    const carrinho = obterCarrinho();
    
    const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    const frete = subtotal > 200 ? 0 : 15.00;
    const total = subtotal + frete;
    
    const subtotalEl = document.getElementById('subtotal');
    const freteEl = document.getElementById('frete');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
    if (freteEl) freteEl.textContent = frete > 0 ? `R$ ${frete.toFixed(2)}` : 'Grátis';
    if (totalEl) totalEl.textContent = `R$ ${total.toFixed(2)}`;
}

// Função para finalizar compra
function finalizarCompra() {
    const carrinho = obterCarrinho();
    
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    // Verificar se está logado (opcional)
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    
    if (!usuarioLogado) {
        if (confirm('Você precisa estar logado para finalizar a compra. Deseja fazer login?')) {
            window.location.href = 'login.html';
        }
        return;
    }
    
    // Simular processamento
    const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    const frete = subtotal > 200 ? 0 : 15;
    const total = subtotal + frete;
    
    // Limpar carrinho
    localStorage.removeItem('carrinho');
    atualizarContadorCarrinho();
    
    // Mostrar mensagem de sucesso
    alert(`Compra finalizada com sucesso!\nTotal: R$ ${total.toFixed(2)}\n\nObrigado pela compra!`);
    
    // Redirecionar para home
    window.location.href = 'index.html';
}

// Função para mostrar notificação
function mostrarNotificacao(mensagem) {
    // Criar elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notificacao.textContent = mensagem;
    
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// Expor funções globalmente para uso inline nos HTMLs
window.atualizarQuantidade = function(index, quantidade) {
    atualizarQuantidade(index, quantidade);
};

window.removerDoCarrinho = function(index) {
    removerDoCarrinho(index);
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    atualizarContadorCarrinho();
    
    // Renderizar carrinho se estiver na página de carrinho
    if (window.location.pathname.includes('carrinho.html')) {
        renderizarCarrinho();
        
        // Botão de finalizar compra
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', finalizarCompra);
        }
    }
});

// Adicionar animação CSS para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

