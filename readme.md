
# Guide de démarrage avec OpenLayers
Ce guide de démarrage rapide décrit quelques étapes de base nécessaires pour commencer à travailler avec OpenLayers : création d’une carte de base, ajout de couches de raster et de vecteurs et de caractéristiques de style.

OpenLayers facilite la mise en place d’une carte dynamique dans n’importe quelle page Web. Il peut afficher des tuiles de cartes, des données vectorielles et des marqueurs chargés depuis n’importe quelle source. OpenLayers a été développé pour favoriser l’utilisation d’informations géographiques de toutes sortes. C’est une bibliothèque JavaScript totalement gratuite, Open Source, publiée sous licence BSD 2-clause (également connue sous le nom de FreeBSD).
# Contents

- Concepts de base
- Créer une carte de base
- Ajouter des couches raster
 -Ajouter des couches vectorielles
- Appliquer le style aux entités
- Travailler avec les événements
# Concepts de base
Avant de commencer à travailler avec OpenLayers, il est utile de comprendre les concepts de base d’OpenLayers :

- Map
La carte map est le composant principal d’OpenLayers. Pour qu’une map soit rendue, une vue view , une ou plusieurs couches layers, et un conteneur cible sont nécessaires.

- View
La view détermine la façon dont la carte est rendue. Elle est utilisée pour définir la résolution, l’emplacement central, etc. C’est comme une caméra à travers laquelle nous regardons le contenu de la carte.

- Layers
Les layers peuvent être ajoutées à la carte dans un ordre empilé. Les couches peuvent être soit raster layers (images), soit vector layers (points/lignes/polygones).

- Source
Chaque couche a une source, qui sait charger le contenu de la couche. Dans le cas des couches vectorielles, sa source lit les données vectorielles à l’aide d’une classe format (par exemple GeoJSON ou KML) et fournit à la couche un ensemble d’entités.

- Features
Les Features (entités) représentent des choses du monde réel et peuvent être rendues à l’aide de différentes géométries (comme le point, la ligne ou le polygone) à l’aide d’un style, qui détermine son apparence (épaisseur de ligne, couleur de remplissage, etc.).
# Installation ce projet
-npm install
-npm start
