export function filterBy(arr, property, value) {
  return arr.filter(item => item[property] === value);
}