import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS.js";
import { getCartProductFromLS } from "./getCartProducts.js";
import { incrementDecrement } from "./incrementDecrement.js";
import { removeProdFromCart } from "./removeProdFromCart.js";


import products from "./src/api/products.json";
import { updateCartProductTotal } from "./updateCartProductTotal.js";

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd) => {
    // console.log(curProd.id);
    return cartProducts.some((curElem) => curElem.id === curProd.id);
});

console.log(filterProducts);

const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProduct = () => {
    filterProducts.forEach((curProd) => {
        const {id, category, productImage, productName, productPrice, productStock} = curProd;

        const productClone = document.importNode(templateContainer.content, true);

        const lSActualData = fetchQuantityFromCartLS(id, productPrice);

        productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
        productClone.querySelector(".category").textContent = category;
        productClone.querySelector(".productName").textContent = productName;
        productClone.querySelector(".productImage").src = productImage;
        productClone.querySelector(".productImage").alt = productName;
        productClone.querySelector(".productQuantity").textContent = lSActualData.quantity;
        productClone.querySelector(".productPrice").textContent = `₹${lSActualData.price}`;

        productClone.querySelector('.stockElement').addEventListener("click", (event) => {
            incrementDecrement(event, id, productStock, productPrice);
        });

        productClone.querySelector(".remove-to-cart-button").addEventListener("click", () => removeProdFromCart(id));

        cartElement.appendChild(productClone);
    })
}

// showing the cart product
showCartProduct();

// calculating the card total in our cartProduct page
updateCartProductTotal()
