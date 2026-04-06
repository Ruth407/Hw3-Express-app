import express from 'express';

import Chance from 'chance';
const chance = new Chance();

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    const id = Math.floor(Math.random() * 826) + 1;
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await response.json();

    res.render("home.ejs", { character: data });
});

app.get('/search', async (req, res) => {
   res.render('search.ejs')
});

app.get('/species', async (req, res) => {
    let species = req.query.species || 'human';

    let response = await fetch(`https://rickandmortyapi.com/api/character/?species=${species}`);
    let data = await response.json();

    res.render('species.ejs', { characters: data.results, species });
});


app.get('/searchName', async (req, res) => {
   let name = req.query.name;
   let url = `https://rickandmortyapi.com/api/character/?name=${name}`;
   let response = await fetch(url);
   let data = await response.json();

   res.render('results.ejs', { characters: data.results });
});

app.get('/searchStatus', async (req, res) => {
   let status = req.query.status;
   let url = `https://rickandmortyapi.com/api/character/?status=${status}`;
   let response = await fetch(url);
   let data = await response.json();

   res.render('results.ejs', { characters: data.results });
});

app.get('/searchGender', async (req, res) => {
   let gender = req.query.gender;
   let url = `https://rickandmortyapi.com/api/character/?gender=${gender}`;
   let response = await fetch(url);
   let data = await response.json();

   res.render('results.ejs', { characters: data.results });
});


app.get('/randomperson', (req, res) => {
    const fact = {
        name: chance.name(),
        age: chance.age(),
        profession: chance.profession(),
        city: chance.city(),
        country: chance.country({ full: true })
    };
    res.render('randomperson.ejs', { fact });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
