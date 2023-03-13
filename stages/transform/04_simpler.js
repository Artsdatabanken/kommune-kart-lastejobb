const { dops } = require("@artsdatabanken/lastejobb");

main();

function main(){
    // start container / image
    var n = dops.start_ogr_containerNImage(dops.create_container_name('simplify'));
    //simplify fylke
    dops.exec_docker(n, "ogr2ogr -nln polygons -f GeoJSON -simplify 1 /tmp/fylke_25833.geojson /tmp/fylke.geojson");
    //simplify kommune
    dops.exec_docker(n, "ogr2ogr -nln polygons -f GeoJSON -simplify 1 /tmp/kommune_25833.geojson /tmp/kommune.geojson");
    dops.clean_container(n); // dispose of container when finished
}
