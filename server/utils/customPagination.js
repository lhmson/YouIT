/**
 * 
 * @param {[any]} arr 
 * @param {Number} limit 
 * @param {Number} page 
 */
export const customPagination = (arr, limit, page) => {
  page = Math.max(page, 0);
  return arr.slice(page * limit, Math.min(arr.length, limit * (page + 1)))
}