const { log } = require("lastejobb");
const execSync = require("child_process").execSync;
const fs = require("fs");
return
simplify("fylke.geojson", "fylke_25833.geojson", 1);
simplify("kommune.geojson", "kommune_25833.geojson", 1);

function simplify(src, target, tolerance) {
  const targetPath = "./temp/" + target;
  if (fs.existsSync(targetPath)) fs.unlinkSync(targetPath);
  const cmdline = `ogr2ogr -nln polygons -f GeoJSON -simplify ${tolerance} ${targetPath} temp/${src}`;
  log.info("Running: " + cmdline);
  execSync(cmdline);
}
