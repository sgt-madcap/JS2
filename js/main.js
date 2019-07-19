//ФЭЙК ЭПИ
const API_URL = 'https://raw.githubusercontent.com/sgt-madcap/JS2/master/';

const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

function makeGETRequest(url) {

	return new Promise((resolve, reject) => {
		let xhr

		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest()
		} else if (window.ActiveXObject) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP")
		}

		xhr.open('GET', url, true)

		xhr.onreadystatechange = () => {
			setTimeout(() => {
				if (xhr.readyState === 4 && xhr.status === 200) {
					resolve(xhr.responseText)
				} else {
					reject(new Error(`${xhr.status} (${xhr.statusText})`))
				}
			}, 100)
		}

		xhr.send()
	})

};

//Глобальные сущности 
var userCart = [];

class GoodsList {
	constructor() {
		this.goods = []
		this._init()
	}

	_init() {
		this.fetchGoods()
	}

	fetchGoods() {
		makeGETRequest(`${API_URL}/catalogData.json`)
			.then(result => {
					this.goods = JSON.parse(result)
					this.render()
				},

				error => {
					let errMsg = `<div class="error-message">
									<p>${error}</p>
									</div>`
					document.querySelector('.products').insertAdjacentHTML('beforebegin', errMsg)
				}
			)
	}

	render() {
		const block = document.querySelector('.products')
		this.goods.forEach(product => {
			const prod = new Product(product)
			block.insertAdjacentHTML('beforeend', prod.render())
		})
	}
}

const list = new GoodsList();

class Product {
	constructor(product) {
		this.id = product.id_product
		this.title = product.product_name
		this.price = product.price
		this.img = image
	}
	render() {
		return `<div class="product-item">
                        <img src="${this.img}" alt="Some img">
                        <div class="desc">
                            <h3>${this.title}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-name="${this.title}"
                            data-image="${this.img}"
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
	}
}