[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Lastejobb for kartfiler med geometri for Norske fylker og kommuner. Utdatasett vedlikeholdes i [kommune-kart](https://github.com/Artsdatabanken/kommune-kart).

## Dataflyt

![Flytdiagram](./doc/flytdiagram.svg)

### Datakilder (takk til)

- [Kartverket](https://kartkatalog.geonorge.no/metadata/kartverket/administrative-enheter-kommuner/041f1e6e-bdbc-4091-b48f-8a5990f3cc5b)

## Utdatasett

Datasettet som er resultatet av lastejobben havner i repo [kommune-kart](https://github.com/Artsdatabanken/kommune-kart) og leses videre derfra av prosjekter som bruker datasettet.

### Leses av

- [nin-data-lastejobb](https://github.com/Artsdatabanken/nin-data-lastejobb)

### Bruk i sluttprodukter

- [Natur i Norge kart](https://github.com/Artsdatabanken/nin-kart-frontend)
- [Artsdatabanken åpne data](https://data.artsdatabanken.no/)

### Hvordan bygge

Forutsetter at ogr2ogr bilbliotekene er installert og tilgjengelige i PATH: [Ogr2ogr](https://gdal.org/programs/ogr2ogr.html)

npm install

npm build