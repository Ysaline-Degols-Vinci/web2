var express = require('express');
var router = express.Router();


const FILMS = [
  {
    id: 1,
    title: 'miaou miaou',
    duration: '1h30',
    budget: '100',
    link:'miaoumiaou.com'
  },
  {
    id: 2,
    title: 'wouf wouf',
    duration: '1h15',
    budget: '90',
    link:'woufwouf.com'
    
  },
  {
    id: 3,
    title: 'coin coin',
    duration: '1h30',
    budget: '100',
    link:'coincoin.com'
  },

];

// Read all the films from the list
router.get('/', (req, res, next) => {
  console.log('GET /films');
  res.json(FILMS);
});

module.exports = router;


/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router; */
