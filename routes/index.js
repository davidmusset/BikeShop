var express = require('express');
var router = express.Router();

var  dataBike = {
  Models : ['BIKO45','ZOOK7','LIKO89','CEWO','ANIG99', 'SUPER10'],
  Prices : [679, 799, 839, 1299, 989, 209]
};

var dataCardBike2 = [];


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    dataBike: dataBike
  });
});

router.get('/shop', function(req, res, next) {
  res.render('shop', {
     dataCardBike2 : dataCardBike2
   });
});

router.post('/shop', function(req, res, next) {

  if ((dataCardBike2.find( model => model.Model === req.body.bikeNameFromFront) === undefined))
  {
    dataCardBike2.push({
    Model : req.body.bikeNameFromFront,
    Price : req.body.bikePriceFromFront,
    Quantity: req.body.bikeQuantityFromFront,
    Image: req.body.bikeImageFromFront
  });
  }
  else {
    dataCardBike2.find( model => model.Model === req.body.bikeNameFromFront).Quantity ++ ;
  }



  res.render('shop', {
      dataCardBike2 : dataCardBike2
   });
});

router.post('/delete', function(req, res, next) {

    dataCardBike2.splice(req.body.numberToDelete,1)

  res.render('shop', {
      dataCardBike2 : dataCardBike2
   });
});

router.post('/changeQuantity', function(req, res, next) {

  dataCardBike2.find( model => model.Model === req.body.Model).Quantity = req.body.newQuantity  ;
  res.render('shop', {
      dataCardBike2 : dataCardBike2
   });
});

module.exports = router;
