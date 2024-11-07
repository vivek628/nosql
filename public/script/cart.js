document.addEventListener('DOMContentLoaded',async()=>{
    const resposne=await  axios.get('/usercart')
    console.log("re",resposne.data.data[0])
    const products=resposne.data.data
    console.log("len ",products.length)
    if(products.length==0)
    {
        document.getElementById('orderbtn').style.display='none'
        document.getElementById('heading').textContent='NO PRODUCTS'
    }
    
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
document.getElementById('homeBtn').addEventListener('click',()=>{
    console.log("jjjii")
    window.location.href='/'
})
document.getElementById('productsBtn').addEventListener('click',()=>{
 
    window.location.href='/productpage'
})
document.getElementById('userproductBtn').addEventListener('click',()=>{
  
    window.location.href='/userproduct'
})
document.getElementById('orderbtn').addEventListener('click',async()=>{
    await axios.post('http://localhost:5000/postorder')
    window.location.href='/'

})