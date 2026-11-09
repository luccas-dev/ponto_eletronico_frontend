const btnLogout = document.querySelector('#btn-logout')

const pontoContainer = document.querySelector('#punchInOut')

const mostrarUsuario = async () => {
    const tokenCadastro = localStorage.getItem('token_nexponto')
    const tokenDados = JSON.parse(atob(tokenCadastro.split('.')[1]))
    const userName = document.querySelector('#user-name')

    const idUsuario = tokenDados.id

    const response = await fetch(`http://localhost:3050/usuarios/logado/${idUsuario}`, {
        headers: {
            'Authorization': `Bearer ${tokenCadastro}`
        }
    })
    const [data] = await response.json()

    userName.innerText = `${data[0].nome} ${data[0].sobrenome}`
}

mostrarUsuario()

// FUNÇÃO PARA DESLOGAR O USUARIO
if(btnLogout) {
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('token_nexponto')
        window.location.href = 'login.html'
    })
}

if(window.getComputedStyle(pontoContainer).display != 'none') {
    const btnPunchInOut = document.querySelector('#btn-punchInOut')
    const tokenCadastro = localStorage.getItem('token_nexponto')

    btnPunchInOut.addEventListener('click', async () => {
        const tipos = document.querySelector('#tipo')
        let tipoSelected

        for(const tipo of tipos) {
            if(tipo.selected) {
                tipoSelected = tipo.value     
            }
        }

        const dadosPonto = {
            tipo: tipoSelected
        }
        console.log(dadosPonto)
        
        const response = await fetch('http://localhost:3050/ponto/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenCadastro}`
            },
            body: JSON.stringify(dadosPonto)
        })
        const data = await response.json()

        console.log(data)   
    })
}