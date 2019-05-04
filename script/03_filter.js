const { io, json } = require("lastejobb");

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
    const props = f.properties;
    scrub.forEach(key => delete props[key]);
    json.moveKey(props, "fylkesnummer", "autorkode");
    json.moveKey(props, "kommunenummer", "autorkode");
    props.navn = mapNavn(props.navn);
  });
  const dstPath = navn + ".geojson";
  io.skrivDatafil(dstPath, geo);
}

function mapNavn(navn) {
  // From: https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes
  // To: https://iso639-3.sil.org/code_tables/639/data/s?page=1
  const iso2to3 = {
    fkv: "fkv", // Finsk kvensk
    nor: "nob", // Norsk bokmål
    sma: "sma", // Nord-samisk
    sme: "sme", // Sør-samisk
    smj: "smj" // Lule Sami
  };

  return navn.reduce((acc, n) => {
    const språkkode = iso2to3[n.sprak];
    if (!språkkode) throw new Error("No ISO 639-3 code for: " + n.sprak);
    acc[språkkode] = n.navn;
    return acc;
  }, {});
}
