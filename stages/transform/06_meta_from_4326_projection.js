const { geospatial, io } = require("@artsdatabanken/lastejobb");

areal("fylke");
areal("kommune");

function areal(nivå) {
  let vo = io.lesTempJson(nivå + "_25833.geojson");

  let r = {};
  vo.features.forEach(v => {
    v.properties = { autorkode: v.properties.autorkode };
    const areal = Math.round(geospatial.calculateArea(v.geometry.coordinates));
    r[v.properties.autorkode] = { areal };
  });
  io.skrivDatafil(nivå + "_meta.json", r);
}
