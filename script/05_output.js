const { io } = require("lastejobb");

map("fylke_simpler.geojson", "fylke");
map("kommune_simpler.geojson", "kommune");

function map(srcPath, navn) {
  const geo = io.lesDatafil(srcPath);
  geo.features.forEach(f => {
    f.geometry.coordinates = reducePrecision(f.geometry.coordinates);
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
