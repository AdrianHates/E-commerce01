let productsInCart = localStorage.getItem("products-in-cart");
productsInCart = JSON.parse(productsInCart);
const contentEmptyCart = document.querySelector("#empty-cart");
const contentCartProducts = document.querySelector("#cart-products");
const contentCartActions = document.querySelector("#cart-actions");
const contentCartPurchased = document.querySelector("#cart-purchased");
let buttonsDelete = document.querySelectorAll(".cart-product-delete");
const emptyButton = document.querySelector("#cart-actions-delete");
const contentTotal = document.querySelector("#total");
const buyButton = document.querySelector("#cart-actions-tobuy")

function updateProductsCart() {
    if(productsInCart && productsInCart.length > 0) {
        contentEmptyCart.classList.add("disabled");
        contentCartProducts.classList.remove("disabled");
        contentCartActions.classList.remove("disabled");
        contentCartPurchased.classList.add("disabled");
        
        contentCartProducts.innerHTML = "";

        productsInCart.forEach(p => {
            const div = document.createElement("div");
            div.classList.add("cart-product");
            div.innerHTML = `
                <img class="cart-product-image" src="${p.imagen}" alt="${p.titulo}">
                <div class="cart-product-title">
                    <small>Title</small>
                    <h3>${p.titulo}</h3>
                </div>
                <div class="cart-product-quantity">
                    <small>Quantity</small>
                    <p>${p.quantity}</p>
                </div>
                <div class="cart-product-price">
                    <small>Price</small>
                    <p>$${p.precio}.00</p>
                </div>
                <div class="cart-product-subtotal">
                    <small>Subtotal</small>
                    <p>$${p.precio * p.quantity}</p>
                </div>
                <button class="cart-product-delete" id="${p.id}"><i class="bi bi-trash-fill"></i></button>
            `;
            contentCartProducts.append(div);
        })
        updateButtonsDelete()
    updateTotal();

    } else {
        contentEmptyCart.classList.remove("disabled");
        contentCartProducts.classList.add("disabled");
        contentCartActions.classList.add("disabled");
        contentCartPurchased.classList.add("disabled");
    }
    
}

updateProductsCart()

function updateButtonsDelete() {
    buttonsDelete = document.querySelectorAll(".cart-product-delete");
    buttonsDelete.forEach(b => {
        b.addEventListener("click", removeFromCart)
    })
}

function removeFromCart(e) {
    const idButton = e.currentTarget.id;
    const index = productsInCart.findIndex(p => p.id === idButton);
    productsInCart.splice(index,1);
    updateProductsCart();
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart))
}

emptyButton.addEventListener("click", EmptyCart);

function EmptyCart() {
    productsInCart.length = 0;
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
    updateProductsCart();
}

function updateTotal() {
    const totalCalculated = productsInCart.reduce((acc, p) => acc + (p.precio * p.quantity), 0);
    contentTotal.innerText = `$${totalCalculated}.00`;
}


buyButton.addEventListener("click", buyCart);

function buyCart() {
    productsInCart.length = 0;
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart))
    contentEmptyCart.classList.add("disabled");
    contentCartProducts.classList.add("disabled");
    contentCartActions.classList.add("disabled");
    contentCartPurchased.classList.remove("disabled");
    
}
