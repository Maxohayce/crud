const express = require('express');
const router = new express.Router();
const dataCtrl = require('../controllers/dataControllers')

//GET request to /datas to fetch data
router.get('/', dataCtrl.fetchData );

//post req to /datas to create a new data
router.post('/', dataCtrl.createNewData );

//GET request to /datas/:id to fetch single data
router.get('/:id', dataCtrl.fetchSingleData );

//PUT request to /datas/:id  to update a single data
router.put('/:id', dataCtrl.updateSingleBook );

//DELETE request to datas/:id to delete a single data
router.delete('/:id', dataCtrl.deleteSingleData );

module.exports = router