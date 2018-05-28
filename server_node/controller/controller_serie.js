/*--*/
/** @author jérôme baudy
/*--*/

/* Import des dépendances */
let express = require('express')
let router = express.Router();
let bodyParser = require('body-parser')
let session = require('express-session')

/* Import des classes */
var class_serie = require('../class/Serie')

/* Middleware */
router.use('/assets', express.static('views/public'))
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
router.use(session({ secret: 'azedbnvgntehsfz', saveUnitialized: true, cookie: { secure: false } }))
router.use(require('../middlewares/flash'))

/* Function regex */
function cleanUpSpecialChars(str) {
    str = str.replace(/é|è|ê/g, "e");
    return str;
}

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

/* module d'autocomplétion (sous forme d'API)
* 
** @ request = écoute le champ input recherche (request.query["term"])
** @ response = renvoi un tableau de titre dont la chaine de caractéres
** contient la valeur de request sur l'URL "/search" au format JSON
*
*/
router.get('/search', (request, response) => {

    var parametre = request.query["term"].toLowerCase();
    var new_parametre = cleanUpSpecialChars(parametre);

    let series = new class_serie()
    series.get_list(function (series) {
        let tab_titres = []

        if (series.length == 1) {
            let titre = series[0].titre;
            let test_titre = cleanUpSpecialChars(titre.toLowerCase());
            if (test_titre.indexOf(new_parametre) >= 0) {
                tab_titres.push(titre);
            }
        } else if (series.length > 1) {
            for (let i = 0; i < series.length; i++) {
                let titre = series[i].titre;
                let test_titre = cleanUpSpecialChars(titre.toLowerCase());
                if (test_titre.indexOf(new_parametre) >= 0) {
                    tab_titres.push(titre);
                }
            }
        }
        let result = tab_titres;
        response.send(result, {
            'Content-Type': 'application/json'
        }, 200);
    });
})

/*
*
POST
*
*/

/* ajout d'une serie 
* 
** @ request = récupére la valeur des champs du formulaire au clic du boutton enregistrer
** @ response = redirige vers l'URL "/docu_addSerie"
** @ error = si un champs important est undefined on envoi un message à flash qui l'enregistre 
** dans la session et le renvoi aprés redirection sur la page "/docu_addSerie"'"
*/
router.post('/docu_addSerie', (request, response) => {
    if (request.body.titre === undefined ||
        request.body.auteur === undefined ||
        request.body.editeur === undefined ||
        request.body.collection_edition === undefined) {
        request.flash('error', "Il manque une information importante")
        response.redirect('/docu_addSerie')
    } else {
        let newSerie = new class_serie(request.body.titre, request.body.auteur, request.body.editeur, request.body.collection_edition, request.body.isbn, request.body.parution, request.body.quantite, request.body.langue, request.body.lien_image, request.body.id_college, request.body.nom_college, request.body.ville_college, )
        newSerie.insert()
        response.redirect('/docu_addSerie')
    }
})

/* module de recherche d'une série 
* 
** @ request = récupére la valeur de l'input "name:recherche" au clic sur le boutton rechercher
** @ response = renvoi un tableau de séries dont la chaine de caractéres du titre
** contient la valeur de request sur la vue "pages/docu_recherche" qui génère la page à l'URL "/docu_recherche"
** @ error = si un champs important est undefined on envoi un message à flash qui l'enregistre 
** dans la session et le renvoi aprés redirection sur l'url "/docu_recherche"
*/
router.post('/docu_recherche', (request, response) => {
    if (request.body.recherche === undefined || request.body.recherche === '' || request.body.recherche === ' ') {
        request.flash('error', "Vous n'avez pas entrez de titre de livre")
        response.redirect('/docu_recherche')
    } else {
        let parametre = request.body.recherche.toLowerCase();
        var new_parametre = cleanUpSpecialChars(parametre);

        let series = new class_serie()
        series.get_list(function (series) {

            let tab_series = []

            if (series.length == 1) {
                let titre = series[0].titre;
                let test_titre = cleanUpSpecialChars(titre.toLowerCase());
                if (test_titre.indexOf(new_parametre) >= 0) {
                    tab_series.push(series[0]);
                }
            } else if (series.length > 1) {

                for (let i = 0; i < series.length; i++) {

                    let newSerie = series[i];
                    let titre = newSerie.titre;
                    let test_titre = cleanUpSpecialChars(titre.toLowerCase());
                    if (test_titre.indexOf(new_parametre) >= 0) {
                        tab_series.push(newSerie);
                    }
                }
            }
            response.render('pages/docu_recherche', { tab_series: tab_series })
        });
    }
})

module.exports = router;