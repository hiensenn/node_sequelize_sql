const express = require('express');
const exphbs = require('express-handlebars');
const connection = require('./db/connection')

//importando Model
const User = require('./models/User')
const Address = require('./models/Address')

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

app.get('/users/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({raw: true, WHERE: {id:id}})

    res.render('userview', {user})
})

app.post('/users/delete/:id', async(req, res) => {
    const id = req.params.id

    await User.destroy({where: {id:id}})
    res.redirect('/')
})

app.get('/users/edit/:id', async(req, res) => {
    const id = req.params.id

    const user = await User.findOne({raw: true, where: {id:id}})
    res.render('useredit', {user})
})

app.post('/users/update', async(req, res) => {
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    } else{
        newsletter = false
    }

    const userData = {
        id, 
        name,
        occupation,
        newsletter
    }

    await User.update(userData, {where: {id:id}})
    res.redirect('/')
})


//criando página principal
app.get('/', async (req, res) => {

    const users = await User.findAll({raw: true})
    res.render('home', {users : users})
});

connection
    .sync() 
    //.sync({force:true}) //= serve para o caso de ser adcionado um novo campo na tabela. Assim os dados serão excluídos e não serão nulos
    .then(()=>{
    app.listen(3000)
}).catch((err) => console.log(err))

