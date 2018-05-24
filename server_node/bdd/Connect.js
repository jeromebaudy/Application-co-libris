/*--*/
/** @author jérôme baudy
/*--*/

class Connect {

    constructor() {
        this.mongoose = require('mongoose');
    }

    open() {
        this.mongoose.connect('mongodb://localhost:27017/colibris', function (err) {
            if (err) { throw err; }
            console.log("Connecter à la base de données")
        });
    }
    close() {
        this.mongoose.connection.close();
        console.log("Déconnexion")
    }
}
module.exports = Connect


