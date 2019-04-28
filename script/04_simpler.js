const { io } = require("lastejobb");
const execSync = require("child_process").execSync;

simplify("fylke.geojson", "fylke_25833.geojson", 1);
simplify("kommune.geojson", "kommune_25833.geojson", 1);

function simplify(src, target, tolerance) {
  execSync(`ogr2ogr -simplify ${tolerance} data/${target} data/${src}`);
}
