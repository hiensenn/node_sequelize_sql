const express = require('express');
const exphbs = require('express-handlebars');
const connection = require('./db/connection')

//importando Model
const User = require('./models/User')

const app = express();

//conectando a extensão da rota
app.use(
    express.urlencoded({
        extended:true,
    }),
)

//traduzindo para json
app.use(express.json())

//iniciando o handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars')

//incluindo o css
app.use(express.static('public'));

//criando página principal
app.get('/', (req, res) => {
    res.render('home')
});

connection.sync().then(()=>{
    app.listen(3000)
}).catch((err) => console.log(err))

