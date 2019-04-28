const { io } = require("lastejobb");
const execSync = require("child_process").execSync;

reproject("fylke_simpler.geojson", "fylke_simpler_4326.geojson");
reproject("kommune_simpler.geojson", "kommune_simpler_4326.geojson");

function reproject(src, target, epsg = "EPSG:4326") {
  execSync(`ogr2ogr -t_srs ${epsg} data/${target} data/${src}`);
}
