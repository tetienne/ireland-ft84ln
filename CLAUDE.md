# Ireland Road Trip 2026 — Projet de voyage

## Contexte
Voyage en famille (2 adultes + 2 enfants de 5 et 8 ans) en Irlande, cote ouest / Wild Atlantic Way.
- **Dates** : 16-23 aout 2026 (7 nuits, 8 jours)
- **Vol aller** : Ryanair FR9777, Nimes (FNI) → Dublin (DUB), 11h10-12h40
- **Vol retour** : Ryanair FR9776, Dublin (DUB) → Nimes (FNI), 07h10-10h30
- **Voiture** : NewWay, Dublin Airport, 16/08 13h00 → 23/08 07h00

## Contraintes strictes
- **Max ~2h de conduite par jour** (tolerance ~2h15-2h30 si trajet coupe en segments < 1h15)
- **Derniere nuit obligatoirement < 30 min de l'aeroport** (hotel type Crowne Plaza Dublin Airport)
- **Arrivee aeroport J8 a 5h30** (reveil ~5h00)
- Pas de fermes pedagogiques (on a les memes en France)
- Privilegier les experiences **typiquement irlandaises**

## Itineraire final v2 (temps OSRM verifies — optimise J5/J6)

| Jour | Date | Trajet | Conduite | Nuit |
|------|------|--------|----------|------|
| J1 | Dim 16/08 | Airport → Dublin | **30 min** | Dublin |
| J2 | Lun 17/08 | Dublin → Galway (via dejeuner Athlone) | **2h34** (1h30+1h04) | Galway |
| J3 | Mar 18/08 | Galway → Aillwee → Poulnabrone → Cliffs → Doolin | **1h46** | Doolin |
| J4 | Mer 19/08 | Doolin → Lahinch → Galway | **~1h19** | Galway (2e nuit) |
| J5 | Jeu 20/08 | Galway → Roundstone → Clifden → Sky Road | **~1h31** | Clifden |
| J6 | Ven 21/08 | Clifden → Athlone (via Maam Cross) | **~2h06** | Athlone |
| J7 | Sam 22/08 | Athlone → Trim Castle → Hill of Tara → Airport hotel | **2h16** | Airport hotel |
| J8 | Dim 23/08 | Hotel → Terminal | **5 min** | — |

### Detail des troncons OSRM (minutes)
```
J1: Airport→Dublin(30)
J2: Dublin→Athlone(90) + Athlone→Galway(64) — autoroute M6, dejeuner a Athlone
J3: Galway→Aillwee(50) + Aillwee→Poulnabrone(26) + Poulnabrone→Cliffs(~20) + Cliffs→Doolin(10)
J4: Doolin→Ennistymon(14) + Ennistymon→Galway(~65)
J5: Galway→Clifden(67) + SkyRoad(24)
J6: Clifden→Athlone(126) via Maam Cross
J7: Athlone→Trim(74) + Trim→Tara(20) + Tara→Airport(42)
```

### Nuits (7 au total)
1. Dublin centre (1 nuit)
2. Galway (1ere nuit) — meme logement que nuit 4
3. Doolin (1 nuit)
4. Galway (2e nuit) — retour au meme logement
5. Clifden (1 nuit)
6. Athlone (1 nuit)
7. Hotel aeroport Dublin (1 nuit)

### Sites visites
**Incontournables gardes** : Galway (Latin Quarter, Salthill, Atlantaquaria), Cliffs of Moher, Connemara (Roundstone, Dog's Bay, Clifden, Sky Road), Burren (Aillwee Cave, Poulnabrone Dolmen), Trim Castle, Hill of Tara

**Sacrifies** : Newgrange (trop loin du trajet principal), Kylemore Abbey (ajoute trop de route au J6), Bunratty Castle (1h30 de detour), Cong (detour), Clonmacnoise (detour), Brigit's Garden

**Recuperables si le timing le permet** :
- Kylemore Abbey : J6 matin avant de quitter Clifden (Clifden→Kylemore 19 min, ajoute ~40 min A/R)
- Parc National Connemara / Diamond Hill : J6 matin a Letterfrack (a cote de Kylemore)
- Newgrange : si J7 on fait Athlone→Trim→Newgrange→Airport au lieu de Trim→Tara (2h32 au lieu de 2h16)

## Structure du site web

```
ireland-trip/
├── CLAUDE.md      ← Ce fichier
├── index.html     ← HTML structure (liens vers CSS/JS/data)
├── style.css      ← Tout le CSS (design irlandais vert/or)
├── app.js         ← Logique JS (genere road book + carte Leaflet depuis le JSON)
├── data.json      ← SOURCE DE VERITE : itineraire, stops, POIs, tips, blogs
└── data.js        ← Copie JS du JSON (pour fonctionner en file:// sans serveur)
```

### Comment modifier l'itineraire
1. Editer `data.json` (champs `days`, `stops`, `route`, `pois`, `tips`, `blogs`)
2. Regenerer `data.js` : `echo "const TRIP_DATA = $(cat data.json);" > data.js`
3. Ouvrir `index.html` dans un navigateur (fonctionne en file://)

### Comment verifier un temps de trajet
Utiliser l'API OSRM (gratuite, pas de cle) :
```bash
curl -s "https://router.project-osrm.org/route/v1/driving/LNG1,LAT1;LNG2,LAT2?overview=false"
```
Le resultat contient `duration` (secondes) et `distance` (metres).

### Carte Leaflet
- Fond de carte : CartoDB Voyager (OpenStreetMap)
- Marqueurs numerotes J1-J8 pour chaque etape
- POIs secondaires : chateaux (orange), monasteres (mauve), plages (bleu), panoramas (vert)
- Polyline doree en pointilles pour l'itineraire

## Blogs de reference
- [Planete3w](https://www.planete3w.fr/road-trip-1-semaine-en-irlande-notre-itineraire/) — couple, 7 jours
- [Les Love Trotteurs](https://www.leslovetrotteurs.com/une-semaine-en-irlande/) — famille, 7 jours
- [e-Zabel](https://www.e-zabel.fr/irlande-en-famille/) — famille 2 enfants, 9 jours
- [Kid Friendly](https://www.kidfriendly.fr/archives/2018/04/22/36340955.html) — famille 3 enfants (3-9 ans)
- [Voyages et Enfants](https://www.voyagesetenfants.com/1-semaine-autour-de-galway-en-irlande-connemara-moher-et-buren/) — famille, enfants 3-4 ans
- [Causey Farm](https://www.causey.ie/) — experience "Be Irish for a Day" (alternative J7)

## Forum Routard — fils de reference
- [7 jours en Irlande, itineraire ok ?](https://www.routard.com/forums/t/7-jours-en-irlande-itineraire-ok-selon-vous/171118)
- [7 jours quel circuit ?](https://www.routard.com/forums/t/7-jours-en-irlande-quel-circuit/118977)
- [7 jours en aout](https://www.routard.com/forum_message/3392086/itineraire_de_7_jours_en_irlande_en_aout.htm)
- [7 jours depuis Dublin](https://www.routard.com/forums/t/7-jours-en-irlande-en-partant-de-dublin/243352)
- [Kerry et Connemara 7 jours](https://www.routard.com/forums/t/recommandation-ditineraires-pour-un-premier-sejour-de-7-jours-en-irlande-kerry-et-connemara/415143)
- [Doolin, Burren et Cliffs](https://www.routard.com/forums/t/doolin-burren-et-clif-of-moher/97406)
- [Alentours de Clifden](https://www.routard.com/forums/t/que-faire-dans-les-alentours-de-clifden/87046)
- [Galway et Connemara](https://www.routard.com/forums/t/galway-et-connemara/70000)
- [Region du Burren](https://www.routard.com/forum_message/3253442/que_faire_dans_la_region_du_burren.htm)
- [Sky Road sens de parcours](https://www.routard.com/forums/t/sens-pour-emprunter-la-sky-road/99789)
- [Dublin avec enfants 5 et 3 ans](https://www.routard.com/forum_message/4595128/dublin_avec_2_enfants_de_5_et_3_ans.htm)
- [12 jours famille cote ouest](https://www.routard.com/forums/t/12-jours-en-famille-en-irlande-votre-avis-sur-notre-parcours/82260)

## Conseils cles issus des forums et TripAdvisor
- **Cliffs of Moher** : parking officiel 8 EUR/pers (!). Parking fermier 800m avant (dir. Liscannor) = 2 EUR/vehicule. Arriver apres 16h. Coupe-vent obligatoire. Zone balisee avec enfants.
- **Aillwee Cave** : famille ~71 EUR (grotte + rapaces). Les enfants peuvent tenir les oiseaux.
- **Sky Road** : Upper Sky Road = meilleures vues. Ideal au coucher du soleil (17-18h). Route etroite.
- **Dog's Bay** : sable blanc corallien, eau turquoise. Tour de la presqu'ile 2h a pied.
- **Trim Castle** : famille ~10 EUR. Visite guidee donjon 45 min obligatoire. Brochure FR.
- **Hill of Tara** : gratuit (Heritage Card). Les enfants adorent devaler les collines. 30-45 min.
- **Atlantaquaria** : bassins a hauteur d'enfant, bassin tactile. ~1h de visite.
- **Connemara NP / Diamond Hill** : 3 sentiers (1,5 km facile → 3,8 km sommet). Gratuit.
- **Viking Tours Athlone** : enfants peuvent piloter le bateau. 75 min. Casques/epees en vente.
- **Lahinch Beach** : aire de jeux a cote, section baignade surveillee, cours surf des 8 ans.
- **Doolin** : sessions musique des 20-21h (Gus O'Connor's, McGann's, McDermott's). Enfants bienvenus tot.
- **Galway** : 2-3h de visite suffisent. McDonagh's = fish & chips legendaire. Tig Coili/Crane Bar pour la musique.

## Tarifs verifies (2025-2026)
- Heritage Card : 40 EUR/adulte, enfants < 12 ans gratuit
- Cliffs of Moher : 8 EUR/pers parking officiel (ou 2 EUR/vehicule parking fermier)
- Aillwee Cave + rapaces : famille ~71 EUR
- Kylemore Abbey : famille 45 EUR
- Newgrange : famille 48 EUR (Heritage Card acceptee)
- Trim Castle : famille ~10 EUR
- Connemara National Park : gratuit
- Hill of Tara : gratuit (Heritage Card)
- Atlantaquaria : ~15 EUR/adulte, reduction enfants
