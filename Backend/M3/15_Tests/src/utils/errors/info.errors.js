const generateProduct = (product) => {
  return `
      One or more properties were incomplete or not valid.
      List of required properties:
      - name <string>, received ${product.name}
      - description <string>, received ${product.description}
      - price <number>, received ${product.price}
      - stock <number>, received ${product.stock}
      - category <string>, received ${product.category}
      - code <string>, received ${product.code}
      - status <boolean>, received ${product.status}
      - user <string>, received ${product.user}
    `;
};

module.exports = generateProduct;