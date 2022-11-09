const mongoose = require('mongoose');
const TransactionInfo = mongoose.model('transaction');

const getTransactions = async (request, response) => {
  //   console.log(`getTransactions mongo request: ${JSON.stringify(request)}`)
  const { userId } = request;
  const query = { userId };
  try {
    data = await TransactionInfo.find(query);
    response.data = data;
    response.status = 200;
  } catch (e) {
    response.status = 400;
    console.log(e);
  }
  return response;
};

const addTransaction = async (request, response) => {
  // console.log(`addTransaction mongo request: ${JSON.stringify(request)}`)
  const Transaction = new TransactionInfo({
    userId: request.userId,
    actionType: request.actionType,
    receiptHash: request.receiptHash,
  });
  await Transaction.save()
    .then((result) => {
      response.status = 200;
      response.data = 'Transaction Added Successfully';
      //   console.log(`Response: ${response.status} and ${response.data}`)
    })
    .catch((err) => {
      console.log(err);
      response.status = 400;
      response.data = 'Error while registering voter in mongoDB';
    });

  return response;
};
module.exports = { getTransactions, addTransaction };
