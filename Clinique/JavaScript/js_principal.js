/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function initialize() {
  var mapOptions = {
    scaleControl: true,
    center: new google.maps.LatLng(45.5201678, -73.6752699),
    zoom: 14
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var marker = new google.maps.Marker({
    map: map,
    position: map.getCenter()
  });
  var infowindow = new google.maps.InfoWindow();
  infowindow.setContent('<div style=\' height: 100px;\'> <h3>Clinique Physio Bien-Etre<h3> \n\
<label>815, Cote Vertu </label></br>\n\
<label>Tel :(514)748-8999 </label></br>\n\
<label>Tel :(514)570-0063</label></br>\n\
<label>Fax :(514)748-6525<label></div>');
  google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

