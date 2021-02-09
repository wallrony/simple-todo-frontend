import ITODO from "../domain/models/ITODO";

export function sortById(a: ITODO, b: ITODO) {
  if(a.id > b.id) {
    return 1;
  } else {
    return -1;
  }
}