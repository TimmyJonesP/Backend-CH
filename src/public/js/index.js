const socket = io()

socket.on("update", (data) => {
    updateProducts(data);
});

socket.on("productosActualizados", (data) => {
    const productList = document.querySelector("#product-list");
    productList.innerHTML = "";
    data.forEach(product => {
        const li = document.createElement("li");
        li.innerText = `${product.title} - ${product.price}`;
        productList.appendChild(li);
    });
});