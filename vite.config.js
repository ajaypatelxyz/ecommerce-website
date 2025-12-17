import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        about: "about.html",
        products: "products.html",
        contact: "contact.html",
        cart: "addToCart.html"
      }
    }
  }
});
