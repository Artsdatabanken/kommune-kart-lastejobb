const { io } = require("lastejobb");

const src = io.lesDatafil(
  "Basisdata_0000_Norge_25833_Kommuner_GEOJSON.geojson"
);

const scrub = [
  "datafangstdato",
  "datauttaksdato",
  "lokalid",
  "navnerom",
  "objtype",
  "oppdateringsdato",
  "opphav",
  "samiskforvaltningsomrade",
  "versjonid"
];

const kommune = src["administrative_enheter.kommune"];
kommune.features.forEach(f => {
  f.geometry.coordinates = reducePrecision(f.geometry.coordinates);
  const props = f.properties;
  scrub.forEach(key => delete props[key]);
  props.navn = mapNavn(props.navn);
});
kommune.features.sort((a, b) =>
  a.properties.kommunenummer > b.properties.kommunenummer ? 1 : -1
);
io.skrivBuildfil("kommune.geojson", kommune);

function mapNavn(navn) {
  return navn.reduce((acc, n) => {
    // https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes
    acc[n.sprak] = n.navn;
    return acc;
  }, {});
}

function reducePrecision(coords) {
  return coords.map(c => {
    if (Array.isArray(c)) return reducePrecision(c);
    return Math.round(c);
  });
}
