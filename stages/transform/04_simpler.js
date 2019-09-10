const { io, log } = require("lastejobb");
const execSync = require("child_process").execSync;
const fs = require("fs");

simplify("fylke.geojson", "fylke_25833.geojson", 1);
simplify("kommune.geojson", "kommune_25833.geojson", 1);

function simplify(src, target, tolerance) {
  const targetPath = "./data/" + target;
  if (fs.existsSync(targetPath)) fs.unlinkSync(targetPath);
  const cmdline = `ogr2ogr -f GeoJSON -simplify ${tolerance} ${targetPath} data/${src}`;
  log.info("Running: " + cmdline);
  execSync(cmdline);
}
