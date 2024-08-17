import {cart, removeProduct, changeDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';

function renderOrderSummaryHTML() {
  let html = '';
  cart.forEach((item) => {
    let matchProduct;
    products.forEach((product) => {
      if (item.id === product.id) {
        matchProduct = product;
      }
    });
    const today = dayjs();
    let deliveryDay;
    deliveryOptions.forEach((option) => {
      if (option.id === item.deliveryOptionId) {
        deliveryDay = today.add(option.deliveryDays, 'days');
      }
    });
    html +=
    `
      <div class="cart-item-container js-cart-item-container-${item.id}">
        <div class="delivery-date">
          Delivery date: ${dayFormat(deliveryDay)}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchProduct.name}
            </div>
            <div class="product-price">
              ${(matchProduct.priceCents / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${item.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-quantity-link" data-id="${item.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(item)}
          </div>
        </div>
      </div>
    `
  });
  document.querySelector(".js-order-summary").innerHTML = html;
  document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.id;
      removeProduct(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
    });
  });

  function dayFormat(day) {
    return day.format('dddd, MMMM D');
  }

  function deliveryOptionsHTML(item) {
    const today = dayjs();
    let html = '';
    deliveryOptions.forEach((option) => {
      const deliveryDay = today.add(option.deliveryDays, 'days');
      let isChecked = '';
      if (item.deliveryOptionId === option.id) {
        isChecked = 'checked';
      }
      html += 
      `
        <div class="delivery-option js-delivery-option" data-item-id="${item.id}" data-delivery-option='${option.id}'>
          <input type="radio" ${isChecked}
            class="delivery-option-input"
            name="${item.id}">
          <div>
            <div class="delivery-option-date">
              ${dayFormat(deliveryDay)}
            </div>
            <div class="delivery-option-price">
              $${(option.priceCents / 100).toFixed(2)} - Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;
  }
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {itemId, deliveryOption} = element.dataset;
      changeDeliveryOption(itemId, deliveryOption);
      renderOrderSummaryHTML();
    });
  });
}

renderOrderSummaryHTML();
