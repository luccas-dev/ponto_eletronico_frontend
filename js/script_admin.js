const userName = document.querySelector('#nome')
const lastnameUser = document.querySelector('#sobrenome')
const userCPF = document.querySelector('#cpf')
const userPassword = document.querySelector('#password')

const btnNewUser = document.querySelector('#btn-new-user')

const tokenCadastro = localStorage.getItem('token_nexponto')
const tokenDados = JSON.parse(atob(tokenCadastro.split('.')[1]))

// SECTIONS
const userSection = document.querySelector('#users')

btnNewUser.addEventListener('click', async (event) => {
    event.preventDefault()
    
    const userData = {
        empresa: tokenDados.empresa_id,
        nome: userName.value,
        sobrenome: lastnameUser.value,
        senha: userPassword.value,
        cpf: userCPF.value
    }

    try {
        const response = await fetch('http://localhost:3050/usuarios/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenCadastro}`
            },
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        console.log(data)
        
        if(response.ok) window.location.reload()
        
    } catch(erro) {
        console.error(erro)
    }
})


if(window.getComputedStyle(userSection).display != 'none') {
    listUsers()
}

async function listUsers() {
    const idEmpresa = tokenDados.empresa_id

    const response = await fetch(`http://localhost:3050/usuarios/listar/${idEmpresa}`, {
        headers: {
            'Authorization': `Bearer ${tokenCadastro}`
        }
    })
    const data = await response.json()

    for(let user of data[0]) {
        const userContainer = document.createElement('div')
        userContainer.id = 'userContainer'

        const userFullName = document.createElement('span')
        userFullName.innerText = `${user.nome} ${user.sobrenome}`
        userFullName.id = 'userFullname'

        const userPosition = document.createElement('span')
        userPosition.innerText = user.cargo
        userPosition.id = 'userCargo'

        const userStatus = document.createElement('span')
        userStatus.innerText = user.status
        userSection.id = 'userStatus'

        const buttonDelete = document.createElement('button')
        buttonDelete.innerText = 'Excluir/Desativar'
        buttonDelete.id = 'btnDelete'
        buttonDelete.classList.add('btn')

        const buttonEdit = document.createElement('button')
        buttonEdit.innerText = 'Editar'
        buttonEdit.id = 'btnEdit'
        buttonEdit.classList.add('btn')

        userContainer.appendChild(userFullName)
        userContainer.appendChild(userPosition)
        userContainer.appendChild(userStatus)
        userContainer.appendChild(buttonEdit)
        userContainer.appendChild(buttonDelete)

        /*
            DIAS/HORAS TRABALHADOS(AS)
            HORAS NEGATIVAS
            HORAS EXTRAS
            HORAS TOTAIS
        */

        userSection.appendChild(userContainer)
    }
}