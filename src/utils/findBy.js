export function findBy(arr, property, value) {
  return arr.find(item => item[property] === value);
}

export function findNestedBy(arr, nestedProperty, property, value) {
  let result;
  for (const item of arr) {
    if (item[property] === value) {
      result = item;
      break;
    }
    else {
      if (item[nestedProperty]) {
        for (const subItem of item[nestedProperty]) {
          if (subItem[property] === value) {
            result = subItem;
            break;
          }
        }
      }
    }
  }
  return result;
}