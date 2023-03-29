const socket = io()

socket.on("update", (data) => {
    updateProducts(data);
});

socket.on("newProductAdded", (newProductId) => {
    fetch(`/products/${newProductId}`)
    .then(response => response.json())
    .then(product => {
        const productsList = document.querySelector("#products-list");
        const newProduct = document.createElement("li");
        newProduct.textContent = product.name;
        productsList.appendChild(newProduct);
    }).catch(error => console.log(error));
});