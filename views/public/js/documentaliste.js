var moncollege = "1";

var btn_attente = document.getElementById('attente');
var btn_pret = document.getElementById('pret');
var btn_emprunt = document.getElementById('emprunt');
var contenerResultatGlobal = document.querySelector('.selector')

$(document).ready(function () {

});

//**********************
// évent au clic 
//**********************

btn_attente.addEventListener('click', function (e) {
    e.preventDefault();
    if (document.querySelector('.section3')) {
        contenerResultatGlobal.removeChild(document.querySelector('.section3'))
    }
    btn_attente.className = 'chooseSelected';
    btn_pret.className = 'choose';
    btn_emprunt.className = 'choose';
    readSection();

    var demandes = [];
    for (var i = 0; i < prets.length; i++) {
        var demande = prets[i];
        if (demande.statut_pret == "Require vérification" & demande.college_demandeur.id_college == moncollege) {
            demandes.push(demande);
        } else if (demande.statut_pret == "Require décision" & demande.serie.college_proprietaire.id_college == moncollege) {
            demandes.push(demande);
        }
    }
    readDemande(demandes);

});

btn_pret.addEventListener('click', function (e) {
    e.preventDefault();
    if (document.querySelector('.section3')) {
        contenerResultatGlobal.removeChild(document.querySelector('.section3'))
    }
    btn_attente.className = 'choose';
    btn_pret.className = 'chooseSelected';
    btn_emprunt.className = 'choose';
    readSection();
    var demandes = [];
    for (var i = 0; i < prets.length; i++) {
        var demande = prets[i];
        if (demande.statut_pret == "Valider" & demande.serie.college_proprietaire.id_college == moncollege) {
            demandes.push(demande);
        }
    }
    readDemande(demandes);
});

btn_emprunt.addEventListener('click', function (e) {
    e.preventDefault();
    if (document.querySelector('.section3')) {
        contenerResultatGlobal.removeChild(document.querySelector('.section3'))
    }
    btn_attente.className = 'choose';
    btn_pret.className = 'choose';
    btn_emprunt.className = 'chooseSelected';
    readSection();
    var demandes = [];
    for (var i = 0; i < prets.length; i++) {
        var demande = prets[i];
        if (demande.statut_pret == "Valider" & demande.college_demandeur.id_college == moncollege) {
            demandes.push(demande);
        } else if (demande.statut_pret == "Require décision" & demande.college_demandeur.id_college == moncollege) {
            demandes.push(demande);
        }
    }
    readDemande(demandes);
});

function readSection() {

    var section = $('<section>');
    section.addClass('row avecAlign section3');
    section.appendTo(contenerResultatGlobal)

    let div = $('<div>');
    div.addClass('maxWidth resultat');
    div.appendTo(section)
}

//*****************************
// traitement des données reçus
//*****************************

function newDemande(demande, serie) {

    var article = $('<article>');
    article.data('demande', demande);

    var $div1 = $('<div>');
    $div1.addClass('row avecAlign serie');
    $div1.appendTo(article);

    var logoSerie = $('<img>');
    logoSerie.addClass('imgSerie marginRight');
    logoSerie.attr('src', 'assets/img/' + serie.lien_image + '.jpg');
    logoSerie.appendTo($div1);

    var div2 = $('<div>');
    div2.addClass('divInfo1 row avecAlign');
    div2.appendTo($div1);

    var div3 = $('<div>');
    div3.appendTo(div2);

    var h3_1 = $('<h3>');
    h3_1.addClass('marginBot2');
    h3_1.html(serie.titre);
    h3_1.appendTo(div3);

    var h4_1 = $('<p>');
    h4_1.addClass('marginBot2');
    h4_1.html('Auteur : ' + serie.nom_auteur)
    h4_1.appendTo(div3)

    var h4_2 = $('<p>');
    h4_2.addClass('marginBot2');
    h4_2.html('Editeur : ' + serie.nom_editeur)
    h4_2.appendTo(div3)

    var h4_3 = $('<p>');
    h4_3.html('Collection : ' + serie.nom_collection)
    h4_3.appendTo(div3)

    var div4 = $('<div>');
    div4.appendTo(div2);

    if (demande.college_demandeur.id_college == moncollege) {

        var p_1 = $('<h4>');
        p_1.addClass('bold marginBot2');
        p_1.html('Enseignant : ' + demande.enseignant.nom_enseignant);
        p_1.appendTo(div4);

    } else {
        p_10 = $('<p>');
        p_10.addClass('bold marginBot2 bold');
        p_10.html('Collège : ' + demande.college_demandeur.nom_college + ' - ' + demande.college_demandeur.ville_college)
        p_10.appendTo(div4);

        var p_1 = $('<h4>');
        p_1.addClass('marginBot2');
        p_1.html('Enseignant : ' + demande.enseignant.nom_enseignant);
        p_1.appendTo(div4);

    }

    var p_2 = $('<p>');
    p_2.html('Reçus le 15-04-2018'); /* date à gérer */
    p_2.appendTo(div4);

    var div5 = $('<div>');
    div5.addClass('rowStart avecAlign marginBot2 divStatut')
    div5.appendTo($div1);

    var logoStatut = $('<img>');
    logoStatut.addClass('svg2 marginRight');

    var p_3 = $('<p>');

    if (demande.statut_pret == "Require vérification") {
        logoStatut.attr('src', 'assets/img/hourglass-start.svg')
        p_3.html(demande.statut_pret)
    } else if (demande.statut_pret == "Require décision") {
        logoStatut.attr('src', 'assets/img/hourglass-end.svg')
        if (demande.serie.college_proprietaire.id_college != moncollege) {
            p_3.html("Attente de décision")
            logoStatut.attr('src', 'assets/img/hourglass-half.svg')
        } else {
            p_3.html(demande.statut_pret)
        }

    } else if (demande.statut_pret == "Valider") {
        logoStatut.attr('src', 'assets/img/check-square.svg')
        p_3.html(demande.statut_pret)
    } else if (demande.statut_pret == "Refuser") {
        logoStatut.attr('src', 'assets/img/times.svg')
        p_3.html(demande.statut_pret)
    }

    logoStatut.appendTo(div5);

    p_3.appendTo(div5)

    var div6 = $('<div>');
    div6.addClass('tailleDivFleche');
    div6.appendTo($div1);

    var fleche = $('<img>');
    fleche.addClass('svg2');
    fleche.attr('src', 'assets/img/angle-down.svg')
    fleche.appendTo(div6);

    $div1.on('click', function (evt) {

        var $deroule = $('.ouvert');

        var $derouleNb = $deroule.length

        if ($derouleNb == 0) {

            createDeroule();
            if (demande.statut_pret == "Require décision" & demande.serie.college_proprietaire.id_college == moncollege || demande.statut_pret == "Require vérification") {
                addBtnProf();
            }
            fleche.attr('src', 'assets/img/angle-up.svg')

        } else {

            var $derouleSelect = $(this).next();

            if (document.getElementById('deroule' + demande.id_pret + demande.statut_pret)) {

                $derouleSelect.remove();
                fleche.attr('src', 'assets/img/angle-down.svg')

            } else {
                createDeroule();
                if (demande.statut_pret == "Require décision" & demande.serie.college_proprietaire.id_college == moncollege || demande.statut_pret == "Require vérification") {
                    addBtnProf();
                }


                fleche.attr('src', 'assets/img/angle-up.svg')
            }
        }
    });

    function createDeroule() {

        var div7 = $('<div>');
        div7.addClass('row marginTop2')
        div7.attr('id', 'deroule' + demande.id_pret + demande.statut_pret)
        div7.appendTo(article);

        var div8 = $('<div>');
        div8.attr('id', 'action' + demande.id_pret);
        div8.addClass('columnStart sansAlign detailSerie');
        div8.appendTo(div7);

        var form = $('<form>');
        form.addClass('columnStart sansAlign ouvert')
        form.appendTo(div7);

        var div11 = $('<div>');
        div11.addClass('row avecAlign maxWidth padding marginBot colorWhite')
        div11.appendTo(form);

        var div12 = $('<div>');
        div12.addClass('row avecAlign')
        div12.appendTo(div11);

        var label1 = $('<label>');
        label1.addClass('marginRight2');
        label1.html("Date d'emprunt :");
        label1.appendTo(div12);

        var p_7 = $('<p>');
        p_7.addClass('bold');
        p_7.html(demande.date_debut);
        p_7.appendTo(div12)

        var div13 = $('<div>');
        div13.addClass('row avecAlign')
        div13.appendTo(div11);

        var label2 = $('<label>');
        label2.addClass('marginRight2');
        label2.html("Date de retour :");
        label2.appendTo(div13);

        var p_8 = $('<p>');
        p_8.addClass('bold');
        p_8.html(demande.date_fin);
        p_8.appendTo(div13)

        var div15 = $('<div>');
        div15.addClass('column sansAlign marginBot padding colorWhite message messages' + demande.id_pret);
        div15.appendTo(form);

        var div14 = $('<div>');
        div14.addClass('column sansAlign maxWidth colorWhite');
        div14.appendTo(form);

        var div17 = $('<div>');
        div17.addClass('row maxWidth avecAlign padding');
        div17.appendTo(div14);

        var label3 = $('<label>');
        label3.addClass('bold')
        label3.html("Envoyer un message :")
        label3.appendTo(div17);

        var select = $('<select>');
        select.addClass('inputTaille4 policeForm');
        select.attr('required');
        select.appendTo(div17);

        var option1 = $('<option>');
        option1.attr('selected');
        option1.html('-- Choisir le destinataire --');
        option1.appendTo(select);

        var option2 = $('<option>');
        option2.html('Enseignant : ' + demande.enseignant.nom_enseignant);
        option2.appendTo(select);

        if (serie.college_proprietaire.id_college == moncollege) {

            var option3 = $('<option>');
            option3.html('Collège : ' + demande.college_demandeur.nom_college);
            option3.appendTo(select);

        } else {

            var option3 = $('<option>');
            option3.html('Collège : ' + serie.college_proprietaire.nom_college);
            option3.appendTo(select);

        }

        var div21 = $('<div>');
        div21.addClass('padding marginNegatif');
        div21.appendTo(div14)

        var textarea = $('<textarea>');
        textarea.appendTo(div21);

        var div19 = $('<div>');
        div19.addClass('rowEnd avecAlign maxWidth padding marginNegatif2');
        div19.appendTo(div14);

        var btn3 = $('<button>');
        btn3.addClass('btn envoyer');
        btn3.html('Envoyer le message');
        btn3.appendTo(div19);

        var div9 = $('<div>');
        div9.addClass('marginBot detailSup');
        div9.appendTo(div8);

        var p_4 = $('<p>');;
        p_4.addClass('marginBot');
        p_4.html("Nombre d'exemplaire : " + serie.quantite_de_livre + ' livres');
        p_4.appendTo(div9);

        var p_5 = $('<p>');
        p_5.addClass('marginBot');
        p_5.html("Langue : " + serie.langue);
        p_5.appendTo(div9);

        var p_6 = $('<p>');
        p_6.addClass('marginBot');
        p_6.html("ISBN : " + serie.isbn);
        p_6.appendTo(div9);

        if (serie.college_proprietaire.id_college == moncollege) {

            var p_9 = $('<p>');
            p_9.addClass('marginBot');
            p_9.html("Propriétaire : Mon collège");
            p_9.appendTo(div9);

        } else {

            var p_9 = $('<p>');
            p_9.addClass('marginBot');
            p_9.html("Propriétaire : " + serie.college_proprietaire.nom_college + ' - ' + serie.college_proprietaire.ville_college);
            p_9.appendTo(div9);

        }
        if (demande.statut_pret == "Require décision" & demande.serie.college_proprietaire.id_college == moncollege || demande.statut_pret == "Require vérification" || demande.statut_pret == "Attente de la réponse") {

            var div10 = $('<div>');
            div10.addClass('reservation' + demande.id_pret + ' detailSup marginBot')
            div10.appendTo(div8);

            var h3_2 = $('<h4>');
            h3_2.addClass('marginBot bold')
            h3_2.html('Réservation(s) validée :')
            h3_2.appendTo(div10)

            if (serie.pret_valider == null) {
                var div = $('<div>');
                div.addClass('marginBot')
                div.html("Aucune réservation prévu")
                div.appendTo('.reservation' + demande.id_pret);
            } else {
                for (var i = 0; i < serie.pret_valider.length; i++) {
                    var pret = traitementPretEnCours(serie.pret_valider[i]);
                }
            }
            function traitementPretEnCours(pretActif) {

                var div = $('<div>');

                var p1 = $('<p>');
                p1.addClass('marginBot2');
                p1.html(pretActif.nom_enseignant + ' :')
                p1.appendTo(div)

                var p2 = $('<p>');
                p2.addClass('marginBot');
                p2.html('début: ' + pretActif.date_debut + ' / fin: ' + pretActif.date_fin)
                p2.appendTo(div)

                div.appendTo('.reservation' + demande.id_pret);
            }


        }

        if (demande.messages == null) {
            var div = $('<div>');
            div.addClass('marginBot')
            div.html("Aucun message disponible")
            div.appendTo('.messages' + demande.id_pret);
        } else {
            for (var i = 0; i < demande.messages.length; i++) {

                var message = traitementMessage(demande.messages[i]);

            }
        }

        function traitementMessage(message) {

            var div = $('<div>');
            div.addClass('marginBot')

            var p1 = $('<p>');
            p1.addClass('marginBot2');
            p1.html(message.user + ' :')
            p1.appendTo(div)

            var p2 = $('<p>');
            p2.html(message.message)
            p2.appendTo(div)

            div.appendTo('.messages' + demande.id_pret);
        }
    }

    function addBtnProf() {

        var form2 = $('<form>');
        form2.addClass('detailSup');

        var h4_4 = $('<h4>');
        h4_4.addClass('marginBot bold');
        h4_4.html('Action sur la demande de pret :');
        h4_4.appendTo(form2);

        var div18 = $('<div>');
        div18.addClass('row avecAlign maxWidth marginBot');
        div18.appendTo(form2);

        if (demande.statut_pret == "Require décision") {

            var btn2 = $('<button>');
            btn2.addClass('btn valider');
            btn2.html("Concentir au pret");
            btn2.appendTo(div18);

        } else if (demande.statut_pret == "Require vérification") {

            var btn2 = $('<button>');
            btn2.addClass('btn warning');
            btn2.html("Avis favorable");
            btn2.appendTo(div18);
        }
        var btn1 = $('<button>');
        btn1.addClass('btn refuser');
        btn1.html('Refuser');
        btn1.appendTo(div18);

        form2.appendTo('#action' + demande.id_pret);
    }

    return article;
}

function readDemande(demandes) {

    for (var i = 0; i < demandes.length; i++) {

        var demande = demandes[i];
        var id_serie = demande.serie.id_serie;

        for (var u = 0; u < series.length; u++) {
            var serie = series[u];
            if (serie.id_serie == id_serie) {
                var demande_pret = newDemande(demande, serie);
            }
        }
        demande_pret.appendTo('.resultat');
    }
}
