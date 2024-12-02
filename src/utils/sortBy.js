export function sortByYearSold(products) {
  return sortBy(products, 'currentYearSold')
    .map(product => {
      return { ...product, sold: product.currentYearSold };
    });
}

export function sortBy(products, property) {
  return products.toSorted((firstProduct, secondProduct) => {
    if (firstProduct[property] < secondProduct[property])
      return 1;
    else if (firstProduct[property] > secondProduct[property])
      return -1;
    return 0;
  }).map(product => {
    return { ...product, sold: product.currentMonthSold };
  });
}

export function sortByStar(products) {
  return products.toSorted((firstProduct, secondProduct) => {
    if (firstProduct.rating.star < secondProduct.rating.star)
      return 1;
    else if (firstProduct.rating.star > secondProduct.rating.star)
      return -1;
    return 0;
  }).map(product => {
    return { ...product, sold: product.currentMonthSold };
  });
}