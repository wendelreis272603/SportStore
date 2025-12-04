import { produtos } from './dados.js';

// Função para renderizar produtos em um grid
export function renderProducts(produtosArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (produtosArray.length === 0) {
        container.innerHTML = '<p class="no-products">Nenhum produto encontrado.</p>';
        return;
    }
    
    produtosArray.forEach(produto => {
        const precoFinal = produto.desconto 
            ? produto.preco * (1 - produto.desconto / 100)
            : produto.preco;
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Ícones/figurinhas baseados nas propriedades do produto
        let badges = '';
        if (produto.maisVendido) badges += '<span class="product-badge badge-bestseller"><i class="fas fa-trophy"></i> Mais Vendido</span>';
        if (produto.desconto && produto.desconto > 20) badges += '<span class="product-badge badge-hot"><i class="fas fa-fire"></i> Oferta</span>';
        if (produto.novo) badges += '<span class="product-badge badge-new"><i class="fas fa-star"></i> Novo</span>';
        
        productCard.innerHTML = `
            <div class="product-image-wrapper">
                ${badges}
                <img src="${produto.imagem}" alt="${produto.nome}" class="product-image" 
                     onerror="this.src='https://via.placeholder.com/400x400?text=Produto'">
            </div>
            <div class="product-info">
                <h3 class="product-name">
                    ${produto.icone ? `<i class="${produto.icone}"></i> ` : ''}${produto.nome}
                </h3>
                <div class="product-price">
                    ${produto.desconto ? `
                        <span class="old-price">R$ ${produto.preco.toFixed(2)}</span>
                        <span class="current-price">R$ ${precoFinal.toFixed(2)}</span>
                        <span class="discount-badge"><i class="fas fa-tag"></i> ${produto.desconto}% OFF</span>
                    ` : `
                        <span class="current-price">R$ ${produto.preco.toFixed(2)}</span>
                    `}
                </div>
                <a href="produto.html?id=${produto.id}" class="btn-primary"><i class="fas fa-eye"></i> Ver Detalhes</a>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Função de busca
export function buscarProdutos(termo) {
    if (!termo || termo.trim() === '') {
        return produtos;
    }
    
    const termoLower = termo.toLowerCase().trim();
    return produtos.filter(produto => 
        produto.nome.toLowerCase().includes(termoLower) ||
        produto.categoria.toLowerCase().includes(termoLower) ||
        produto.descricao.toLowerCase().includes(termoLower)
    );
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Sistema de busca
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    function executarBusca() {
        const termo = searchInput?.value || '';
        if (termo.trim() === '') return;
        
        const resultados = buscarProdutos(termo);
        
        // Se estiver na página de categorias, mostrar resultados lá
        if (window.location.pathname.includes('categorias.html')) {
            const productsGrid = document.getElementById('productsGrid');
            if (productsGrid) {
                renderProducts(resultados, 'productsGrid');
                document.getElementById('noProducts').style.display = 
                    resultados.length === 0 ? 'block' : 'none';
            }
        } else {
            // Redirecionar para página de categorias com busca
            window.location.href = `categorias.html?busca=${encodeURIComponent(termo)}`;
        }
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', executarBusca);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                executarBusca();
            }
        });
    }
    
    // Verificar busca na URL (para página de categorias)
    if (window.location.pathname.includes('categorias.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const busca = urlParams.get('busca');
        if (busca) {
            searchInput.value = busca;
            const resultados = buscarProdutos(busca);
            renderProducts(resultados, 'productsGrid');
            document.getElementById('noProducts').style.display = 
                resultados.length === 0 ? 'block' : 'none';
            
            // Atualizar título
            const categoryTitle = document.getElementById('categoryTitle');
            if (categoryTitle) {
                categoryTitle.textContent = `Resultados para: ${busca}`;
            }
        }
    }
    
    // Renderizar produtos na página inicial
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        // Promoções (apenas produtos com desconto)
        const produtosPromocao = produtos.filter(p => p.desconto && p.desconto > 0).slice(0, 4);
        renderProducts(produtosPromocao, 'promotionsGrid');
        
        // Mais vendidos
        const maisVendidos = produtos.filter(p => p.maisVendido).slice(0, 4);
        renderProducts(maisVendidos, 'bestsellersGrid');
    }
    
    // Atualizar estado do login
    atualizarEstadoLogin();
});

// Função para atualizar estado do login
function atualizarEstadoLogin() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const loginBtn = document.getElementById('loginBtn');
    
    if (usuarioLogado && loginBtn) {
        const usuario = JSON.parse(usuarioLogado);
        loginBtn.textContent = usuario.nome.split(' ')[0];
        loginBtn.href = '#'; // Opcional: link para perfil
    }
}

// Exportar para uso em outros módulos
export { atualizarEstadoLogin };

