document.addEventListener('DOMContentLoaded', async () => {
    console.log("url", window.location.href);

    const url = new URL(window.location.href);
    const id = url.pathname.split('/').pop();

    console.log("Extracted ID:", id); 
    if (id && id.trim() !== '') {
        try {
            const response = await axios.get(`/getproduct/${id}`);
            const data = response.data;
            console.log("Product Data:", data);
            document.getElementById('title').value = data.title;
            document.getElementById('price').value = data.price;
            document.getElementById('desc').value = data.description;
            document.getElementById('actionbtn').textContent = "EDIT PRODUCT";
        } catch (error) {
            console.error("Error fetching product:", error.response ? error.response.data : error.message);
        }
    } else {
        console.error("No valid ID found in URL.");
    }

    document.getElementById('form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const price = document.getElementById('price').value;
        const desc = document.getElementById('desc').value;
        const productData = {
            title: title,
            price: price,
            desc: desc,
            id: id,
        };

        if (document.getElementById('actionbtn').textContent === 'Add Data') {
           const response= await axios.post('http://localhost:5000/postProduct', productData);
         
           window.location.href='/'
        } else {
           const response= await axios.post('http://localhost:5000/posteditproduct', productData);
           
          window.location.href='/'
        }
    });

    
    document.getElementById('productsBtn').addEventListener('click', () => {
        window.location.href = '/productpage';
    });

    document.getElementById('homeBtn').addEventListener('click', () => {
        window.location.href = '/';
    });
    document.getElementById('userproductBtn').addEventListener('click',()=>{
         console.log("ji")
        window.location.href='/userproduct'
    })
});
document.getElementById('cartBtn').addEventListener('click', async()=>{
      window.location.href='/displaycart'
})
document.getElementById('ordersBtn').addEventListener('click', async()=>{
    window.location.href='/orders'
})
