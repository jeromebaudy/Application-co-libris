/*--*/
/** @author jérôme baudy
/*--*/

var class_Connect = require('../bdd/Connect')

class Manager_class {

    constructor() {
        /* création d'une instance de la classe Connect que l'on importe ligne 5 */
        this.connexion = new class_Connect;
    }

    /* méthode insert() qui permet d'injecter un element dans la base de données */
    insert() {

        var connexion = this.connexion;

        /* connexion à la bdd */ 
        connexion.open();

        this.element.save(function (err) {
            if (err) { throw err; }
            console.log('Ajout effectué avec succès !');
            /* déconnexion à la bdd */ 
            connexion.close();
        })
    }

    /* méthode get_list() qui permet de générer une liste d'élément provenant de la base de données */
    get_list(callback) {

        var connexion = this.connexion;

        /* connexion à la bdd */ 
        connexion.open();

        let query = this.model.find(null)
        query.exec(function (err, list) {
            if (err) { throw err; }
            console.log("Affichage de la liste terminé !")
            callback(list)
            /* déconnexion à la bdd */ 
            connexion.close();
        });

    }
}

module.exports = Manager_class