import { getCartProductFromLS } from "./getCartProducts.js";
import { updateCartProductTotal } from "./updateCartProductTotal.js";

export const incrementDecrement = (event, id, productStock, productPrice) => {
    const currentCardElement = document.querySelector(`#card${id}`);

    const productQuantity = currentCardElement.querySelector(".productQuantity");

    
    const productPriceElem = currentCardElement.querySelector(".productPrice");

    let quantity = 1;
    let localStoragePrice = 0;

    let localCartProducts = getCartProductFromLS();

    let existingProd = localCartProducts.find((curProd) => curProd.id === id);

    if(existingProd){
        quantity = existingProd.quantity;
        localStoragePrice = existingProd.price;
    } else {
        localStoragePrice = productPrice;
    }

    if(event.target.className === "cartIncrement"){
        if(quantity < productStock){
            quantity += 1;
        } else if(quantity === productStock){
            quantity = productStock;
            localStoragePrice = productPrice * productStock;
        }
    }

    if(event.target.className === "cartDecrement"){
        if(quantity > 1){
            quantity -= 1;
        }
    }

    localStoragePrice = productPrice * quantity;
    localStoragePrice = Number(localStoragePrice.toFixed(2));

    // Update UI
    productQuantity.textContent = quantity;
    productPriceElem.textContent = `₹${localStoragePrice}`;

    let updatedCart = localCartProducts.map((curProd) => 
        curProd.id === id ? { id, quantity, price: localStoragePrice } : curProd
    );

    localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));

    productQuantity.innerText = quantity;
    productPriceElem.innerText = `₹${localStoragePrice}`;


    updateCartProductTotal();

};
