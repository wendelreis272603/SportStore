// Sistema de autenticação fake usando localStorage

// Função para criar conta
export function criarConta(nome, email, senha) {
    // Verificar se o email já existe
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    if (usuarios.find(u => u.email === email)) {
        return {
            sucesso: false,
            mensagem: 'Este email já está cadastrado.'
        };
    }
    
    // Criar novo usuário
    const novoUsuario = {
        id: Date.now().toString(),
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha: senha, // Em produção, isso deveria ser hash
        dataCadastro: new Date().toISOString()
    };
    
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    // Fazer login automático
    localStorage.setItem('usuarioLogado', JSON.stringify({
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email
    }));
    
    return {
        sucesso: true,
        mensagem: 'Conta criada com sucesso! Redirecionando...',
        usuario: novoUsuario
    };
}

// Função para fazer login
export function fazerLogin(email, senha) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => 
        u.email === email.trim().toLowerCase() && u.senha === senha
    );
    
    if (!usuario) {
        return {
            sucesso: false,
            mensagem: 'Email ou senha incorretos.'
        };
    }
    
    // Salvar usuário logado
    localStorage.setItem('usuarioLogado', JSON.stringify({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
    }));
    
    return {
        sucesso: true,
        mensagem: 'Login realizado com sucesso! Redirecionando...',
        usuario: usuario
    };
}

// Função para fazer logout
export function fazerLogout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

// Função para verificar se está logado
export function estaLogado() {
    return localStorage.getItem('usuarioLogado') !== null;
}

// Função para obter usuário logado
export function obterUsuarioLogado() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    return usuarioLogado ? JSON.parse(usuarioLogado) : null;
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Só executar se estiver na página de login
    if (!window.location.pathname.includes('login.html')) {
        return;
    }
    
    // Tabs de login/cadastro
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Atualizar tabs
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Mostrar/ocultar formulários
            if (targetTab === 'login') {
                loginForm.classList.add('active');
                signupForm.classList.remove('active');
            } else {
                loginForm.classList.remove('active');
                signupForm.classList.add('active');
            }
            
            // Limpar mensagens
            document.getElementById('loginMessage').textContent = '';
            document.getElementById('signupMessage').textContent = '';
        });
    });
    
    // Formulário de login
    const loginFormElement = document.getElementById('loginFormElement');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const senha = document.getElementById('loginPassword').value;
            const messageDiv = document.getElementById('loginMessage');
            
            const resultado = fazerLogin(email, senha);
            
            messageDiv.textContent = resultado.mensagem;
            messageDiv.className = 'auth-message ' + (resultado.sucesso ? 'success' : 'error');
            
            if (resultado.sucesso) {
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }
    
    // Formulário de cadastro
    const signupFormElement = document.getElementById('signupFormElement');
    if (signupFormElement) {
        signupFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const senha = document.getElementById('signupPassword').value;
            const confirmarSenha = document.getElementById('signupConfirmPassword').value;
            const messageDiv = document.getElementById('signupMessage');
            
            // Validações
            if (senha.length < 6) {
                messageDiv.textContent = 'A senha deve ter no mínimo 6 caracteres.';
                messageDiv.className = 'auth-message error';
                return;
            }
            
            if (senha !== confirmarSenha) {
                messageDiv.textContent = 'As senhas não coincidem.';
                messageDiv.className = 'auth-message error';
                return;
            }
            
            const resultado = criarConta(nome, email, senha);
            
            messageDiv.textContent = resultado.mensagem;
            messageDiv.className = 'auth-message ' + (resultado.sucesso ? 'success' : 'error');
            
            if (resultado.sucesso) {
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }
    
    // Se já estiver logado, redirecionar
    if (estaLogado() && window.location.pathname.includes('login.html')) {
        // Opcional: pode manter na página ou redirecionar
    }
});

