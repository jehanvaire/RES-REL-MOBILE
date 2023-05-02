# Lancer l'application sur un téléphone android

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/62b4642f1631448b978ecbfb4d80ae2f)](https://app.codacy.com/gh/jehanvaire/RES-REL-MOBILE?utm_source=github.com&utm_medium=referral&utm_content=jehanvaire/RES-REL-MOBILE&utm_campaign=Badge_Grade)

## Objectif : tester l'application, en pouvant recharger rapidement les nouveaux contenus.

# Prerequis

## 1. Avoir une version de Node (LTS)

Télécharger Node 18.14.1

[Node.js](https://nodejs.org/en/)

Pas obligé d'installer Chocolately

Puis lancer la commande `npm -v`

## 2. Installer Expo

Lancer la commande `npm install -g expo-cli`

(Vérifier dans le fichier `package.json` la version d'expo-cli)

Si la version est inférieure dans ce fichier, installer expo-cli localement (sans le -g)

## 3. Installer toutes les dépendance

Installer yarn avec la commande `npm install -g yarn`

Lancer la commande `yarn` (dans le dossier du projet)

## 4. Installer Java 11

Installer Java 11 depuis ce [lien](https://www.oracle.com/fr/java/technologies/javase/jdk11-archive-downloads.html)

Définir la variable d'environnement JAVA_HOME en suivant ce [lien](https://confluence.atlassian.com/conf711/setting-the-java_home-variable-in-windows-1044782804.html)

## 5. Installer un sdk Android

Installer Android studio (obligatoire si vous êtes sur windows)

Aller dans le sdk manager, pour installer la version 12L (sv2)

### Ajouter la variable d'environnement ANDROID_HOME (Windows)

Aller dans Le fichier appData:

- Windows + R
- écrire %appdata%
- Aller dans le dossier Local/Android/Sdk
- Copier le chemin du dossier
- Ajouter la variable d'environnement ANDROID_HOME avec comme valeur le chemin copié précedemment
- Ajouter à la variable d'environnement PATH le chemin du sdk + platform-tools

### Définir le chemin du sdk pour expo

Dans le dossier android (du projet)

- Créer un fichier `local.properties`
- Ajouter la ligne `sdk.dir = {chemin du sdk}` (remplacer les `/` par `\\`)

## 6. Tester l'application

Activer le débogage USB

(Voir ce [lien](https://www.frandroid.com/comment-faire/tutoriaux/229753_questcequelemodedebogageusb) pour voir comment faire)

Pour lancer l'application, lancer la commande `yarn run android`
