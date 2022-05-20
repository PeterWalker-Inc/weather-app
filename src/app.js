const path = require('path');
const express = require ('express');
const hbs = require ('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Paths for static and views
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Handlebars and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        description: "Search Weather in this page!",
        name: "Peter",
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Peter",
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!",
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error,
            });
        }
        console.log(latitude, longitude , location);
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error: error,
                }); 
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address,
            });
        });
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        description: "This is help page",
        name: "Peter",
    });
});

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: "404",
        errorMessage: "Help Article not found",
        name: "Peter",
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }
    res.send({
        products: [],
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: "Page Not Found",
        name: "Peter",
    });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

