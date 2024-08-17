import { cart, cartQuantity } from "../../data/cart.js";
import { findOption } from "../../data/deliveryOptions.js";
import { findProduct } from "../../data/products.js";
import { money } from "../function/moneyFormat.js";

export function renderPaymentSummary() {
  let costOfItems = 0;
  let costShipping = 0;
  
  cart.forEach((item) => {
    const matchProduct = findProduct(item);
    costOfItems += matchProduct.priceCents * item.quantity;
    const matchOption = findOption(item);
    costShipping += matchOption.priceCents;
  });

  const totalBeforeTax = costOfItems + costShipping;
  const tax = (totalBeforeTax * 0.1);
  const orderTotal = Math.round(totalBeforeTax + tax);

  const html = 
  `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity()}):</div>
      <div class="payment-summary-money">$${money(costOfItems)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${money(costShipping)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${money(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${money(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${money(orderTotal)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `
  console.log(1);
  document.querySelector(".js-payment-summary").innerHTML = html;
}