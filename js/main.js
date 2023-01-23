products = [
    {
        "id": "coat-01",
        "titulo": "Coat 01",
        "imagen": "./img/Coats/01.jpg",
        "categoria": {
            "nombre": "Coats",
            "id": "coats"
        },
        "precio": 40.00
    },
    {
        "id": "coat-02",
        "titulo": "Coat 02",
        "imagen": "./img/Coats/02.jpg",
        "categoria": {
            "nombre": "Coats",
            "id": "coats"
        },
        "precio": 35.00
    },
    {
        "id": "coat-03",
        "titulo": "Coat 03",
        "imagen": "./img/Coats/03.jpg",
        "categoria": {
            "nombre": "Coats",
            "id": "coats"
        },
        "precio": 93.00
    },
    {
        "id": "coat-04",
        "titulo": "Coat 04",
        "imagen": "./img/Coats/04.jpg",
        "categoria": {
            "nombre": "Coats",
            "id": "coats"
        },
        "precio": 70.00
    },
    {
        "id": "coat-05",
        "titulo": "Coat 05",
        "imagen": "./img/Coats/05.jpg",
        "categoria": {
            "nombre": "Coats",
            "id": "coats"
        },
        "precio": 75.00
    },
    {
        "id": "tshirts-01",
        "titulo": "T-Shirts 01",
        "imagen": "./img/T-shirts/01.jpg",
        "categoria": {
            "nombre": "T-Shirts",
            "id": "tshirts"
        },
        "precio": 10.00
    },
    {
        "id": "tshirts-02",
        "titulo": "T-Shirts 02",
        "imagen": "./img/T-shirts/02.jpg",
        "categoria": {
            "nombre": "T-Shirts",
            "id": "tshirts"
        },
        "precio": 17.00
    },
    {
        "id": "tshirts-03",
        "titulo": "T-Shirts 03",
        "imagen": "./img/T-shirts/03.jpg",
        "categoria": {
            "nombre": "T-Shirts",
            "id": "tshirts"
        },
        "precio": 20.00
    },
    {
        "id": "tshirts-04",
        "titulo": "T-Shirts 04",
        "imagen": "./img/T-shirts/04.jpg",
        "categoria": {
            "nombre": "T-Shirts",
            "id": "tshirts"
        },
        "precio": 30.00
    },
    {
        "id": "tshirts-05",
        "titulo": "T-Shirts 05",
        "imagen": "./img/T-shirts/05.jpg",
        "categoria": {
            "nombre": "T-Shirts",
            "id": "tshirts"
        },
        "precio": 20.00
    },
    {
        "id": "tshirts-06",
        "titulo": "T-Shirts 06",
        "imagen": "./img/T-shirts/06.jpg",
        "categoria": {
            "nombre": "T-Shirts",
            "id": "tshirts"
        },
        "precio": 14.00
    },
    {
        "id": "tshirts-07",
        "titulo": "T-Shirts 07",
        "imagen": "./img/T-shirts/07.jpg",
        "categoria": {
            "nombre": "T-Shirts",
            "id": "tshirts"
        },
        "precio": 30.00
    },
    {
        "id": "tshirts-08",
        "titulo": "T-Shirts 08",
        "imagen": "./img/T-shirts/08.jpg",
        "categoria": {
            "nombre": "T-Shirts",
            "id": "tshirts"
        },
        "precio": 25.00
    },
    {
        "id": "pants-01",
        "titulo": "Pant 01",
        "imagen": "./img/pants/01.jpg",
        "categoria": {
            "nombre": "Pants",
            "id": "pants"
        },
        "precio": 60.00
    },
    {
        "id": "pants-02",
        "titulo": "Pant 02",
        "imagen": "./img/pants/02.jpg",
        "categoria": {
            "nombre": "Pants",
            "id": "pants"
        },
        "precio": 30.00
    },
    {
        "id": "pants-03",
        "titulo": "Pant 03",
        "imagen": "./img/pants/03.jpg",
        "categoria": {
            "nombre": "Pants",
            "id": "pants"
        },
        "precio": 25.00
    },
    {
        "id": "pants-04",
        "titulo": "Pant 04",
        "imagen": "./img/pants/04.jpg",
        "categoria": {
            "nombre": "Pants",
            "id": "pants"
        },
        "precio": 70.00
    },
    {
        "id": "pants-05",
        "titulo": "Pant 05",
        "imagen": "./img/pants/05.jpg",
        "categoria": {
            "nombre": "Pants",
            "id": "pants"
        },
        "precio": 30.00
    }
]

const contentProducts = document.querySelector("#content-products");
const buttonsCategories = document.querySelectorAll(".button-category");
const mainTitle = document.querySelector("#main-title");
let buttonsAdd= document.querySelectorAll(".product-add");
const number = document.querySelector("#number")

function loadProducts(chosenProducts) {
    contentProducts.innerHTML = "";
    chosenProducts.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <img class="product-image" src="${product.imagen}" alt="${product.titulo}">
            <div class="product-details">
                <h3 class="product-title">${product.titulo}</h3>
                <p class="product-price">$${product.precio}.00</p>
                <button class="product-add" id="${product.id}">Add</button>
            <div>
        `
        contentProducts.append(div);
    });
    updateButtonsAdd();
} 

loadProducts(products);

buttonsCategories.forEach(b => {
    b.addEventListener("click", (e) => {
        buttonsCategories.forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if(e.currentTarget.id != "all") {
            const productCategory = products.find(product=>product.categoria.id === e.currentTarget.id);
            mainTitle.innerText = productCategory.categoria.nombre
            const productsButton = products.filter(product=>product.categoria.id === e.currentTarget.id )
            loadProducts(productsButton);
        }   else {
            mainTitle.innerText = "All products";
            loadProducts(products);
        }
    })    
    
    
})

function updateButtonsAdd() {
    buttonsAdd = document.querySelectorAll(".product-add");
    buttonsAdd.forEach(b => {
        b.addEventListener('click', addToCart);
    })
}

let productsInCart;

let productsInCartLS = localStorage.getItem("products-in-cart");
if(productsInCartLS) {
    productsInCart = JSON.parse(productsInCartLS);
    updateNumber();
} else {
    productsInCart = [];
}


function addToCart(e) {
    const idButton = e.currentTarget.id;
    const productAdd = products.find(p => p.id === idButton);
    if(productsInCart.some(p => p.id === idButton)) {
        const index = productsInCart.findIndex(p => p.id === idButton);
        productsInCart[index].quantity++    
    } else {        
        productAdd.quantity = 1;
        productsInCart.push(productAdd);
    }
    updateNumber();
    localStorage.setItem("products-in-cart", JSON.stringify(productsInCart));
}

function updateNumber() {
    let newNumber = productsInCart.reduce((acc, producto) => acc + producto.quantity, 0);
    number.innerText = newNumber
}

