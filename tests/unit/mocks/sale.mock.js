const insertResponseWithSuccess = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
};

const insertBodyWithSuccess = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const insertBodyWithoutProductId = [{ quantity: 1 }];

const findByIdResponseWithSuccess = [
  { saleId: 3, productId: 1, quantity: 1 },
  { saleId: 3, productId: 2, quantity: 5 }
]

module.exports = {
  insertBodyWithSuccess,
  insertResponseWithSuccess,
  insertBodyWithoutProductId,
  findByIdResponseWithSuccess
};
