document.addEventListener('DOMContentLoaded',async ()=>
{
 const response= axios.get('/displayOrders').then((r)=>{
    console.log(r.data.data)
  const products=r.data.data
  
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; 

  if (products.length === 0) {
      productList.textContent = 'No products available.';
      return;
  }
  products.forEach(product => {
    for(i=0;i<product.item.length;i++)
    {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-card'); 
    
        
        productDiv.innerHTML = `
            <img src="${product.item[i].imageUrl}" alt="${product.item[i].title}" class="product-image">
            <h3>${product.item[i].title}</h3>
            <p>Price: $${product.item[i].price}</p>
            <p> Description :${product.item[i].description}</p>
            <p> Quantity:${product.item[i].quantity}</p>
            
        `;
    
        productList.appendChild(productDiv);
    }

   
});
 })
})
document.getElementById('homeBtn').addEventListener('click', () => {
    window.location.href = '/';
});
document.getElementById('userproductBtn').addEventListener('click', () => {
    window.location.href = '/userproduct';
});
document.getElementById('ordersBtn').addEventListener('click', async()=>{
    window.location.href='/orders'
})