# Projet co-libris

Application créer pour facilité l'échange de séries entre les différents collèges du 64

## Dépendances

- apt
- npm (version 5.0.6)
- nodeJS (version 8.11.2)
- mongoDB

## Installation

- bdd_co-libris (base de données disponible sur demande)
- mongoDB (application mongoDB téléchargeable sur le site officiel)
- master (branche "master")

#### 1/ update apt :

```

$ sudo apt-get update

```

#### 2/ installation de nodeJS

```

$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

$ sudo apt-get install -y nodejs

```

#### 3/ installation de npm

```

$ sudo apt-get install npm

```

#### 4/ mise en place des fichier

    - créer un dossier "projet_co-libris" à la racine de votre disque dur (C:/)

    OU

    - changer l'adresse de mongoDB et de la bdd dans le fichier ".bat" qui se situe à la racine du "master"

par default :

```

"C:\projet_co-libris\mongoDB\bin\mongod.exe" --dbpath "C:\projet_co-libris\bdd_co-libris"

```     

#### 5/ se mettre dans le dossier racine du projet (dans notre cas c'est "master") puis tapez la commande suivante

```

$ npm install

```

## Lancement de l'application

#### Ouvrir le server mongoDB en double cliquant sur le fichier .bat

#### Dans le terminal se mettre à la racine de "master" et taper 

```

$ npm start

```

## Enfin ouvrir le navigateur à l'adresse `http://localhost:8080/docu_recherche`

