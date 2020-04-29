#!/bin/bash
set -e


ogr2ogr() {
    echo $1
    docker run --rm -v /home:/home osgeo/gdal:alpine-small-latest ogr2ogr $1
}

ogr2ogr "-nln polygons -f GeoJSON -simplify 1 $PWD/temp/fylke_25833.geojson $PWD/temp/fylke.geojson"
ogr2ogr "-nln polygons -f GeoJSON -simplify 1 $PWD/temp/kommune_25833.geojson $PWD/temp/kommune.geojson"
