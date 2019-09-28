const execSync = require("child_process").execSync;

reproject("fylke_25833.geojson", "fylke_4326.geojson");
reproject("kommune_25833.geojson", "kommune_4326.geojson");

function reproject(src, target, epsg = "EPSG:4326") {
  execSync(
    `ogr2ogr -nln polygons -f GeoJSON -t_srs ${epsg} data/${target} data/${src}`
  );
}
