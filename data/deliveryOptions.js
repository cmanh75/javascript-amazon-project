export function findOption(item) {
  let matchingOption;
  deliveryOptions.forEach((option) => {
    if (option.id === item.deliveryOptionId) {
      matchingOption = option;
    }
  });
  return matchingOption;
};

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];