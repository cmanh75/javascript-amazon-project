import {products} from './products.js';

export const cart = [
  {
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 3
  },
  {
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 2
  }
];

export let cartQuantity = 0;

export function addProduct(productId) {
  let itemInCart = 0;
    cart.forEach((item) => {
      if (item.id === productId) {
        itemInCart = 1;
        item.quatity++;
      }
    });
    if (!itemInCart) {
      cart.push({
        id: productId,
        quatity: 1
      });
    }
    console.log(cart);
    cartQuantity++;
    document.querySelector(".cart-quantity").innerHTML = `${cartQuantity}`;
}

export function findItem(item) {
  products.forEach((product) => {
    if (item.id === product.id) {
      return product;
    }
  });
}