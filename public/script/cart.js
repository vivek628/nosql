document.addEventListener('DOMContentLoaded',async()=>{
    const resposne=await  axios.get('/usercart')
    console.log("re",resposne.data.data[0])
    const products=resposne.data.data
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-card'); 

      
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
             <p>${product.quantity}</p>
            <button class="detail-btn" onclick="detailProduct('${product._id}')">Detail</button>
            <button class="edit-btn" onclick="editProduct('${product._id}')">Edit</button>
            <button class="delete-btn" onclick="deleteProduct('${product._id}')">Delete</button>
        `;

        productList.appendChild(productDiv);
    });
})
function deleteProduct(id)
{
    console.log("id",id)
    axios.get('/deletecartitem',{ params: { id } })
}