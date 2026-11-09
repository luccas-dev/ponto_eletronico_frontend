const cpfLogin = document.querySelector('#cpf_login')
const passwordLogin = document.querySelector('#password_login')

const btnLogin = document.querySelector('#btn-login')

btnLogin.addEventListener('click', async (event) => {
    event.preventDefault()

    const dadosLogin = {
        cpf: cpfLogin.value,
        senha: passwordLogin.value
    }
    
    try {
        const response = await fetch('http://localhost:3050/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosLogin)
        })

        const data = await response.json()

        if(response.ok) {
            localStorage.setItem('token_nexponto', data.token)

            if(data.cargo === 'admin') {
                window.location.href = 'index_admin.html'
            } else if(data.cargo === 'hyper_admin') {
                window.location.href = 'cadastro_empresas.html'
            } else {
                window.location.href = 'index_funcionario.html'
            }
        }
    } catch(erro) {
        console.error(erro)
    }
})