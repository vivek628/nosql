document.addEventListener('DOMContentLoaded', async () => {
   
    const response = await axios.get('/displayOrders');
    
    
    const products = response.data.data; 
    
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; 
  
    if (products.length === 0) {
      productList.textContent = 'No products available.';
      return;
    }
  
    
    products.forEach(order => {
      order.products.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-card'); 
  
        productDiv.innerHTML = `
          <img src="${item.product.imageUrl}" alt="${item.product.title}" class="product-image">
          <h3>${item.product.title}</h3>
          <p>Price: $${item.product.Price}</p>
          <p>Description: ${item.product.description}</p>
          <p>Quantity: ${item.quantity}</p>
        `;
  
        productList.appendChild(productDiv);
      });
    });
  });
  

  document.getElementById('homeBtn').addEventListener('click', () => {
    window.location.href = '/';
  });
  
  document.getElementById('userproductBtn').addEventListener('click', () => {
    window.location.href = '/userproduct';
  });
  
  document.getElementById('ordersBtn').addEventListener('click', async () => {
    window.location.href = '/orders';
  });
  