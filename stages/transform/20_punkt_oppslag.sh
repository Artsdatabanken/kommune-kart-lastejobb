#!/bin/bash
set -e

gdal_rasterize() {
    echo gdal_rasterize $@
    docker run --rm -v /home:/home osgeo/gdal:alpine-normal-latest gdal_rasterize $@
}

gdal_rasterize -a autorkode -tr 100 100 $PWD/build/kommune_25833.geojson $PWD/build/kommune.tif 