const token = localStorage.getItem('token_nexponto')
const currentPage = window.location.pathname

if(!currentPage.includes('login.html') && !token) {
    window.location.href = 'login.html'
} else {
    const dadosUsuario = JSON.parse(atob(token.split('.')[1]))
    const cargo = dadosUsuario.cargo
    
    if(token) {
        const currentTime = Math.floor(Date.now() / 1000)

        if(dadosUsuario.exp && dadosUsuario.exp < currentTime) {
            alert("Sessão Expirada! Faça login novamente")
            localStorage.removeItem('token_nexponto')
            window.location.href = 'login.html'
        }
    }

    if(currentPage.includes('login.html')) {
        if(cargo === 'admin') window.location.href = 'index_admin.html'
        if(cargo === 'funcionario') window.location.href = 'index_funcionario.html'
        if(cargo === 'hyper_admin') window.location.href = 'cadastro_empresas.html'
    }

    if(currentPage.includes('admin.html') && cargo !== 'admin') {
        if(cargo === 'funcionario') window.location.href = 'index_funcionario.html'
        if(cargo === 'hyper_admin') window.location.href = 'cadastro_empresas.html'
    }

    if(currentPage.includes('index_funcionario.html') && cargo !== 'funcionario') {
        if(cargo === 'admin') window.location.href = 'index_admin.html'
        if(cargo === 'hyper_admin') window.location.href = 'cadastro_empresas.html'
    }

    if(currentPage.includes('cadastro_empresas.html') && cargo !== 'hyper_admin') {
        if(cargo === 'admin') window.location.href = 'index_admin.html'
        if(cargo === 'funcionario') window.location.href = 'index_funcionario.html'
    }
}