# 🚀 Instruções Rápidas - SportStore

## Como executar o projeto

### Método 1: Servidor Python (Mais Simples)
```bash
# No terminal, navegue até a pasta do projeto e execute:
python -m http.server 8000
```
Depois acesse: `http://localhost:8000/public/`

### Método 2: Servidor PHP
```bash
php -S localhost:8000
```
Depois acesse: `http://localhost:8000/public/`

### Método 3: Abrir diretamente
- Abra o arquivo `public/index.html` no navegador
- ⚠️ **Atenção**: Alguns recursos podem não funcionar por limitações de módulos ES6

## ⚡ Funcionalidades Testadas

✅ Página inicial com banners e produtos em destaque
✅ Busca de produtos (funciona na página de categorias)
✅ Navegação por categorias
✅ Página de detalhes do produto
✅ Adicionar produtos ao carrinho
✅ Gerenciar carrinho (quantidade, remover)
✅ Login e cadastro de usuários
✅ Página de promoções

## 📝 Dados de Teste

### Criar uma conta:
- Email: qualquer email válido
- Senha: mínimo 6 caracteres

### Produtos disponíveis:
- 20 produtos em 10 categorias diferentes
- Produtos com e sem desconto
- Produtos marcados como "mais vendidos"

## 🔍 Notas Importantes

1. **Armazenamento Local**: Todos os dados (carrinho, usuários) são salvos no localStorage do navegador
2. **Imagens**: Carregadas do Unsplash. Se não carregarem, um placeholder será exibido
3. **Frete Grátis**: Acima de R$ 200,00
4. **Responsivo**: Teste em diferentes tamanhos de tela

## 🐛 Solução de Problemas

### Módulos ES6 não funcionam?
- Use um servidor local (métodos 1 ou 2 acima)
- Não abra o arquivo HTML diretamente pelo explorador de arquivos

### Carrinho não persiste?
- Verifique se o navegador permite localStorage
- Não limpe os dados do navegador

### Imagens não carregam?
- Verifique sua conexão com a internet
- Um placeholder será exibido automaticamente

## ✨ Próximos Passos

O projeto está completo e funcional! Você pode:
- Personalizar cores no CSS
- Adicionar mais produtos em `js/dados.js`
- Modificar textos e conteúdos
- Expandir funcionalidades

---

**Desenvolvido conforme PRD fornecido** 🎉

