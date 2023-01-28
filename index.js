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

app.get('/users/create', (req, res) => {
    res.render('adduser')
})

app.post('/users/create', async(req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }

    await User.create({name, occupation, newsletter})

    res.redirect('/')
})

//criando página principal
app.get('/', async (req, res) => {

    const users = await User.findAll({raw: true})
    res.render('home', {users : users})
});

connection.sync().then(()=>{
    app.listen(3000)
}).catch((err) => console.log(err))

