const path = require("path");
const { archive, io, log, http } = require("lastejobb");

archive.unzip("kommune_geometri.zip");
archive.unzip("fylke_geometri.zip");
