const product = [
  {
    value: "creationDate",
    name: "Newest",
    direction: "desc"
  },
  {
    value: "creationDate",
    name: "Oldest",
    direction: "asc"
  },
  {
    value: "price.basePrice.cny",
    name: "Cheapest",
    direction: "asc"
  },
  {
    value: "price.basePrice.cny",
    name: "Most Expensive",
    direction: "desc"
  },
  {
    value: "information.nameChinese",
    name: "Product Name CHN (A-Z)",
    direction: "asc"
  },
  {
    value: "information.nameChinese",
    name: "Product Name CHN (Z-A)",
    direction: "desc"
  },
  {
    value: "information.name",
    name: "Product Name IDN (A-Z)",
    direction: "asc"
  },
  {
    value: "information.name",
    name: "Product Name IDN (Z-A)",
    direction: "desc"
  },
  {
    value: "supplier.name",
    name: "Product Name(A-Z)",
    direction: "asc"
  },
  {
    value: "supplier.name",
    name: "Product Name(Z-A)",
    direction: "desc"
  },
];

const customer = [
  {
    value: "creationDate",
    name: "Newest",
    direction: "desc"
  },
  {
    value: "creationDate",
    name: "Oldest",
    direction: "asc"
  },
  {
    value: "name",
    name: "Name (A-Z)",
    direction: "asc"
  },
  {
    value: "name",
    name: "Name (Z-A)",
    direction: "desc"
  },
  {
    value: "user.email",
    name: "Email (A-Z)",
    direction: "asc"
  },
  {
    value: "user.email",
    name: "Email (Z-A)",
    direction: "desc"
  }
];


export const sortOption = {
  product: product,
  customer: customer
}