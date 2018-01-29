# MailingSujet2

Projet dans le cadre de notre formation à l'IMIE. Ce projet doit mettre en oeuvre une API pour la gestion de campagnes de mailing pour une agence d'assurance.

Il doit être possible de :

* Lister les campagnes de mailing
* Supprimer une campagne
* Rédiger un mail (sujet, contenu, date d'envoi)

Pour utiliser l’api, il faudra être authentifié (identifiant: test, mot de passe: test)

## Installation

  #### Etape 1 :
  * Clonez le projet MailingSujet2
  #### Etape 2 :
  * Installez node.js et MySQL.
  #### Etape 3 :
   * Allez dans le dossier BD de l'application, vous y trouverez le "create.sql" permettant créer la base de données et "insert.sql" permertant d'insérer les données dans la base.
  #### Etape 4 :
  * Une fois que vous avez mis en place la base de données, dans le dossier serveur de l'application changez l'identifiant, le mot de passe et l'host de MySQL si nécessaire dans le fichier setting (Par defaut MySQL a pour identifiant: "root", mot de passe: "" et host: "localhost").
  #### Etape 5 :
  * Ouvrez l'invite de commande et allez dans le dossier "serveur" de l'application.
  #### Etape 6 :
  * Exécutez la commande suivante: npm install
  * Ensuite exécutez la commande suivante: node ./server.js
  #### Etape 7: 
  * Le serveur node de notre application est donc maintenant lancé.
  #### Etape 8 :
  * Allez sur votre navigateur à l'adresse: http://localhost:8080
  #### Etape 9 : 
  * Pour vous connecter à l'application vous trouverez ci-dessous les identifiants: 
  * Identifiant: test
  * Mot de Passe: test

## Installation avec Docker

  * Prochainement
  
## Modifications
  
  #### Client :
  * Avant la premiere modification allez grâce à l'invite de commande dans le dossier client de l'application et lancez la commande suivante: npm install.
  * Ensuite à chaque modification du JavaScript du client il faudra compililer avec la commande npm run compil dans le dossier client de l'application.


## Technologie utilisé

* [Node.Js](https://nodejs.org/en/) - Le service de serveur web.
* [Docker](https://www.docker.com/) - Déploiment facile d'applications.
* [MySQL](https://www.mysql.com/fr/downloads/) - Le service de base de données.
* [Express](http://expressjs.com/fr/) - Pour le serveur et la gestion des routes.
* HTML & CSS & ECMAScript 6 - Pour le front end.

## Versioning

Nous utilisons [GIT](https://git-scm.com/) pour le versioning. Pour les versions disponibles, voir [MailingSujet2](https://github.com/DLatouche/MailingSujet2). 

## Auteurs

* **Dorian LATOUCHE** - [DLatouche](https://github.com/DLatouche)
* **Valentin HADDAD** - [ValentinHaddad](https://github.com/ValentinHaddad)
* **Irvin ZOURE** - [irvinzoure](https://github.com/irvinzoure)
* **Dylan GOSSELIN** - [Gsln44](https://github.com/Gsln44)

Voir aussi la liste des [contributeurs](https://github.com/DLatouche/MailingSujet2/graphs/contributors) qui ont participé à ce projet.
