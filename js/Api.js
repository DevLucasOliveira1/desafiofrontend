document.addEventListener('DOMContentLoaded', () =>{
    const baseUrl = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products'
    const productsBox = document.querySelector('.selecao-box')
    const moreProducts = document.querySelector('.mostrarMais')

    fetchProducts = (url) =>{

        fetch(url).then(response => response.json()).then(data => {
            if(data.products){
                displayProducts(data.products);
                updateMoreProducts(data.nextPage)
            } else {
                throw new Errow('Products é indefinido no reponse')
            }
        }).catch(error => {
            console.error('Error Data:', error)
        })

    }

    displayProducts = (products) => {

        const productsHtml = products.map(product => `
            <div class="selecao-box-single">
                <div class="img" style="background-image: url('http:${product.image}'); width: 200px; height: 150px; margin-bottom: 14px;"></div>
                <div class="selecao-box-single-content">
                    <h5>${product.name}</h5>
                    <p>${product.description}</p>
                    <h5>De: R$${product.oldPrice.toFixed(2)}</h5>
                    <h4>Por: R$${product.price.toFixed(2)}</h4>
                    <h6>ou ${product.installments.count}x de R$${product.installments.value.toFixed(2)}</h6>
                    <button class="btn2">Comprar</button>
                </div>
            </div>
        `).join('')
        productsBox.innerHTML += productsHtml
    }

    const updateMoreProducts = (nextPage) => {

        const nextUrl = `${baseUrl}?page=${nextPage}`;
        moreProducts.onclick = () => {
            fetchProducts(nextUrl)
        }

    }

    fetchProducts(`${baseUrl}?page=1`)

})