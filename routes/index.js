var express = require('express');
var router = express.Router();

var  dataBike = {
  Models : ['BIKO45','ZOOK7','LIKO89','CEWO','ANIG99', 'SUPER10'],
  Prices : [679, 799, 839, 1299, 989, 209]
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    dataBike
  });
});

router.get('/shop', function(req, res, next) {
  if (req.session.dataCardBike == undefined){req.session.dataCardBike=[]};

  res.render('shop', {
     dataCardBike : req.session.dataCardBike
   });
});

router.post('/shop', function(req, res, next) {
  if (req.session.dataCardBike == undefined){req.session.dataCardBike=[]};

  if ((req.session.dataCardBike.find( model => model.Model === req.body.bikeNameFromFront) === undefined))
  {
    req.session.dataCardBike.push({
    Model : req.body.bikeNameFromFront,
    Price : req.body.bikePriceFromFront,
    Quantity: req.body.bikeQuantityFromFront,
    Image: req.body.bikeImageFromFront
  });
  }
  else {
    req.session.dataCardBike.find( model => model.Model === req.body.bikeNameFromFront).Quantity ++ ;
  }

  res.render('shop', {
      dataCardBike : req.session.dataCardBike
   });
});

router.post('/delete', function(req, res, next) {

    req.session.dataCardBike.splice(req.body.numberToDelete,1)

  res.render('shop', {
      dataCardBike : req.session.dataCardBike
   });
});

router.post('/changeQuantity', function(req, res, next) {

  req.session.dataCardBike.find( model => model.Model === req.body.Model).Quantity = req.body.newQuantity  ;
  res.render('shop', {
      dataCardBike : req.session.dataCardBike
   });
   
});

module.exports = router;
