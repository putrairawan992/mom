let currencyFormatter = require("currency-formatter");

const currencyRupiah = (price) => {
  return currencyFormatter.format(price, {
    symbol: "Rp ",
    decimal: ',',
    thousand: ".",
    precision: 0,
    //format: "%v %s" // %s is the symbol and %v is the value
  });
};

export default currencyRupiah;
