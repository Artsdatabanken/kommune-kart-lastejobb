#/bin/bash
set -e

gdal_rasterize -a autorkode -tr 100 100 build/kommune_25833.geojson build/kommune.tif 