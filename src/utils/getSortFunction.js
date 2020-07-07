import { CITY_POPULATION_ATTRIBUTE, CITY_NAME_ATTRIBUTE } from "src/enums";

export default function getSortFunction(sortBy, order) {
  return (a, b) => {
    let left;
    let right;
    if (order === 1) {
      left = a[sortBy];
      right = b[sortBy];
    } else {
      left = b[sortBy];
      right = a[sortBy];
    }

    if (sortBy === CITY_POPULATION_ATTRIBUTE) {
      return left - right;
    } else if (sortBy === CITY_NAME_ATTRIBUTE) {
      return left.localeCompare(right);
    }
  };
}
