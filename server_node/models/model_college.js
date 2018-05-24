/*--*/
/** @author jérôme baudy
/*--*/

var class_Connect = require('../bdd/Connect')
var connexion = new class_Connect
var schema = connexion.mongoose.Schema;

let collegeSchema = new Schema({
    nom_college: String,
    adresse: String,
    code_postal: String,
    ville: String
},
    {
        versionKey: false
    });

module.exports = connexion.mongoose.model('colleges', collegeSchema); 