const express =  require ('express');
const { getHistory, getHistoryById, createHistory,  deleteHistory } = require('../controller/historyController');

const router =  express.Router();

router.get('/', getHistory);

router.get('/:idHistory', getHistoryById);

router.post('/', createHistory);

router.delete('/:idHistory', deleteHistory);

module.exports = router;