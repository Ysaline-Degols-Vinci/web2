var express = require('express');
var router = express.Router();

const films = [
  {
    id: 1,
    title: 'Star Wars: The Phantom Menace (Episode I)',
    duration: 136,
    budget: '115',
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_I_%E2%80%93_The_Phantom_Menace',
  },
  {
    id: 2,
    title: 'Star Wars: Episode II – Attack of the Clones',
    duration: 142,
    budget: 115,
    link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_II_%E2%80%93_Attack_of_the_Clones',
  },
  {
    id: 3,
    title: "Zack Snyder's Justice League",
    duration: 242,
    budget: 70,
    link: 'https://en.wikipedia.org/wiki/Zack_Snyder%27s_Justice_League',
  },
];

// Read all the films, filtered by minimum-duration if the query param exists
/*router.get('/', (req, res) => {
  const minimumFilmDuration = req?.query
    ? Number(req.query['minimum-duration'])
    : undefined;
  if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
    return res.json('Wrong minimum duration'); // bad practise (will be improved in exercise 1.5)

  if (!minimumFilmDuration) return res.json(films);

  const filmsReachingMinimumDuration = films.filter(
    (film) => film.duration >= minimumFilmDuration
  );
  return res.json(filmsReachingMinimumDuration);
});*/


// Read all the films
router.get('/', function (req, res) {
  if(req.query["minimum-duration"]===undefined){
    return res.json(films);
    //http://localhost:3000/films/?minimum-duration=200
  }

  if(req.query["minimum-duration"]<=0)res.sendStatus(400);
  return res.json(films.filter(film => film.duration >= req.query["minimum-duration"]))
});

// Read a film from its id in the menu
router.get('/:id', (req, res) => {
  const indexOfFilmFound = films.findIndex((film) => film.id == req.params.id);

  
  if(indexOfFilmFound<0){
    console.log("errooor");
    return res.sendStatus(404);
  } 

  return res.json(films[indexOfFilmFound]);
});

// Create a film
router.post('/', (req, res) => {
  const title =
    req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
  const link =
    req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;
  const duration =
    typeof req?.body?.duration !== 'number' || req.body.duration < 0
      ? undefined
      : req.body.duration;
  const budget =
    typeof req?.body?.budget !== 'number' || req.body.budget < 0
      ? undefined
      : req.body.budget;

  if (!title || !link || !duration || !budget) return res.json(res.sendStatus(400)); // bad practise (will be improved in exercise 1.5)

  const existingFilm = films.find(
    (film) => film.title.toLowerCase() === title.toLowerCase()
  );
  if (existingFilm) return res.sendStatus(409);

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = { id: nextId, title, link, duration, budget };

  films.push(newFilm);

  return res.json(newFilm);
});

module.exports = router;
