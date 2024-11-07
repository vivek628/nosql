function fetchProducts() {
    axios.get('/products')
        .then(response => {
            const products = response.data; // Axios returns the response data directly
            const productList = document.getElementById('productList');
            productList.innerHTML = ''; // Clear existing content

            if (products.length === 0) {
                productList.textContent = 'No products available.';
                return;
            }

            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product-card'); 

              
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <h3>${product.title}</h3>
                    <p>Price: $${product.price}</p>
                    <p>${product.description}</p>
                    <button class="detail-btn" onclick="detailProduct('${product._id}')">Detail</button>
                   <button class="cart-btn" onclick="addToCart('${product._id}')">Add To Cart</button>
                   
                `;

                productList.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            document.getElementById('productList').textContent = 'Error loading products.';
        });
}

async function detailProduct(id) {
    document.getElementById('productdetail').style.display='block'
    console.log("id is ", id);
    const response = await axios.get(`http://localhost:5000/getproduct/${id}`)
    console.log(response)
    const product=response.data
    detaildiv=document.getElementById('productdetail')
    detaildiv.classList.add('product-card'); 
    detaildiv.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="product-image">
    <h3>${product.title}</h3>
    <p>Price: $${product.price}</p>
    <p>${product.description}</p>
    
    <button class="cart-btn" onclick="addToCart('${product._id}')">Add To Cart</button>

    
   
`;

 document.getElementById('productList').style.display='none'
    
    
}




document.getElementById('homeBtn').addEventListener('click', () => {
    window.location.href = '/';
});
document.getElementById('userproductBtn').addEventListener('click', () => {
    window.location.href = '/userproduct';
});
async function addToCart(productId) {
    console.log(productId)
  const result=  await axios.post('/addtocart',{productId})
  alert("Product Add to Cart")
  window.location.href='/userproduct'

}
document.getElementById('cartBtn').addEventListener('click', async()=>{
    window.location.href='usercart'
})
document.getElementById('ordersBtn').addEventListener('click', async()=>{
    window.location.href='/orders'
})