// routes/payment_routes.js

module.exports = function(app, db) {
  app.post('/payments', (req, res) => {
    const payment = { contractId: req.body.contractId, description: req.body.description};
    var paymentCollection = db.collection('payment');
    paymentCollection.insert(payment, (err, results) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(results.ops[0]);
      }
    });
  });
};
