const { io } = require("lastejobb");

map("fylke_4326.geojson", "fylke_4326");
map("kommune_4326.geojson", "kommune_4326");
map("fylke_4326.geojson", "fylke_4326");
map("kommune_4326.geojson", "kommune_4326");

function map(srcPath, navn) {
  const geo = io.lesDatafil(srcPath);
  geo.features.forEach(f => {
    f.geometry.coordinates = reducePrecision(
      f.geometry.coordinates,
      geo.crs.name
    );
  });
  geo.features.sort((a, b) => (getkey(a) > getkey(b) ? 1 : -1));
  const dstPath = navn + ".geojson";
  io.skrivBuildfil(dstPath, geo);
}

function getkey(item) {
  const props = item.properties;
  return props.kommunenummer || props.fylkesnummer;
}

function mapNavn(navn) {
  return navn.reduce((acc, n) => {
    // https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes
    acc[n.sprak] = n.navn;
    return acc;
  }, {});
}

function reducePrecision(coords, crs) {
  return coords.map(c => {
    if (Array.isArray(c)) return reducePrecision(c, crs);
    if (crs === "urn:ogc:def:crs:EPSG::25833") return Math.round(c);
    return Math.round(1e6 * c) / 1e6;
  });
}
