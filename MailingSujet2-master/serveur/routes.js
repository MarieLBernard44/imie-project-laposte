const express = require("express");
const router = express.Router();
var bd = require("./model.js")

// get api/v1/mailing/ => liste d'email
router.get('/', (req, res) => {
    bd.all( "email", (data) => {
        res.setHeader('Content-Type', 'application/json')
        var resu = []
        data.forEach((mail,i)=>{
            var email = mail
            email.date = getDateFormat(new Date(email.date))
            resu.push(email)
        })
        res.send(JSON.stringify({ data: resu }))
    })
})

// post api/v1/mailing/ => on ajoute un email
router.post('/', (req, res) => {
    var mailing = req.body
    console.log('routes.js -> 15 : mailing', mailing)
    bd.insertMailling(mailing, (data) => {
        bd.getLastId('email', (data) => {
            var resu = data[0]
            resu.date = getDateFormat(new Date(resu.date))
            res.setHeader('Content-Type', 'application/json')
            res.send(JSON.stringify({ data: resu }))
        })
    })
})

// put api/v1/mailing/:id => on edite un email
router.put('/:id', (req, res) => {
    var mailing = req.body
    var id = req.params.id
    bd.updateMailById(id, mailing, (data) => {
        bd.allById("email", id, (data) => {
            res.setHeader('Content-Type', 'application/json')
            var resu = data[0]
            resu.date = getDateFormat(new Date(resu.date))
            res.send(JSON.stringify({ data: resu }))
        })
    })
})

// delete api/v1/mailing/:id => on delete un email
router.delete('/:id', (req, res) => {
    var id = req.params.id
    bd.deletedAllById("email", id, (data) => {
        res.status(200).send("suppression ok")
    })
})

// get api/v1/mailing/:id/send => on envoie un email
router.get('/:id/send', (req, res) => {
    var id = req.params.id
    bd.allById('email', id, (email)=>{
        bd.all("clients", (clients) => {
            console.log('routes.js -> 62 : envoie', email  )
            console.log('routes.js -> 63 : clients', clients )
            clients.forEach((client, i)=>{
                console.log(" ----------------------- ")
                console.log(" FROM: noreply.assurance@email.com ")
                console.log(" TO: ", client.email)
                console.log(" OBJET: ", email[0].sujet)
                console.log(" CORPS: Bonjour",client.prenom, client.nom)
                console.log("", email[0].contenu)
                console.log(" ----------------------- ")

            })
            res.status(200).send("envoie ok")
        })
    })
})

//methode pour mettre en forme la date
var getDateFormat = (date) => {
    return date.getFullYear() + "-" + deuxNb(1 + date.getMonth()) + "-" + deuxNb(date.getDate())
}

var deuxNb = (d) => {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

module.exports = router;