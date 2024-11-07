function fetchProducts() {
    axios.get('/products')
        .then(response => {
            const products = response.data; 
            const productList = document.getElementById('productList');
            productList.innerHTML = ''; 

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
                    <button class="edit-btn" onclick="editProduct('${product._id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteProduct('${product._id}')">Delete</button>
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
    <button class="detail-btn" onclick="detailProduct('${product._id}')">Detail</button>
    <button class="edit-btn" onclick="editProduct('${product._id}')">Edit</button>
    <button class="delete-btn" onclick="deleteProduct('${product._id}')">Delete</button>
`;

 document.getElementById('productList').style.display='none'
    
    
}



function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        axios.get(`http://localhost:5000/deleteProduct/${productId}`)
            .then(response => {
                alert('Product deleted successfully');
                fetchProducts(); 
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                alert('Error deleting product.');
            });
    }
}

document.getElementById('homeBtn').addEventListener('click', () => {
    window.location.href = '/';
});
document.getElementById('userproductBtn').addEventListener('click', () => {
    window.location.href = '/userproduct';
});
async function editProduct(id)
{
    console.log("ji")
  const response=  await  axios.get(`http://localhost:5000/edit/${id}`)
  console.log(response)
  if (response.data.success) {
   console.log("yeh")
    window.location.href = response.data.redirectUrl;
}
}
document.getElementById('cartBtn').addEventListener('click', async()=>{
    window.location.href='/displaycart'
})
document.getElementById('ordersBtn').addEventListener('click', async()=>{
    window.location.href='/orders'
})