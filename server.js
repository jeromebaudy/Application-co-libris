/*--*/
/** @author jérôme baudy
/*--*/

/* Import des dépendances */
let express = require('express')
let http = require('http')
let reload = require('reload')

/* Création de l'application */
let app = express()

/* Moteur de template */
app.set('view engine', 'ejs')

/* Controller */
let serie = require('./server_node/controller/controller_serie')
app.use('/', serie)


/*
**********
* ROUTES *
**********
*/

/*
*
GET
*
*/
app.get('/docu_recherche', (request, response) => {
    response.render('pages/docu_recherche')
})
app.get('/docu_echange', (request, response) => {
    response.render('pages/docu_echange')
})
app.get('/docu_addSerie', (request, response) => {
    response.render('pages/docu_addSerie')
})

var server = http.createServer(app);

server.listen(8080, () => console.log('Server started !'));
reload(app)