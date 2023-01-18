const insertResponseWithSuccess = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};

const newSaleDate = "2023-01-18 18:11:11";

const insertBodyWithSuccess = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];

module.exports = {
  insertBodyWithSuccess,
  insertResponseWithSuccess,
  newSaleDate,
};
