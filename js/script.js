

// funcoes auxiliares e uteis

const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const preencherDadosDosMilkshakes = (milkshakeItem, item, index) => {
    milkshakeItem.setAttribute('data-key', index)
    milkshakeItem.querySelector('.milk-item--img img').src = item.img
    milkshakeItem.querySelector('.milk-item--price').innerHTML = item.price
    milkshakeItem.querySelector('.milk-item--name').innerHTML = item.name
    milkshakeItem.querySelector('.milk-item--desc').innerHTML = item.description
}

// Mapear os Milkshakes

MilkshakeJson.map((item, index) => {
    console.log(item)

    let milkshakeItem = document.querySelector('.models .milk-item').cloneNode(true) // cloneNode faz uma copia dos elementos

    // agora que foi clonado precisamos colocar na main e fazer aparecer na tela
    seleciona('.milkshake-area').append(milkshakeItem)

    //hora de preencher os dados de cada milkshake
    preencherDadosDosMilkshakes(milkshakeItem, item, index)
})