/**
 * @function formatCurrency
 * format number as currency (Kr 원)
 *
 * @param {number} currency
 * @returns {string} number formatted as currency
 *
 * @example
 *  formatCurrency(0)
 *  // => 0원
 *
 * @example
 *  formatCurrency(1500)
 * // => 1500원
 *
 */

export const formatCurrency = (currency) => {
    return new Intl.NumberFormat("ko-KR").format(currency);
};
