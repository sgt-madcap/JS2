const product = {
    props: ['product'],
    template: `
                <div class="product-item">
                    <img :src="$parent.productImage" alt="Some img">
                    <div class="desc">
                        <h3>{{ product.product_name }}</h3>
                        <p>{{ product.price }} $</p>
                        <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                    </div>
                </div>
            `
}

const products = {
    components: {product},
    data () {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            productImage: 'https://placehold.it/200x150'
        }
    },
    mounted () {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    methods: {
        filter (val) {
            let regExp = new RegExp (val, 'i');
            this.filtered = this.products.filter (el => regExp.test (el.product_name))
        }
    },
    template: `
                <div class="products">
                    <product 
                    v-for="product of filtered" 
                    :key="product.id_product"
                    :img="productImage"
                    :product="product"></product>
                </div>
            `
}