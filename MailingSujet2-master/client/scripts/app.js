import API from './api.js'

$(document).ready(() => {

    //region INITIALISATION des composants
    $('.modal').modal({ dismissible: false })
    $('.datepicker').pickadate({
        firstDay: 1,
        labelMonthSelect: 'Selectionner le mois',
        labelYearSelect: 'Selectionner une année',
        monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekdaysFull: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        weekdaysLetter: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        today: 'Aujourd\'hui',
        clear: 'Réinitialiser',
        close: 'Fermer',
        format: 'yyyy-mm-dd',
        closeOnSelect: true
    });

    var mapMailing = new Map()
    var currentId = 0
    //endregion

    //region EVENEMENT

    //region Quand on clique sur connexion (en haut a droite, affiche la popin de connexion)
    $('#connexion').on('click', (e) => {
        e.preventDefault()
        // L'utilisateur est connecté
        if (API.isConnected()) {
            // On déconnecte l'utilisateur
            API.deconnexion(
                (data) => {
                    $('#connexion').text("Connexion")
                    $('#modal').modal('close')
                    Materialize.toast('<span>Déconnexion réussie<span>', 2500, "succes")
                    let html = setlisteHtml([])
                    $("#listeMailing").html(html)
                    $('#modal').modal('open')
                }
            )
        } else {
            // On ouvre la modal de connexion
            $('#modal').modal('open')
        }
    })
    //endregion

    //region Quand on valide le form pour se connecter
    $('#tryConnexion').on('click', (e) => {
        e.preventDefault()
        // On check le formulaire de connexion
        let form = {
            email: $('#username').val(),
            mdp: $('#password').val()
        }
        if (form.email.length > 0 && form.mdp.length > 0) {
            // on lance la connexion
            connexion(form)
        } else {
            // on affiche une erreur
            Materialize.toast('<span>Identifiants incorrects<span>', 2500, "erreur")
        }
    })
    //endregion

    //region click ajouter mailing
    $('#ajouter').on('click', (e) => {
        e.preventDefault()
        $('#modalAjout').modal('open')
    })
    //endregion

    //region valider ajout mailing
    $('#ajouterAjouter').on('click', (e) => {
        e.preventDefault()
        let mailing = {
            sujet: $('#objet').val(),
            date: $('#dateEnvoie').val(),
            contenu: $('#contenu').val()
        }
        if (mailing.sujet.length > 0 && mailing.date.length > 0 && mailing.contenu.length > 0) {
            addMailing(mailing)
        } else {
            Materialize.toast('<span>Champs incomplets<span>', 2500, "erreur")
        }
    })
    //endregion

    //region annuler ajout mailing
    $('#ajouterAnnuler').on('click', (e) => {
        e.preventDefault()
        $('#modalAjout').modal('close')
    })
    //endregion

    //region addEventListener
    var addEventToList = () => {
        //region modifier mail
        $('.btnEdi').on('click', (e) => {
            e.preventDefault()
            let id = parseInt(e.target.dataset.id)
            currentId = id
            var mail = mapMailing.get(id)

            //on met les valeurs du mailing
            $('#objetModifier').val(mail.sujet)
            $('#dateEnvoieModifier').val(mail.date)
            $('#contenuModifier').val(mail.contenu)
            $("#modalModifier").modal('open')
            Materialize.updateTextFields()
        })
        //endregion

        //region supprimer mail
        $('.btnDel').on('click', (e) => {
            e.preventDefault()
            let id = e.target.dataset.id
            delMailing(id)
        })
        //endregion

        //region btnSend
        $('.btnSend').on('click', (e) => {
            e.preventDefault()
            let id = parseInt(e.target.dataset.id)
            sendEmail(id)
        })
        //endregion
    }
    //endregion

    //region modifierModifier
    $("#modifierModifier").on('click', (e) => {
        e.preventDefault()
        let mailing = {
            sujet: $('#objetModifier').val(),
            date: $('#dateEnvoieModifier').val(),
            contenu: $('#contenuModifier').val()
        }
        if (mailing.sujet.length > 0 && mailing.date.length > 0 && mailing.contenu.length > 0) {
            editMailing(mailing)
        } else {
            Materialize.toast('<span>Champs incomplets<span>', 2500, "erreur")
        }
    })
    //endregion

    //region modifierAnnuler
    $("#modifierAnnuler").on('click', (e) => {
        e.preventDefault()
        $("#modalModifier").modal('close')
    })
    //endregion

    //endregion

    //region FUNCTION

    //region on demande à lapi de se connecter
    var connexion = (data) => {
      
        API.connexion(data,
            (data) => {
                $('#connexion').text("Déconnexion")
                $('#modal').modal('close')
                getListmailing()
                Materialize.toast('<span">Connexion réussie<span>', 2500, "succes")
            },
            (error) => {
                console.log('app.js -> 65 : erreur', error)
                Materialize.toast('<span>Identifiants incorrects<span>', 2500, "erreur")
            }
        )
    }
    //endregion

    //region addMailing
    var addMailing = (mailing) => {
        API.request("post", "mailing", (data) => {
            Materialize.toast('<span>Mailing ajouté<span>', 2500, "succes")
            $("#modalAjout").modal('close')
            mapMailing.set(data.id, data)
            let liste = []
            mapMailing.forEach((mail, i) => {
                liste.push(mail)
            })
            let html = setlisteHtml(liste)
            $("#listeMailing").html(html)
            addEventToList()
        },
            (error) => {
                Materialize.toast('<span>Erreur lors de l\'ajout du mailing<span>', 2500, "erreur")
                console.log('app.js -> 119 : erreur', error)
            }, mailing)
    }
    //endregion

    //region sendEmail
    var sendEmail = (id) => {
        API.request("get", "mailing/" + id + "/send", (data) => {
            Materialize.toast('<span>Mailing envoyé<span>', 2500, "succes")
        },
            (error) => {
                Materialize.toast('<span>Erreur lors de l\'envoi du mailing<span>', 2500, "erreur")
                console.log('app.js -> 119 : erreur', error)
            })
    }
    //endregion

    //region editMailing
    var editMailing = (mailing) => {
        API.request("put", "mailing/" + currentId,
            (data) => {
                Materialize.toast('<span>Mailing modifier<span>', 2500, "succes")
                $("#modalModifier").modal('close')
                mailing.id = currentId
                mapMailing.set(currentId, mailing)
                let liste = []
                mapMailing.forEach((mail, i) => {
                    liste.push(mail)
                })
                let html = setlisteHtml(liste)
                $("#listeMailing").html(html)
                addEventToList()
            },
            (error) => {
                Materialize.toast('<span>Erreur lors de l\'ajout du mailing<span>', 2500, "erreur")
                console.log('app.js -> 119 : erreur', error)
            }, mailing)
    }
    //endregion

    //region delMailing
    var delMailing = (id) => {
        API.request("delete", "mailing/" + id, (data) => {
            Materialize.toast('<span>Mailing supprimé<span>', 2500, "succes")
            mapMailing.delete(parseInt(id))
            let liste = []
            mapMailing.forEach((mail, i) => {
                liste.push(mail)
            })
            let html = setlisteHtml(liste)
            $("#listeMailing").html(html)
            addEventToList()
        },
            (error) => {
                Materialize.toast('<span>Erreur lors de la suppression du mailing du mailing<span>', 2500, "erreur")
                console.log('app.js -> 119 : erreur', error)
            })
    }
    //endregion

    //region on demande à l'api la liste des mailing
    var getListmailing = () => {
        API.request("get", "mailing", (data) => {
            mapMailing = new Map()
            data.forEach((mail, i) => {
                mapMailing.set(mail.id, mail)
            })

            let html = setlisteHtml(data)
            $("#listeMailing").html(html)
            addEventToList()
        },
            (error) => {
                console.log('app.js -> 140 : erreur', error)
                Materialize.toast('<span>Erreur lors de la récupération des mailings<span>', 2500, "erreur")
            })
    }
    //endregion

    //region setListHtml
    var setlisteHtml = (liste) => {
        let html = ''
        liste.forEach((mail, i) => {
            let btnMod = '<a class="btnEdi btn btn-floating btn-large orange"><i data-id="' + mail.id + '" class="large material-icons">mode_edit</i></a>'
            let btnSupp = '<a class="btnDel btn btn-floating btn-large red"><i data-id="' + mail.id + '" class="large material-icons">delete</i></a>'
            let btnEnv = '<a class="btnSend btn btn-floating btn-large blue"><i data-id="' + mail.id + '" class="large material-icons">email</i></a>'
            html += '<tr><td>' + mail.sujet + "</td><td>" + mail.date + '</td><td>' + btnEnv + btnMod + btnSupp + '</td></tr>'
        })
        return html
    }
    //endregion

    //endregion

    //region MAIN

    $('#modal').modal('open')

    //endregion
})