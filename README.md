# 🏃 SportStore - App de Vendas de Roupas Esportivas

Aplicativo web moderno e responsivo para venda de roupas esportivas, desenvolvido com HTML5, CSS3 e JavaScript Vanilla (ES6+).

## 📋 Características

- ✅ Design moderno e minimalista
- ✅ Totalmente responsivo (mobile, tablet e desktop)
- ✅ Sistema de busca de produtos
- ✅ Navegação por categorias
- ✅ Página de detalhes do produto
- ✅ Carrinho de compras funcional
- ✅ Sistema de login/cadastro (localStorage)
- ✅ Página de promoções
- ✅ Animações suaves e transições
- ✅ Header e Footer reutilizáveis

## 🚀 Como Usar

### Opção 1: Abrir diretamente no navegador

1. Clone ou baixe este repositório
2. Abra o arquivo `public/index.html` no seu navegador
3. Pronto! O app estará funcionando

### Opção 2: Usar um servidor local (recomendado)

Para evitar problemas com módulos ES6, é recomendado usar um servidor local:

#### Com Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Com Node.js (http-server):
```bash
npm install -g http-server
http-server
```

#### Com PHP:
```bash
php -S localhost:8000
```

Depois, acesse `http://localhost:8000/public/` no navegador.

## 📁 Estrutura de Arquivos

```
├── public/
│   ├── index.html          # Página inicial
│   ├── categorias.html     # Lista de produtos por categoria
│   ├── produto.html        # Detalhes do produto
│   ├── carrinho.html       # Carrinho de compras
│   ├── login.html          # Login e cadastro
│   └── promocoes.html      # Página de promoções
├── css/
│   └── style.css           # Estilos principais
├── js/
│   ├── dados.js            # Dados mockados dos produtos
│   ├── main.js             # Navegação e busca
│   ├── auth.js             # Autenticação (localStorage)
│   └── carrinho.js         # Funcionalidades do carrinho
└── README.md
```

## 🎨 Categorias Disponíveis

- 👕 Camisas
- 🩳 Shorts
- 🧦 Meias
- 👟 Tênis
- 🧢 Bonés
- 🎀 Faixas
- 🧥 Jaquetas
- 🧥 Casacos
- 👔 Moletons
- 🧶 Toucas

## 🔑 Funcionalidades Principais

### Sistema de Busca
- Busca por nome, categoria ou descrição do produto
- Resultados em tempo real

### Carrinho de Compras
- Adicionar/remover produtos
- Ajustar quantidades
- Calcular frete automático (grátis acima de R$ 200)
- Persistência no localStorage

### Autenticação
- Criar conta
- Fazer login
- Sistema fake usando localStorage
- Validação básica de formulários

### Produtos
- 20 produtos mockados
- Imagens via Unsplash
- Preços e descontos
- Seleção de tamanhos e cores
- Descrições completas

## 🎯 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Flexbox, Grid, animações, responsividade
- **JavaScript ES6+**: Módulos, classes, async/await
- **Fontes**: Google Fonts (Inter)
- **Ícones**: Emojis nativos

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona perfeitamente em:
- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1440px+)

## 💾 Armazenamento

O app utiliza `localStorage` do navegador para:
- Salvar produtos no carrinho
- Salvar dados de usuários cadastrados
- Manter sessão do usuário logado

## 🔧 Personalização

### Cores
Edite as variáveis CSS em `css/style.css`:
```css
:root {
    --primary-color: #4A90E2;    /* Cor principal */
    --secondary-color: #50C878;  /* Cor secundária */
    --text-dark: #2C3E50;        /* Texto escuro */
    /* ... */
}
```

### Produtos
Adicione ou modifique produtos em `js/dados.js`:
```javascript
{
    id: '21',
    nome: 'Novo Produto',
    categoria: 'camisas',
    preco: 99.90,
    // ...
}
```

## 📝 Notas

- As imagens são carregadas do Unsplash. Se houver problemas de conexão, um placeholder será exibido.
- O sistema de autenticação é apenas uma simulação. Não há validação real de segurança.
- Os dados são armazenados apenas no navegador (localStorage). Ao limpar os dados do navegador, tudo será perdido.

## 🎨 Design

- **Cores**: Tons neutros (cinza, branco, preto) com destaque em azul
- **Tipografia**: Inter (Google Fonts)
- **Layout**: Minimalista e organizado
- **Animações**: Transições suaves e fade-in

## 🚧 Melhorias Futuras (Sugestões)

- [ ] Modo escuro
- [ ] Sistema de favoritos (wishlist)
- [ ] Avaliações de produtos
- [ ] Animações de entrada ao rolar a página
- [ ] Loading skeletons
- [ ] Sistema de notificações
- [ ] Filtros avançados (marca, tipo, tecido)
- [ ] Histórico de pedidos
- [ ] Pagamento integrado

## 📄 Licença

Este projeto foi desenvolvido como exemplo educacional.

## 👨‍💻 Autor

Desenvolvido conforme especificações do PRD fornecido.

---

**Enjoy! 🎉**

