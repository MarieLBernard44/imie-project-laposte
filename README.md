# imie-project-laposte
IMIE project that triggers deliveryman' informations

Prérequis :

NodeJS
Npm
Installation :

git clone https://github.com/florianbouchet/imie-project-laposte.git
cd imie-project-laposte
npm i
Mise en place de la base de données (MarieDb)


Urls de l'API
Ci dessous, les routes de l’application web :

VERBES	URL	ACTION
GET	/	Permet de lister les livreurs et d'afficher leur fréquence de livraison
POST	/:id	Permet la création d'un colis livré associé à un livreur.
