export const variantTemplate = (variants) => {
    variants.map((variant, index, arr) => {
    if (index % 2 === 0) return `${variant.value} : `;
    else {
      if (arr.length - 1 <= index) return `${variant.value}`;
      else return `${variant.value}, `;
    }
  })
}