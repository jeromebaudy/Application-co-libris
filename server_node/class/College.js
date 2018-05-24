/*--*/
/** @author jérôme baudy
/*--*/

var Manager = require('../class/Manager_class')

class College extends Manager {

    constructor(nom, adresse, code_postal, ville) {

        super(nom, adresse, code_postal, ville);

        // propriété du college
        this.nom_college = nom;
        this.adresse = adresse;
        this.code_postal = code_postal;
        this.ville = ville;

        // modele d'un college
        this.model = require('../models/model_college.js');

        // hydratation de l'objet
        this.element = new this.model({
            nom_college: this.nom_college,
            adresse: this.adresse,
            code_postal: this.code_postal,
            ville: this.ville
        });
    }
}

module.exports = College