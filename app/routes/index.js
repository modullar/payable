// routes/index.js

const paymentRoutes = require('./payment_routes');

module.exports = function(app, db) {
  paymentRoutes(app, db);
};
