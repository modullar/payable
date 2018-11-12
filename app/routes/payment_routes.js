// routes/payment_routes.js

var ObjectId = require('mongodb').ObjectID;
const { check, validationResult } = require('express-validator/check');

module.exports = function(app, db) {
  app.post('/payments', [check('value').isNumeric(),
                         check('isImported').isBoolean()],
  (req, res) => {
    const value = req.body.value;
    const isImported = req.body.isImported;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const payment = { contractId: req.body.contractId,
                      description: req.body.description,
                      value: value,
                      time: new Date(req.body.time),
                      isImported: isImported,
                      createdAt: Date.now(),
                      updatedAt: Date.now(),
                      isDeleted: false,
                      };
    var paymentCollection = db.collection('payment');
    paymentCollection.insert(payment, (err, results) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(results.ops[0]);
      }
    });
  });

  app.get('/payments/', (req, res) => {
    const details = { 'contractId': req.param('contractId'),
                      'time': {$gte: new Date(req.param('startDate'))},
                      'time': {$lte: new Date(req.param('endDate'))}};
    db.collection('payment').aggregate([
                                        {'$match': details}]).toArray(function(err, items){
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        total = 0;
        for (i = 0; i < items.length; i++) {
            total += items[i].value;
        }
        result = {}
        result.sum = total
        result.items = items
        res.send(result);
      }
    });
  });

  app.delete('/payments/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': ObjectId(id) };
    var paymentCollection = db.collection('payment');
    db.collection('payment').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Payment ' + id + ' deleted!');
      }
    });
  });


  app.put('/payments/:id', [check('value').isNumeric(),
                            check('isImported').isBoolean()],
  (req, res) => {
    const value = req.body.value;
    const isImported = req.body.isImported;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const id = req.params.id;
    const details = { '_id': ObjectId(id) };
    const payment = { contractId: req.body.contractId,
                      description: req.body.description,
                      value: value,
                      time: new Date(req.body.time),
                      isImported: isImported,
                      createdAt: Date.now(),
                      updatedAt: Date.now(),
                      isDeleted: false,
                      };
    var paymentCollection = db.collection('payment');

    paymentCollection.update(details, payment, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(payment);
      }
    });
  });
}
