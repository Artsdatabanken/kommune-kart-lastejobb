#!/bin/bash
set -e

#simplify("fylke.geojson", "fylke_25833.geojson", 1);
#simplify("kommune.geojson", "kommune_25833.geojson", 1);

#docker run --rm -v /home:/home osgeo/gdal:alpine-small-latest ls -latr $PWD/temp/fylke_25833.geojson $PWD/temp/fylke.geojson
docker run --rm -v /home:/home osgeo/gdal:alpine-small-latest ogr2ogr -nln polygons -f GeoJSON -simplify 1 $PWD/temp/fylke_25833.geojson $PWD/temp/fylke.geojson
docker run --rm -v /home:/home osgeo/gdal:alpine-small-latest ogr2ogr -nln polygons -f GeoJSON -simplify 1 $PWD/temp/kommune_25833.geojson $PWD/temp/kommune.geojson


ogr2ogr(args) {
    echo $args
    docker run --rm -v /home:/home osgeo/gdal:alpine-small-latest ogr2ogr $args
}