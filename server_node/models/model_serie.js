/*--*/
/** @author jérôme baudy
/*--*/

var class_Connect = require('../bdd/Connect')
var connexion = new class_Connect
var schema = connexion.mongoose.Schema;

let serieSchema = new schema({
    titre: String,
    auteur: String,
    editeur: String,
    collection_edition: String,
    isbn: String,
    date_parution: String,
    quantite: String,
    langue: String,
    lien_image: String,
    college_proprietaire:
        {
            id_college: String,
            nom_college: String,
            ville_college: String
        }  
},
    {
        versionKey: false
    });

module.exports = connexion.mongoose.model('series', serieSchema);