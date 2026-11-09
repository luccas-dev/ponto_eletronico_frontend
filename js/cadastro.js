const nomeFantasia = document.querySelector('#nome_fantasia')
const cnpj = document.querySelector('#cnpj')
const email = document.querySelector('#email')
const telefone = document.querySelector('#telefone')

const nomeAdmin = document.querySelector('#nome')
const sobrenomeAdmin = document.querySelector('#sobrenome')
const cpf = document.querySelector('#cpf')
const password = document.querySelector('#password')

const btnCadastro = document.querySelector('#btn-cadastrar')

const tokenCadastro = localStorage.getItem('token_nexponto')

btnCadastro.addEventListener('click', async (event) => {
    event.preventDefault()
    
    const dadosFormulario = {
        nome_fantasia: nomeFantasia.value,
        cnpj: cnpj.value,
        nome_admin: nomeAdmin.value,
        sobrenome_admin: sobrenomeAdmin.value,
        senha: password.value,
        cpf: cpf.value,
        email: email.value,
        telefone: telefone.value
    }

    try {
        const response = await fetch('http://localhost:3050/empresas/hyperAdmin-cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenCadastro}`
            },
            body: JSON.stringify(dadosFormulario)
        })
        const data = await response.json()
        console.log(data)

        if(response.ok) window.location.reload()
    } catch(erro) {
        console.error(erro)
    }
})