const { geospatial, io, json } = require("@artsdatabanken/lastejobb");

bbox("fylke");
bbox("kommune");

function bbox(nivå) {
  const meta = io.lesTempJson(nivå + "_meta.json");
  let vo = io.lesTempJson(nivå + "_4326.geojson");

  vo.features.forEach(v => {
    const props = v.properties;
    const node = meta[v.properties.autorkode];
    node.bbox = geospatial.axisAlignedBoundingBox(v.geometry.coordinates);
    node.tittel = props.navn;
  });

  let r = json.objectToArray(meta, "autorkode");
  r = r.sort((a, b) => (a.autorkode > b.autorkode ? 1 : -1));
  io.skrivBuildfil(nivå + "_meta.json", r);
}
