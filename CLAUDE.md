# Ireland Road Trip 2026 — Projet de voyage

## Contexte

Voyage en famille (2 adultes + 2 enfants de 5 et 8 ans) en Irlande, cote ouest / Wild Atlantic Way.

- **Dates** : 16-23 aout 2026 (7 nuits, 8 jours)
- **Vol aller** : Ryanair FR9777, Nimes (FNI) → Dublin (DUB), 11h10-12h40
- **Vol retour** : Ryanair FR9776, Dublin (DUB) → Nimes (FNI), 07h10-10h30
- **Voiture** : NewWay, Dublin Airport, 16/08 13h00 → 23/08 07h00

## Contraintes strictes

- **Max ~2h de conduite par jour** (tolerance ~2h15-2h30 si trajet coupe en segments < 1h15)
- **Derniere nuit obligatoirement < 30 min de l'aeroport** (reserve : Balbriggan, ~30 min — pas de passage couvert)
- **Arrivee aeroport J8 a 5h30** → depart 4h55, **reveil 4h30** (et non 5h00 : il y a 30 min de route)
- Pas de fermes pedagogiques (on a les memes en France)
- Privilegier les experiences **typiquement irlandaises**

## Itineraire final v4 (ordonne par horaires d'ouverture et creneaux creux)

| Jour | Date      | Trajet                                                                | Conduite   | Nuit         |
| ---- | --------- | --------------------------------------------------------------------- | ---------- | ------------ |
| J1   | Dim 16/08 | Airport → Clondalkin, puis **Luas** vers le centre                    | **30 min** | Clondalkin   |
| J2   | Lun 17/08 | Dublin → Athlone (aire de jeux puis dej) → Galway → Furbo             | **~2h58**  | Furbo        |
| J3   | Mar 18/08 | Furbo → **Dog's Bay avant 10h** → Roundstone → Clifden → Sky Road 17h | **~2h50**  | Ballynahinch |
| J4   | Mer 19/08 | Ballynahinch → **Kylemore 10h** → **Connemara NP 14h30** → Athenry    | **~2h30**  | Athenry      |
| J5   | Jeu 20/08 | Athenry → Caherconnell → Poulnabrone → Lahinch → **Cliffs 18h45**     | **~2h45**  | Ennistymon   |
| J6   | Ven 21/08 | Lahinch (plage 9h) → Ennis (dej) → **Birr Castle 14h50**              | **~2h25**  | Banagher     |
| J7   | Sam 22/08 | Banagher → **Trim Castle 10h** → Hill of Tara → nord Dublin           | **~2h45**  | Balbriggan   |
| J8   | Dim 23/08 | Reveil 4h30 → Terminal                                                | **30 min** | —            |

Les temps sont desormais **porte-a-porte** (logements reels compris, aller-retours du soir inclus), la ou la v3 ne comptait que les troncons entre villes-etapes. Les journees a 2h30-2h50 depassent la cible de 2h : en J3 et J5 une bonne partie est de la route panoramique (Sky Road, aller-retour du soir aux falaises), pas du transit.

### Detail des troncons OSRM v3 (minutes, entre villes-etapes uniquement)

```
J1: Airport→Dublin(21)
J2: Dublin→Athlone(92) + Athlone→Galway(63) — autoroute M6, dejeuner a Athlone
J3: Galway→Roundstone(72) + Roundstone→Dog'sBay(7) + Dog'sBay→Clifden(38) + SkyRoad(~30)
J4: Clifden→Kylemore(20) + Kylemore→ConNP(5) + ConNP→Galway(~75)
J5: Galway→Caherconnell(66) + Caherconnell→Poulnabrone(8) + Poulnabrone→Cliffs(32) + Cliffs→Lahinch(12)
J6: Lahinch→Ennis(32) + Ennis→Birr(92)
J7: Birr→Trim(91) + Trim→Tara(21) + Tara→Airport(42)
```

### Nuits reellement reservees (7 au total)

1. Clondalkin (sud-ouest Dublin)
2. Furbo (cote, ouest de Galway)
3. Ballynahinch (Connemara, entre Roundstone et Clifden)
4. Athenry (est de Galway, croisement M6/M18)
5. Ennistymon (2 km de Lahinch)
6. Banagher (~10 min de Birr, bord du Shannon)
7. Balbriggan (nord Dublin, ~30 min de l'aeroport)

Ces logements ne sont pas dans les villes-etapes du tableau ci-dessus : les temps de conduite reels de chaque journee sont un peu superieurs aux troncons OSRM listes.

### Horaires verifies (aout 2026) et creneaux anti-foule

| Site                        | Horaires aout                 | Creneau optimal          | Pourquoi                                             |
| --------------------------- | ----------------------------- | ------------------------ | ---------------------------------------------------- |
| Dog's Bay                   | acces libre                   | **avant 10h**            | ~10 places de parking, plein des 10h en juillet-aout |
| Kylemore Abbey              | 10h-18h (dern. entree 17h)    | **10h pile**             | Les cars arrivent des 11h et saturent jusqu'a 14h    |
| Connemara NP / Diamond Hill | acces libre                   | **apres 14h**            | Parking 20-30 places, sature 10h-14h                 |
| Caherconnell                | 10h-17h (dern. visite 16h30)  | matinee, demo reservee   | Demonstrations a reserver en ligne                   |
| Cliffs of Moher             | 8h-21h                        | **apres 18h** (ou 8h-9h) | Bondees 11h-16h : c'est le pire creneau              |
| Birr Castle                 | 9h-18h (**dern. entree 17h**) | arriver avant 15h        | 3h de domaine + Treehouse, sinon on court            |
| Trim Castle (donjon)        | ouverture 10h                 | **10h pile**             | Visites non reservables, complet les samedis d'aout  |
| Hill of Tara                | site libre, centre 10h-17h    | milieu d'apres-midi      | Gratuit, rotation rapide du petit parking            |
| Galway Atlantaquaria        | 9h-18h (dern. entree 17h)     | J2 si pluie              | Impossible a caser le J4 : on arrive apres 17h       |
| Book of Kells               | dim. 9h30-17h                 | 1er creneau              | Billets horodates, complets plusieurs jours avant    |

**Reservations obligatoires** : Kylemore, Caherconnell (demo), Cliffs of Moher (creneau en ligne ~7 EUR/adulte au lieu de ~12 EUR sur place), Book of Kells. **Trim Castle ne se reserve pas** : billets du donjon sur place, premier arrive premier servi.

**Heritage Card : inutile ici.** 40 EUR/adulte alors que le seul site OPW payant du parcours est Trim Castle (famille ~13 EUR) ; Hill of Tara est gratuit.

**Parking Dublin J1** : ne pas rentrer la voiture dans le centre un dimanche. Red Cow Luas Park & Ride (4 EUR/24 h, ticket Luas valide obligatoire) + ligne rouge, ~25 min.

### Sites visites

**Incontournables** : Galway (Latin Quarter, Salthill, Atlantaquaria), Kylemore Abbey, Connemara NP / Diamond Hill, Connemara (Roundstone, Dog's Bay, Clifden, Sky Road), Cliffs of Moher, Burren (Caherconnell Stone Fort, Poulnabrone Dolmen), Lahinch Beach, Birr Castle Demesne, Trim Castle, Hill of Tara

**Sacrifies** : Newgrange (trop loin du trajet principal), Bunratty Castle (detour), Cong (detour), Clonmacnoise (detour), Brigit's Garden, Doolin (sans interet sans la musique trad)

**Recuperables si le timing le permet** :

- Newgrange : si J7 on fait Birr→Trim→Newgrange→Airport au lieu de Trim→Tara
- Iles d'Aran : ferry depuis Doolin ou Rossaveal si une journee se libere

## Stack technique

SvelteKit 5 (Svelte 5 runes) + TypeScript strict + Vite, deploye en statique sur GitHub Pages.

### Structure du projet

```
ireland-trip/
├── CLAUDE.md                ← Ce fichier
├── static/data.json         ← SOURCE DE VERITE : itineraire, stops, POIs, tips, blogs
├── tsconfig.json            ← TypeScript strict, extends .svelte-kit/tsconfig.json
├── svelte.config.js         ← adapter-static, prerender, base path
├── vite.config.js           ← SvelteKit + Vite
├── eslint.config.js         ← ESLint flat config + typescript-eslint + svelte
├── src/
│   ├── app.css              ← CSS global (design irlandais vert/or)
│   ├── service-worker.ts    ← PWA : cache local + CDN (Leaflet, Font Awesome)
│   ├── lib/
│   │   ├── types.ts         ← Interfaces partagees (Day, Stop, TripData, RawDay...)
│   │   ├── utils/           ← Fonctions utilitaires TypeScript
│   │   │   ├── stats.ts     ← computeStats, normalizeDay (liens, distances, budget)
│   │   │   ├── weather.ts   ← Open-Meteo API (forecast ou archive)
│   │   │   ├── dates.ts     ← Parsing/formatage dates FR
│   │   │   ├── format.ts    ← Formatage durees/distances
│   │   │   ├── map.ts       ← Config tile layer CartoDB Voyager
│   │   │   ├── scroll.ts    ← Scroll smooth vers un jour
│   │   │   ├── coords.ts    ← Generateurs URL Waze/Google Maps
│   │   │   └── colors.ts    ← Palette couleurs par jour
│   │   └── components/      ← Composants Svelte 5 (lang="ts", $props/$state/$derived)
│   │       ├── Hero.svelte, MapSection.svelte, Dashboard.svelte
│   │       ├── Tips.svelte, Blogs.svelte, Navbar.svelte, Footer.svelte
│   │       └── roadbook/    ← RoadBook, DayCard, DayNav, StopItem, MiniMap
│   └── routes/
│       ├── +page.ts         ← prerender = true
│       ├── +page.svelte     ← Charge data.json, normalise, orchestre les composants
│       └── +layout.svelte   ← Navbar + slot
└── .github/workflows/pages.yml ← CI : type-check + lint + build + deploy
```

### Normalisation des donnees (static/data.json -> types TS)

`static/data.json` est le fichier reellement servi (`fetch(`${base}/data.json`)` dans `+page.svelte`) : c'est **la** source de verite. Il ne doit pas etre duplique a la racine — un doublon `./data.json` a existe jusqu'en aout 2026 et a diverge silencieusement (des corrections editees a la racine ne sont jamais arrivees sur le site).

La fonction `normalizeDay()` dans `stats.ts` transforme chaque `RawDay` en `Day` :

- **stops** : champs plats (`gmaps`, `web`, `tripadvisor`...) -> tableau `links: StopLink[]`
- **budget.total** : calcule depuis `budget.entries`
- `distanceKm` et `driveMinutes` sont deja numeriques dans le JSON

### Commandes

- `pnpm dev` : serveur de dev local
- `pnpm check` : type-check (svelte-check + TypeScript strict)
- `pnpm lint` : ESLint (JS + TS + Svelte)
- `pnpm build` : build statique dans `build/`
- `pnpm preview` : preview du build

### Comment modifier l'itineraire

1. Editer `static/data.json` (champs `days`, `stops`, `schedule`, `practicalTips`, `pois`, `tips`, `blogs`)
2. Lancer `pnpm dev` pour visualiser

### Images dans data.json

**Ne jamais inventer ou deviner une URL d'image.** Toujours verifier que l'image existe avant de l'ajouter :

- Chercher sur Wikimedia Commons (`commons.wikimedia.org`) et copier l'URL reelle
- Ou utiliser WebFetch pour confirmer que l'URL renvoie bien une image

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

- **Cliffs of Moher** : ouvert 8h-21h en aout, bondees 11h-16h. Creneau horodate en ligne ~7 EUR/adulte (~12 EUR sur place), enfants < 12 ans gratuits. Parking fermier cote Liscannor 2-5 EUR, mais certaines fermes facturent desormais ~5 EUR/personne et le sentier n'est pas cloture. **Y aller apres 18h** (ou des 8h). Coupe-vent obligatoire.
- **Caherconnell Fort** : ouvert 10h-17h en juillet-aout (derniere visite 16h30). Famille ~28 EUR (fort + demo chiens de berger) — **reserver le creneau de demo en ligne**. 4.9/5 TripAdvisor. Les enfants caressent les border collies et agneaux.
- **Sky Road** : Upper Sky Road = meilleures vues. Ideal au coucher du soleil (17-18h). Route etroite.
- **Dog's Bay** : sable blanc corallien, eau turquoise. Tour de la presqu'ile 2h a pied.
- **Trim Castle** : famille ~13 EUR. Visite guidee du donjon (45 min) obligatoire et **non reservable** — billets sur place, premier arrive premier servi, complet les jours charges de juillet-aout. Ouverture 10h : y etre a l'ouverture. Enceinte et remparts gratuits pour patienter. Brochure FR.
- **Hill of Tara** : entierement gratuit, parking gratuit (pas besoin de Heritage Card). Centre d'interpretation mai-septembre 10h-17h. Les enfants adorent devaler les collines. 45 min a 1h.
- **Atlantaquaria** : bassins a hauteur d'enfant, bassin tactile. ~1h de visite.
- **Connemara NP / Diamond Hill** : 3 sentiers (1,5 km facile → 3,8 km sommet). Gratuit.
- **Kylemore Abbey** : ouvre a **10h00** (derniere entree 17h) — y etre a l'ouverture, les cars arrivent des 11h et saturent jusqu'a 14h. Billets a reserver en ligne en aout. Jardins victoriens (navette) + eglise gothique miniature. Famille ~45 EUR.
- **Lahinch Beach** : aire de jeux a cote, section baignade surveillee, cours surf des 8 ans.
- **Birr Castle Demesne** : Treehouse Playground (enorme), Grand Telescope, I Spy Science Trail. Famille ~30 EUR. Ouvert des 9h, ferme 18h, **derniere entree 17h** : arriver avant 15h. Visites guidees de l'interieur lun-sam en mai-aout, sur reservation.
- **Galway** : 2-3h de visite suffisent. McDonagh's = fish & chips legendaire. Salthill Promenade + kicker la plaque.

## Tarifs verifies (2025-2026)

- Heritage Card : 40 EUR/adulte — **non rentable sur cet itineraire** (seul Trim Castle est payant)
- Cliffs of Moher : ~7 EUR/adulte en creneau horodate en ligne, ~12 EUR sur place, enfants < 12 ans gratuits (parking fermier 2-5 EUR, parfois par personne)
- Caherconnell Fort + demo : famille ~28 EUR
- Kylemore Abbey : famille 45 EUR
- Newgrange : famille 48 EUR (Heritage Card acceptee)
- Trim Castle : famille ~13 EUR (non reservable)
- Connemara National Park : gratuit
- Hill of Tara : gratuit
- Atlantaquaria : ~15 EUR/adulte, reduction enfants
- Birr Castle Demesne : famille ~30 EUR
