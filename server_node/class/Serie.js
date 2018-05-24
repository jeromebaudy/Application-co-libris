/*--*/
/** @author jérôme baudy
/*--*/

var Manager = require('../class/Manager_class')

class Serie extends Manager {

    constructor(titre, auteur, editeur, collection_edition, isbn, date_parution, quantite, langue, lien_image, id_college_proprietaire, nom_college_proprietaire, ville_college_proprietaire) {

        super(titre, auteur, editeur, collection_edition, isbn, date_parution, quantite, langue, lien_image, id_college_proprietaire, nom_college_proprietaire, ville_college_proprietaire);
        
        // propriété de la serie
        this.titre = titre;
        this.auteur = auteur
        this.editeur = editeur
        this.collection_edition = collection_edition
        this.isbn = isbn
        this.date_parution = date_parution
        this.quantite = quantite
        this.langue = langue
        this.lien_image = lien_image
        this.id_college_proprietaire = id_college_proprietaire
        this.nom_college_proprietaire = nom_college_proprietaire
        this.ville_college_proprietaire = ville_college_proprietaire

        // modele d'une serie
        this.model = require('../models/model_serie.js');

        // hydratation de l'objet
        this.element = new this.model({
            titre: this.titre,
            auteur: this.auteur,
            editeur: this.editeur,
            collection_edition: this.collection_edition,
            isbn: this.isbn,
            date_parution: this.date_parution,
            quantite: this.quantite,
            langue: this.langue,
            lien_image: this.lien_image,
            college_proprietaire:
                {
                    id_college: this.id_college_proprietaire,
                    nom_college: this.nom_college_proprietaire,
                    ville_college: this.ville_college_proprietaire
                }            
        });
    }
}
module.exports = Serie