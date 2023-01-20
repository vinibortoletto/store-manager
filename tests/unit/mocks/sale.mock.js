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

const insertBodyWithWrongProductId = [{ productId: 9999, quantity: 1 }];

const insertBodyWithoutQuantity = [{ productId: 1 }];

const insertBodyWithWrongQuantity = [{ productId: 1, quantity: 0 }];

const findByIdResponseWithSuccess = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

const getAllResponseWithSuccess = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

module.exports = {
  insertBodyWithSuccess,
  insertResponseWithSuccess,
  insertBodyWithoutProductId,
  findByIdResponseWithSuccess,
  insertBodyWithoutQuantity,
  insertBodyWithWrongQuantity,
  insertBodyWithWrongProductId,
  getAllResponseWithSuccess,
};
