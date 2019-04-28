const { io } = require("lastejobb");

map("Basisdata_0000_Norge_25833_Fylker_GEOJSON.geojson", "fylke");
map("Basisdata_0000_Norge_25833_Kommuner_GEOJSON.geojson", "kommune");

function map(srcPath, navn) {
  const src = io.lesDatafil(srcPath);

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

  const geo = src["administrative_enheter." + navn];
  geo.features.forEach(f => {
    f.geometry.coordinates = reducePrecision(f.geometry.coordinates);
    const props = f.properties;
    scrub.forEach(key => delete props[key]);
    props.navn = mapNavn(props.navn);
  });
  geo.features.sort((a, b) =>
    a.properties.kommunenummer > b.properties.kommunenummer ? 1 : -1
  );
  const dstPath = navn + "_25833.geojson";
  io.skrivBuildfil(dstPath, geo);
}

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