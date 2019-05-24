let currencyFormatter = require("currency-formatter");

export const currencyRupiah = (price) => {
  return currencyFormatter.format(price, {
    symbol: "Rp ",
    decimal: ',',
    thousand: ".",
    precision: 0,
    //format: "%v %s" // %s is the symbol and %v is the value ¥
  });
};

export const currencyYuan = (price) => {
  return currencyFormatter.format(price, {
    symbol: "¥ ",
    decimal: ',',
    thousand: "."
  });
};