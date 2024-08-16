export const cart = JSON.parse(localStorage.getItem('cart')) || [
{
  id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 1
},
{
  id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}
];

export function addProduct(productId) {
  let itemInCart = 0;
  let cartQuantity = 0;
  cart.forEach((item) => {
    if (item.id === productId) {
      itemInCart = 1;
      item.quantity++;
    }
    cartQuantity += item.quantity;
  });
  if (!itemInCart) {
    cart.push({
      id: productId,
      quantity: 1
    });
    cartQuantity++;
  }
  document.querySelector(".js-cart-quantity").innerHTML = `${cartQuantity}`;
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeProduct(productId) {
  let matchIndex;
  cart.forEach((item, index) => {
    if (item.id === productId) {
      matchIndex = index;
    }
  });
  cart.splice(matchIndex, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
}