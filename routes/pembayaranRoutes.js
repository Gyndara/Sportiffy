const express =  require('express');
const { getPayment, getPaymentById, createPayment, updatePayment, deletePayment } = require('../controller/pembayaranController');

const router = express.Router();

router.get('/', getPayment);

router.get('/:idPayment', getPaymentById);

router.post('/', createPayment);

router.patch('/:idPayment', updatePayment);

router.delete('/:idPayment', deletePayment);

module.exports =  router;