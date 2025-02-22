
const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];


const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

const toCapitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

export { getRandomPositiveInteger, getRandomArrayElement, updateItem, toCapitalize };

