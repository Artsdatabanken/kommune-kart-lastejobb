const { http, io, log } = require("lastejobb");

const downloads = {
  kommune:
    "https://nedlasting.geonorge.no/geonorge/Basisdata/Kommuner/GeoJSON/Basisdata_0000_Norge_25833_Kommuner_GEOJSON.zip",

  fylke:
    "https://nedlasting.geonorge.no/geonorge/Basisdata/Fylker/GeoJSON/Basisdata_0000_Norge_25833_Fylker_GEOJSON.zip"
};

Object.entries(downloads).forEach(([navn, url]) => {
  // Laster ned geometri for kommuner i geojson format
  http.downloadBinary(url, navn + "_geometri.zip").catch(err => {
    log.fatal(err);
  });
});
