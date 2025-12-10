import { addToCart } from "./addToCart";
import { homeQuantityToggle } from "./homeQuantityToggle";

const productContainer = document.querySelector("#productContainer");
const productTemplate = document.querySelector("#productTemplate");

export const showProductContainer = (products) => {
    if(!products){
        return false;
    }

    products.forEach((curElem) => {
        const{id, category, productImage, productName, rating, productDescription, productPrice, productActualPrice, productStock, quantity} = curElem;

        const productClone = document.importNode(productTemplate.content, true);

        productClone.querySelector('#cardValue').setAttribute('id', `card${id}`);

        productClone.querySelector('.category').textContent = category;
        productClone.querySelector('.productName').textContent = productName;
        productClone.querySelector('.productImage').src = productImage;
        productClone.querySelector('.productImage').alt = productName;
        // productClone.querySelector('.rating').textContent = rating;
        productClone.querySelector('.productDescription').textContent = productDescription;
        productClone.querySelector('.productPrice').textContent = `₹ ${productPrice}`;
        productClone.querySelector('.productActualPrice').textContent = `₹ ${productActualPrice}`;
        productClone.querySelector('.productStock').textContent = productStock;
        // productClone.querySelector('.quantity').textContent = quantity

        productClone.querySelector('.stockElement').addEventListener("click", (event) => {
            homeQuantityToggle(event, id, productStock);
        })
        
        productClone.querySelector('.add-to-cart-button').addEventListener("click", (event) => {
            addToCart(event, id, productStock);
        });

        productContainer.append(productClone);
    });
}