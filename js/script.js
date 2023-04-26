// criar a variavel modalkey sera global
let modalKey = 0
let cart = []

// variavel para controlar a quantidade inicial de pizzas no modal
let qtMilkshake = 1
let qtCascao = 1
let qtKids = 1

// funcoes auxiliares e uteis

const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

// converter para real

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if (valor) {
        return valor.Tofixed(2)
    }
}

// Adicionar no carrinho

const adicionarNoCarrinho = () => {
    seleciona('.milkshakeInfo--addButton').addEventListener('click', () => {
        console.log('Adicionei')

    // pegar dados da janela modal atual
    // Qual produto?? pegue a key com modalkey
    if(modalKey == null) {alert('Modal nula')}

    // tamanho 
    let size = seleciona('.milkshakeInfo--size.selected').getAttribute('data-key')
    console.log("Tamanho " + size)

    // Quantidade
    console.log("Quant. " + qtMilkshake)

    // preco
    let price = seleciona('.milkshakeInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
    console.log(price)

    // precisamos criar um identificador agora que junte id e tamanho 
    let identificador =  produtosJson[modalKey].id+'t'+size

    // antes de adicionar precisamos verificar se ja tem aquele codigo e tamanho
    // para adicionarmos a quantidade
    let key = cart.findIndex((item) => item.identificador == identificador)
    console.log(key)

    if (key > -1) {
        // se encontrar aumente a quantidade
        cart[key].qt += qtMilkshake
    } else {
        // adicionar o produto no carrinho
        let produto = {
            identificador,
            id: produtosJson[modalKey].id,
            size,
            qt: qtMilkshake,
            price: price
        }
        cart.push(produto) // manda o produto pro carrinho
        console.log(produto)
        console.log('Sub total R$ ' + (produto.qt * produto.price).toFixed(2))
    }
    fecharModal()
    abrirCarrinho()
    fecharCarrinho()
    finalizarCompra()
    })
}

// Abrir o carrinho 

const abrirCarrinho = () => {
    console.log('Quantidade de itens do carrinho ' + cart.length)
    if(cart.length > 0) {
        //mostrar o carrinho
        seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex'
    }

    // exibir o carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.lenght > 0) {
            seleciona('aside').style.left = '0'
        }
    })
}

// fechar carrinho

const fecharCarrinho = () => {
    // fechar o carrinho com o botao X no mobile 
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' // usando 100vw ele ficara fora da tela
        seleciona('header').style.display = 'flex'
    })
}

// Finalizar compra 

const finalizarCompra = () => {
    // fechar o carrinho em um aparelho que nao seja mobile
    seleciona('.cart--finalizar').addEventListener('click', () => {
        seleciona('aside').classList.remove('show')
        console.log('Finalizei')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}

// Para abrir o modal

const abrirModal = () => {
    seleciona('.milkshakeWindowArea').style.opacity = 0
    seleciona('.milkshakeWindowArea').style.display = 'flex'
    setTimeout(() => { seleciona('.milkshakeWindowArea').style.opacity = 1 }, 150)
}

// Para fechar o modal 

const fecharModal = () => {
    seleciona('.milkshakeWindowArea').style.opacity = 0
    setTimeout(() => {
        seleciona('.milkshakeWindowArea').style.display = 'none'
    }, 500)
}

const botoesFechar = () => {
    selecionaTodos('.milkshakeInfo--cancelMobileButton, .milkshakeInfo--cancelButton').forEach((item) => {
        item.addEventListener('click', fecharModal)
    })
}

const pegarKey = (e) => {
    let key = e.target.closest('.milk-item').getAttribute('data-key')
    console.log('Milkshake Clicado ' + key)
    console.log(produtosJson[key])

    // garantir que a quantidade inicial de milkshakes é 1 
    qtMilkshakes = 1

    //para manter a informação de qual milkshake foi clicado
    modalKey = key

    return key
}

const preencherDadosDoItem = (itemElement, item, index) => {
    itemElement.setAttribute('data-key', index)
    itemElement.querySelector('.milk-item--id').value = index
    itemElement.querySelector('.milk-item--img img').src = item.img
    itemElement.querySelector('.milk-item--price').innerHTML = formatoReal(item.price[2])
    itemElement.querySelector('.milk-item--name').innerHTML = item.name
    itemElement.querySelector('.milk-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    let id = seleciona('.milkshakeInfo--id').innerHTML = item.id - 1
    seleciona('.milkshakeBig img').src = item.img
    seleciona('.milkshakeInfo h1').innerHTML = item.name
    seleciona('.milkshakeInfo--actualPrice').innerHTML = formatoReal(item.price[2])
    seleciona('.milkshakeInfo--desc').innerHTML = item.description
    return id
}


const mudarQuantidade = () => {
    // Ações nos botões + - da janela modal
    seleciona('.milkshakeInfo--qtmais').addEventListener('click', () => {
        qtMilkshake++
        seleciona('.milkshakeInfo--qt').innerHTML = qtMilkshake
    })

    seleciona('.milkshake--qtmenos').addEventListener('click', () => {
        if (qtMilkshake > 1) {
            qtMilkshake--
            seleciona('.milkshakeInfo--qt').innerHTML = qtMilkshake
        }
    })
}

// Mapear os Milkshakes
//const milkshakes = produtosJson.filter((produto) => produto.type === "Milkshake")
//console.log(milkshakes)
produtosJson.map((item, index) => {
    //console.log(item)

    let milkshakeItem = document.querySelector('.models .milk-item').cloneNode(true) // cloneNode faz uma copia dos elementos
    let cascaoItem = document.querySelector('.models .milk-item').cloneNode(true) // cloneNode faz uma copia dos elementos
    let kidsItem = document.querySelector('.models .milk-item').cloneNode(true) // cloneNode faz uma copia dos elementos

    if (item.type === "Milkshake") {
        // agora que foi clonado precisamos colocar na main e fazer aparecer na tela
        seleciona('.milkshake-area').append(milkshakeItem)

        //hora de preencher os dados de cada milkshake
        preencherDadosDoItem(milkshakeItem, item, index)

        // agora queremos saber se o milkshake foi clicado
        milkshakeItem.querySelector('.milk-item a').addEventListener('click', (e) => {
            e.preventDefault() // faz o a (link) nao fazer o padrao que é dar refresh
            console.log('Clicou no milkshake')

            let chave = pegarKey(e)

            //mudar a quantidade 
            mudarQuantidade()

            // quando clicar em um milkshake a janela modal abre
            abrirModal()

            // quando clicar em algum botão para cancelar fecha o modal
            botoesFechar()

            // preencher os dados dos vetores no modal 
            preencheDadosModal(item)

        })
    }

    if (item.type === "Cascao") {
        // agora que foi clonado vamos colocar na main visualmente
        seleciona('.cascao-area').append(cascaoItem)

        // agora que ja está aparecendo visualmente simbora preencher os dados de acordo com o script
        preencherDadosDoItem(cascaoItem, item, index)

        // agora queremos saber se o cascao foi clicado
        cascaoItem.querySelector('.milk-item a').addEventListener('click', (e) => {
            e.preventDefault()  // faz com que o link não faça o padrão que seria dar o refresh
            console.log('Clicou no cascão')

            let chave = pegarKey(e)
            
            //mudar a quantidade 
            mudarQuantidade()

            // Para abrir o modal quando for clicado em algum cascão
            abrirModal()

            // para fechar o modal quando for clicado em algum botao de cancelar/voltar
            botoesFechar()

            // preencher os dados dos vetores no modal 
            preencheDadosModal(item)

        })
    }

    if (item.type === "Kids") {
        // depois de clonado tem que aparecer na tela né?
        seleciona('.kids-area').append(kidsItem)

        // e agora preencher os dados no que foi clonado
        preencherDadosDoItem(kidsItem, item, index)

        // agora precisamos saber se algum produto da area kids foi clicado
        kidsItem.querySelector('.milk-item a').addEventListener('click', (e) => {
            e.preventDefault() // faz com que não faça o padrao que no caso do a seria dar refresh
            console.log('Clicou em algum produto da area kids')

            let chave = pegarKey(e)

            //mudar a quantidade 
            mudarQuantidade()

            // Para abrir o modal quando for clicado em algum cascão
            abrirModal()

            // para fechar o modal quando for clicado em algum botao de cancelar/voltar
            botoesFechar()

            // preencher os dados dos vetores no modal 
            preencheDadosModal(item)

        })
    }
})

/*const preencherTamanhos = (key) => {
    // ações no tamanho botão e seleciona o grande
    seleciona('.milkshakeInfo--size.selected').classList.remove('selected')

    // selecionar todos os tamanhos
    selecionaTodos('milkshakeInfo--size').forEach((size, sizeIndex) => {
        // selecionar o tamanho grande
        (sizeIndex == 2) ? size.classList.add('selected') : ''
       // size.querySelector('span').innerHTML = produtosJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    // Ações nos botões de tamanho
    // Selecionar todos os tamanhos
    selecionaTodos('.milkshakeInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            // clicou em um item tira a seleção do padrao e seleciona o que voce clicou
            seleciona('.milkshakeInfo--size.selected').classList.remove('selected')

            // marcar o que voce clicou, ao inves de usar e.target use size
            size.classList.add('selected')

            // mudar o preco de acordo com o tamanho
            seleciona('.milkshakeInfo--actualPrice').innerHTML = formatoReal(produtosJson[key].price[sizeIndex])
        })
    })
} 
*/

// Carrinho
adicionarNoCarrinho()
abrirCarrinho()
fecharCarrinho()
finalizarCompra()

