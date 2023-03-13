const { dops } = require("@artsdatabanken/lastejobb");

main();

function main() {
    console.log("punkt oppslag");
    let srcFolder = 'build';
    var n = dops.start_gdal(dops.create_container_name('punktOppslag'), srcFolder);
    let cmd = `gdal_rasterize -a autorkode -tr 100 100 /tmp/kommune_25833.geojson /tmp/kommune.tif`
    dops.exec_docker(n, cmd);
    dops.clean_container(n);
}


/* from 20_punkt_oppslag.sh
#!/bin/bash
set -e

gdal_rasterize() {
    echo gdal_rasterize $@
    docker run --rm -v /home:/home osgeo/gdal:alpine-normal-latest gdal_rasterize $@
}

gdal_rasterize -a autorkode -tr 100 100 $PWD/build/kommune_25833.geojson $PWD/build/kommune.tif  */