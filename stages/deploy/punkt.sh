#/bin/bash
set -e

scp build/kommune.tif grunnkart@hydra:~/punkt-oppslag/kommune.tif
ssh grunnkart@hydra /home/grunnkart/punkt-oppslag/go.sh AO
