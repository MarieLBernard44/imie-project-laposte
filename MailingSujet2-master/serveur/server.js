const express = require("express")
const app = express()
const bodyParser = require("body-parser")
var bd = require("./model.js")
var jwt = require('jsonwebtoken')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('../client'))

	
//middleware
app.use('/api/v1/mailing',(req, res, next) => {
	console.log('server.js -> 13 : requete avec middlewate')
	//on recupere le token
	var token = req.get("Authorization");
	if(!token){
		console.log('server.js -> 19 : pas de Token ...')
		res.status(401).send("Authorization Required !")
	}else{
		try{
			// on check si le token est encore valide
			bd.findToken(token, (data)=>{
				var bdToken = data[0]
				var decoded = jwt.verify(token, 'uneCleBienSecrete')
				// on regarde si le token est en bd
				if(bdToken){
					// il y est, on regarde si il est pas périmé
					if(decoded.exp > Date.now()){
						// il est valide !
						console.log('server.js -> 31 : Token valide :D')
						next()
					}else{
						// pas valide :( donc on le supprime
						console.log('server.js -> 35 : Token Invalide :(')
						bd.deleteToken(token, ()=>{})
						res.status(401).send("Authorization Required !")
					}
				}else{
					console.log('server.js -> 41 : pas de Token en bd !')
					res.status(401).send("Authorization Required !")
				}
			})
		}catch(err){
			return next(err)
		}
	}
})

//route
app.use("/api/v1/mailing", require("./routes.js"))

// routes pour la connexion et deconnexion


// post api/v1/login pour se connecter
app.post('/api/v1/login', (req, res) => {
    var user = req.body
    bd.findUser(user, (data)=>{
        var resUser = data[0]
        if(resUser){
			console.log('server.js -> 59 : Connexion Ok')
            // la on créer le token de 24h, on le save et on envoie
            var token = jwt.sign({exp:Date.now() + (60*60) * 24,email:resUser.email}, 'uneCleBienSecrete');
            bd.setToken(token, (data)=>{
                res.setHeader('Content-Type', 'application/json')
                res.send(JSON.stringify({ data: token }))
            })
        }else{
			//on trouve pas l'user donc pas le droits
			console.log('server.js -> 68 : Connexion pas ok')
            res.status(401).send("Pas le droit, pas bien!")
        }
    })
})

// post api/v1/logout pour se deconnecter
app.post('/api/v1/logout', (req, res) => {
	var user = req.body
	bd.deleteToken(user.token, (data)=> {
		res.status(200).send("deconnexion ok")
	})
})

app.listen(8080)
console.log("-")
console.log("Serveur lancé. En écoute.")
console.log("-")
