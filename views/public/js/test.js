$(function () {
    var thetitre = titres
    console.log(thetitre)
    var listTitres = [];
    for (var i = 0; i < titres.length; i++) {
        let titre = titres[i].titre;
        listTitres.push(titre);
    }

    $('#recherche').autocomplete({
        source: listTitres,
        minLength: 2
    });

});