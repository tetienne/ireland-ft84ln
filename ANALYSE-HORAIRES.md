# Analyse du planning — horaires d'ouverture, affluence, parkings

Étude des alternatives à itinéraire constant. **Les hôtels ne changent pas** : les points de
départ et d'arrivée de chaque journée sont ceux de `data.json` (Clondalkin, Furbo,
Ballynahinch, Athenry, Ennistymon, Banagher, Balbriggan). Seul l'ordre et l'heure des
visites sont remis en question.

---

## Le levier principal : le soleil se couche à 21h00, pas à 18h

Calcul des levers/couchers pour la semaine (algorithme NOAA, heure locale IST) :

| Date      | Galway      | Clifden     | Cliffs of Moher | Dublin      |
| --------- | ----------- | ----------- | --------------- | ----------- |
| Dim 16/08 | 06:18–21:04 | 06:22–21:09 | 06:21–21:05     | 06:07–20:53 |
| Lun 17/08 | 06:20–21:02 | 06:23–21:07 | 06:23–21:03     | 06:09–20:51 |
| Mar 18/08 | 06:22–21:00 | 06:25–21:04 | 06:24–21:01     | 06:11–20:49 |
| Mer 19/08 | 06:24–20:58 | 06:27–21:02 | 06:26–20:58     | 06:12–20:47 |
| Jeu 20/08 | 06:25–20:56 | 06:29–21:00 | 06:28–20:56     | 06:14–20:45 |
| Ven 21/08 | 06:27–20:53 | 06:30–20:58 | 06:29–20:54     | 06:16–20:48 |
| Sam 22/08 | 06:29–20:51 | 06:32–20:56 | 06:31–20:52     | 06:17–20:40 |
| Dim 23/08 | 06:31–20:49 | 06:34–20:53 | 06:33–20:50     | 06:19–20:38 |

Le planning actuel termine ses visites entre 17h45 et 18h30 tous les jours. **Il reste
2h30 à 3h de plein jour inutilisées chaque soir**, précisément au moment où les cars sont
repartis, où les parkings se vident et où la lumière est la plus belle.

La note « Sky Road : idéal au coucher du soleil vers 17-18h » dans `data.json` est fausse
de trois heures. Corriger cette hypothèse suffit à résoudre la moitié des problèmes
d'affluence de la semaine.

---

## Deux erreurs dures dans le planning actuel

### 1. J4 — Kylemore Abbey ouvre à 10h00, pas à 9h20

Le planning prévoit « 9h20 Kylemore Abbey (visite abbaye + jardins) 1h30 ». L'abbaye ouvre
à **10h00** en août (dernière entrée 17h00, fermeture 18h00). Départ de Clifden à 9h00 =
40 minutes d'attente devant un portail fermé, avec deux enfants.

### 2. J8 — le planning du retour est écrit pour un hôtel aéroport

Le J8 prévoit « réveil 5h00, hôtel → terminal 10 min, passage couvert ». Les conseils J7/J8
mentionnent encore le Maldron (« 267 m du terminal ») et le Crowne Plaza (« passage
couvert »). **La nuit est réservée à Balbriggan**, à ~30 km / ~30 min au nord de l'aéroport
par la M1. Et NewWay est un loueur **hors aéroport** : ils partagent un parking avec
Avis/Budget et font une navette jusqu'au terminal.

Chaîne réaliste pour un vol à 07h10 :

```
04h20  réveil
04h50  départ Balbriggan
05h20  dépôt NewWay, restitution voiture
05h45  navette → Terminal 1
05h45  bagages + sécurité
06h40  porte
```

C'est le seul point de la semaine où se tromper coûte un vol. **À confirmer auprès de
NewWay (+353 1 844 4199)** : dépôt tenu à 05h15 un dimanche ? fréquence de la navette à
cette heure ? procédure de dépôt de clés hors horaires ? Si le dépôt n'ouvre pas si tôt,
toute la matinée est à revoir — et rendre la voiture la veille au soir n'est pas une
solution ici, contrairement à ce que suggère la note J7 : depuis Balbriggan il faudrait un
taxi à 04h45 pour l'aéroport, cher et à réserver.

---

## Journée par journée

### J1 — Dim 16/08 · Aéroport → Dublin → Clondalkin

**Problème.** Entrer en voiture dans le centre de Dublin un dimanche après-midi, avec une
voiture de location récupérée 45 minutes plus tôt et une première conduite à gauche, pour
se garer dans le pire parking de la semaine. Temple Bar à 14h30 un dimanche d'août, c'est
le pic de foule.

**Alternative.** Aller directement à Clondalkin par la M50 (~30 min, pas de centre-ville),
déposer les bagages vers 14h00, puis **Luas ligne rouge** jusqu'au centre. Zéro parking
urbain, et le tram est une attraction en soi pour des enfants de 5 et 8 ans.

Inverser aussi l'ordre : St Stephen's Green et l'aire de jeux d'abord (15h00–16h30, pendant
qu'ils ont de l'énergie), balade photo à Temple Bar ensuite (16h45–17h30), dîner tôt,
retour en Luas.

### J2 — Lun 17/08 · Clondalkin → Athlone → Furbo

**Problème.** Départ 9h30 un lundi = fin de pointe sur la M50/N7. Et Galway centre de
14h15 à 16h30, c'est le pic de fréquentation *et* le pic tarifaire des parkings.

**Alternative.** Partir vers 9h45–10h00. Athlone 11h30 pour le déjeuner (Sean's Bar est
calme un lundi midi). Arrivée Furbo ~14h15, dépôt des bagages, **plage de Furbo /
Silverstrand 14h45–16h30** — gratuit, parking facile, les enfants se défoulent après
2h30 de route.

Puis Galway vers 17h15 : le stationnement en voirie est gratuit après 18h00, les
multi-étages sont moins chers en soirée, et les musiciens de rue de Shop Street sont à leur
meilleur entre 17h et 20h. Latin Quarter + Spanish Arch 17h30–19h00, McDonagh's à 19h00,
retour par la côte avec le coucher de soleil sur la baie.

Même contenu, parking moins cher et moins pénible, meilleure ambiance, plage en bonus.

### J3 — Mar 18/08 · Furbo → Connemara → Ballynahinch

**Problèmes.**

- Le parking de Dog's Bay est **minuscule** et décrit comme « quasi impossible » en été
  sans arriver tôt. Le planning y arrive à 11h25. Gurteen Bay, juste à côté, est le repli.
- Le parking de Clifden Castle fait ~8 places — plein à 16h00 en août.
- Sky Road à 16h45 : ni le coucher de soleil (21h04), ni une route calme. 16h–18h reste
  l'heure des cars et des camping-cars sur une voie unique.

**Alternative.**

```
08h45  départ Furbo
10h10  Dog's Bay (parking encore gagnable) — plage 1h30
11h50  Roundstone : village, atelier de bodhrán, déjeuner au port 12h15–13h30
14h00  check-in Ballynahinch (c'est sur la route) — sieste / repos 14h00–16h00
16h45  Clifden (la ville se vide, les day-trippers rentrent sur Galway)
17h15  Clifden Castle Walk (parking libre) 45 min
18h30  dîner à Clifden
19h45  Sky Road — vraie golden hour, route déserte, zéro car en face
21h20  retour Ballynahinch
```

Coût : ~30 min de conduite en plus (aller-retour Ballynahinch↔Clifden), mais en segments
courts et sans trafic. Le repos de 14h–16h est le vrai cadeau de la journée pour les
enfants.

*Variante sans ressortir* : enchaîner Clifden + château + Sky Road en un seul bloc
16h45–21h00 et ne faire le check-in qu'au retour — à condition de vérifier l'heure limite
de réception de l'hébergement de Ballynahinch.

### J4 — Mer 19/08 · Ballynahinch → Kylemore → Connemara NP → Salthill → Athenry

C'est la journée la plus abîmée : l'erreur d'ouverture de Kylemore, deux sites qui exigent
tous les deux d'arriver tôt, et un temps de conduite sous-estimé (le planning s'arrête à
Galway alors que le lit est à Athenry, ~25 min plus à l'est).

**Affluence.** Kylemore : les cars arrivent en continu de la fin de matinée jusqu'à ~15h.
Le plus calme, c'est à l'ouverture ou après 15h. Connemara NP : le parking gratuit de
Letterfrack se remplit vite en été, débordement le long de la route d'accès.

**Alternative — Kylemore à l'ouverture.**

```
09h20  départ Ballynahinch
09h50  arrivée Kylemore, entrée à 10h00 pile
10h00  abbaye + église (le goulot d'étranglement) puis jardin clos en navette → 12h00
12h15  déjeuner Letterfrack
13h20  Connemara NP — le parking se libère après le déjeuner
13h30  Sruffaunboy (1,5 km, platelage, ok pour la petite) ou Lower Diamond Hill (3 km)
15h20  route vers Salthill (~1h45)
17h10  Salthill : promenade, kicker la plaque, glace, dîner
20h15  Athenry
```

**Arbitrage à assumer** : journée longue (~2h30 de conduite) et l'Atlantaquaria ne rentre
plus. Mais c'est un aquarium à 45 € explicitement classé plan B pluie, et Salthill en
lumière du soir vaut mieux que Salthill à 15h15. Si il pleut : on inverse, Atlantaquaria
(1h, couvert) à la place de Diamond Hill.

**Variante plus calme** : supprimer complètement le Connemara NP, faire Kylemore
10h00–12h30 en incluant le sentier boisé, et être à Salthill à 15h30. Diamond Hill est le
poste le plus sacrifiable de la semaine si les enfants fatiguent.

### J5 — Jeu 20/08 · Athenry → Burren → Cliffs of Moher → Ennistymon

**C'est ici que se trouve le plus gros gain de la semaine.**

**Problèmes.**

- Cliffs of Moher à 13h45–15h15 : c'est exactement le pic. Le site est le plus fréquenté
  entre 11h et 16h — ce qui correspond aussi à la fenêtre tarifaire haute officielle. Le
  site est ouvert **08h00–21h00** en août et se vide après 16h, quand les cars repartent.
- Poulnabrone à 11h45 : en pleine fenêtre des cars (10h–15h, un bus toutes les ~20 min les
  jours chargés). Accès libre et gratuit — donc faisable à n'importe quelle heure.
- **Le parking fermier à 2 € n'existe plus.** Le Clare County Council l'a fermé le
  23/07/2025, et le Cliffs of Moher Coastal Walk depuis Liscannor est fermé depuis
  septembre 2024. La ligne « Parking Cliffs of Moher (fermier) — 2 EUR » du budget est
  caduque : le billet officiel, qui inclut le parking, est désormais la seule entrée en
  voiture.
- Caherconnell : ouvert 10h00–17h00 en juillet/août, visites du fort à 10h15, 12h00, 13h30
  et 14h15, dernière visite 30 min avant la fermeture. Réservation vivement conseillée —
  le site se réserve en moyenne 37 jours à l'avance.

**Alternative — inverser la journée.**

```
08h45  départ Athenry
09h50  Poulnabrone (avant la vague de cars) — 20 min suffisent
10h15  Caherconnell : visite du fort + démo chiens de berger + agneaux (~1h30–2h)
12h30  pique-nique dans le Burren ou déjeuner à Ennistymon
14h00  check-in Ennistymon
14h30  plage de Lahinch — la partie la plus chaude de la journée, baignade surveillée,
       aire de jeux à côté → 17h00
17h30  Cliffs of Moher, créneau tardif réservé : cars partis, tarif plus bas, falaises
       orientées ouest donc lumière optimale, site ouvert jusqu'à 21h00
20h00  dîner à Lahinch
```

Lahinch↔Cliffs fait ~12 min dans chaque sens : l'aller-retour coûte 25 min pour un gain
d'affluence énorme.

**Deux corrections de budget** : les moins de 12 ans sont gratuits aux Cliffs — c'est 2
adultes qui paient, pas 4 personnes. Et le parking à 2 € est à remplacer par le billet
officiel horodaté, à réserver en ligne (moins cher qu'au guichet).

**À vérifier vous-mêmes** : l'horaire exact des démonstrations de chiens de berger. Le site
de Caherconnell est inaccessible depuis cet environnement (bloqué par la politique réseau),
et les sources tierces se contredisent — certaines annoncent une démo unique à 14h00,
d'autres plusieurs par jour en haute saison. **Réservez d'abord un créneau de démo, puis
construisez la journée autour**, et non l'inverse : le planning actuel suppose une démo
disponible dès 10h06, ce qui n'est pas garanti.

### J6 — Ven 21/08 · Ennistymon → Lahinch → Ennis → Banagher

**Problème.** Birr Castle ferme à 18h00, dernière entrée 17h00. Le planning y arrive à
15h30 : 2h30 pour un domaine de 50 hectares avec la plus grande aire de jeux du séjour.
C'est la dernière vraie journée « pour les enfants » et c'est la plus comprimée. Par
ailleurs, si le J5 révisé leur a déjà offert une après-midi de plage, la matinée plage du
J6 fait doublon.

**Alternative.**

```
09h00  plage courte 09h00–10h15 (ou rien, si le J5 a suffi)
10h30  départ
11h10  Ennis — déjeuner 11h30–12h45. Ennis est agréable mais c'est l'étape la moins
       typée du séjour : à traiter comme une pause déjeuner, pas comme une visite
14h15  Birr Castle → 3h30 sur place au lieu de 2h30
18h20  Banagher
```

Le domaine ouvre à 09h00 : il n'y a aucune raison d'y arriver en fin d'après-midi.

**À vérifier** : le Treehouse Playground a été fermé un temps, avec une réouverture
attendue en 2026. C'est la raison principale de venir — un appel avant de compter dessus.

### J7 — Sam 22/08 · Banagher → Trim → Hill of Tara → Balbriggan

**Problèmes.**

- **C'est un samedi**, le jour le plus chargé de la Boyne Valley (excursionnistes
  irlandais). Or la visite guidée du donjon de Trim **ne se réserve pas en ligne**, se fait
  par groupes de ~15 personnes, dure 45–50 min, et les billets du jour partent en
  juillet-août. Arriver à 10h30 fait courir le risque de perdre les créneaux du matin.
- L'après-midi (« piscine de l'hôtel si disponible ») est faible avec un coucher de soleil
  à 20h40 et la mer à 10 minutes.

**Alternative.**

```
08h15  départ Banagher
09h55  Trim, au guichet pour l'ouverture à 10h00 — premier créneau disponible du donjon
       (moins de 18 ans gratuits sur les sites OPW en août : 2 × 5 €)
       enceinte + balade le long de la Boyne en attendant le créneau
12h30  déjeuner à Trim
14h00  Hill of Tara — gratuit, site toujours ouvert, centre d'accueil jusqu'à 18h00
       (dernière admission 17h15). C'est l'amortisseur idéal : si Trim déborde, Tara
       s'en moque
16h00  Balbriggan
17h00  Ardgillan Demesne (entre Balbriggan et Skerries) : parc gratuit, grande aire de
       jeux avec vue mer jusqu'aux Mourne Mountains, sentier des fées
       — ou Skerries : port, Red Island playground, dîner sur le front de mer
```

Bien meilleure dernière soirée qu'un couloir d'hôtel, et à 10 min du lit. Préparer les
valises après le dîner, coucher tôt : le réveil est à 04h20 (voir plus haut).

---

## Points transverses

**Festivals — bonne nouvelle, la semaine est dégagée.** Tous les gros événements de Galway
se terminent avant leur arrivée : Galway Races 27/07–02/08, Arts Festival 13–26/07, Pride
09–15/08 (défilé le 15), Cruinniú na mBád à Kinvara 07–09/08. Rien à réaménager de ce côté.

**Heritage Card : ne pas l'acheter.** À 40 €/adulte, avec les enfants de moins de 12 ans
déjà gratuits, le seul site OPW payant de l'itinéraire est Trim Castle à 5 €/adulte — et en
août les moins de 18 ans y sont gratuits. La carte ne se rentabilise que s'ils ajoutent Brú
na Bóinne (Newgrange), qui n'est pas au programme.

**À réserver en ligne dès maintenant :**

1. Cliffs of Moher — créneau tardif (17h30 ou 18h00), moins cher et moins fréquenté
2. Caherconnell — autour d'un horaire de démo confirmé (se réserve ~37 jours à l'avance)
3. Kylemore Abbey — pour éviter la file du guichet à l'ouverture

**Impossible à vérifier depuis cet environnement** (politique réseau : `caherconnell.com`,
`cliffsofmoher.ie`, `heritageireland.ie`, `discoverireland.ie` et l'API OSRM renvoient tous
403) :

- les horaires exacts des démonstrations de chiens de berger à Caherconnell
- les horaires du dépôt NewWay et de sa navette au petit matin
- l'état d'ouverture du Treehouse Playground de Birr en 2026
- **les temps de conduite des trajets modifiés** : les durées OSRM déjà enregistrées dans
  `data.json` restent valables, mais les nouveaux segments proposés ici (aller-retours
  Ballynahinch↔Clifden et Lahinch↔Cliffs, étapes vers Athenry et Balbriggan) sont des
  estimations géographiques, pas des mesures OSRM. À revérifier avec la commande de
  `CLAUDE.md` avant d'arbitrer.

**Cohérence de `data.json` à reprendre**, indépendamment de l'affluence : les durées de
conduite proviennent de l'itinéraire v3 (nuits à Galway / Clifden / Lahinch / Birr) alors
que les hôtels réservés sont Furbo, Ballynahinch, Athenry, Ennistymon, Banagher et
Balbriggan. Plusieurs journées sont donc sous-estimées de 15 à 30 minutes, et les conseils
J7/J8 décrivent encore un hôtel aéroport.
