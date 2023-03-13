const { dops } = require("@artsdatabanken/lastejobb");

try{
  
  var n = dops.start_ogr_containerNImage(dops.create_container_name('reproject'));
  
  reproj_w_docker(n, "fylke_25833.geojson", "fylke_4326.geojson");
  reproj_w_docker(n, "kommune_25833.geojson", "kommune_4326.geojson");
  dops.clean_container(n);
}catch(e){
  console.error(e);
  console.error(e.stack);
}

function reproj_w_docker(dc_cont_name, src, target, epsg = "EPSG:25833"){
  var cmd = `ogr2ogr -f GeoJSON -t_srs ${epsg} tmp/${target} tmp/${src}`
  dops.exec_docker(dc_cont_name, cmd);
}
