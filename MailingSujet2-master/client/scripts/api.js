var jwt = require('jsonwebtoken')

const ERREUR = (erreur) => {
	console.log(erreur)
}

// region API classe qui va intéragir avec l'api et qui va contenir l'utilisateur courant
class API{
	
	//region constructor
	constructor(){
		this.url = 'http://localhost:8080/api/v1/'
		this.user = {token: '', email:'' }
	}
	//endregion
	
	//region isConnected
	isConnected(){
		return this.user.token != undefined
	}
	//endregion

	//region connexion
	connexion(data, succes, erreur = ERREUR){
		$.ajax({
			url: this.url + "login",
			type: "post",
			data: data
		})
			.done((data) => {
				this.user.token = data.data
				try{
					var decoded = jwt.verify(data.data, 'uneCleBienSecrete')
					this.user.email = decoded.email
				}catch(err){
					console.log('api.js -> 38 : erreur', err )
					Materialize.toast('<span>Identifiants incorrects<span>', 2500, "erreur")
				}
				succes(data)
			})
			.fail((erreur) => {
				console.log(erreur)
				Materialize.toast('<span >Identifiants incorrects<span>', 2500, "erreur")
			})
	}
	//endregion

	//region deconnexion
	deconnexion(succes, erreur = ERREUR){
		$.ajax({
            url: this.url + "logout",
            type: "post",
            data: this.user
        })
            .done((data) => {
				succes()
                this.user = {}
            })
            .fail((error) => {
                erreur(erreur)
			})
	}
	//endregion

	//region request
	request(type, url, succes, erreur = ERREUR, data = null){
        $.ajax({
            url: this.url + url,
            type: type,
            data: data,
            beforeSend: (xhr) => {
                if (this.user.token) {
				   xhr.setRequestHeader('Authorization', this.user.token)
                } else {
					// pas de token
				}
            }
        })
            .done((data) => { succes(data.data) })
            .fail((error) => { erreur(error) })
	}
	//endregion
}
//endregion
export default new API()