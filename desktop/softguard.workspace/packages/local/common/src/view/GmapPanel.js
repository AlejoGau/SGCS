var par_MAPTYPEDSK;
var par_NOMBREPAIS;
var par_KEYGOOGLEMAPS;
var par_LABELMOVILTRACKVIEW = getParametro('LABELMOVILTRACKVIEW');
var par_GEOCODINGPROVIDER;
var par_KEYGEOAPIFY;
var par_KEYHERE;

par_MAPTYPEDSK = getParametro('MAPTYPEDSK')
par_NOMBREPAIS = getParametro('NOMBREPAIS')

// DSS-1532: instanciacion robusta de proveedores GIS (portado de la version
// correcta del panel). Antes par_KEYHERE quedaba en '' (nunca se instanciaba del
// parametro) y par_KEYGEOAPIFY se asignaba sin declararse.
try {
    par_GEOCODINGPROVIDER = getParametro('GEOCODINGPROVIDER');
} catch (e) {
    par_GEOCODINGPROVIDER = 1;
    console.warn(e);
}

try {
    par_KEYGEOAPIFY = getParametro('KEYGEOAPIFY')
} catch (e) {
    console.error(e);
    par_KEYGEOAPIFY = "";
}

try {
    par_KEYHERE = getParametro('KEYHERE')
} catch (e) {
    console.error(e);
    par_KEYHERE = "";
}

try {
    par_KEYGOOGLEMAPS = getParametro('KEYGOOGLEMAPS');
} catch (e) {
    console.error(e);
    par_KEYGOOGLEMAPS = "";
}


var loadingGoogleApi = false

class GoogleGeoCode {
  GoogleGeoCode() { }
  geocode(location, callback) {
    if (location.hasOwnProperty('location')) {
      ValidaCache(
        location.location.lat(),
        location.location.lng(),
        function (datosDevueltos) {
          if (datosDevueltos != '') {
            callback(datosDevueltos, 'OK')
          }
        }
      )
      var requestOptions = {
        method: 'GET'
      }

      const xhr = new XMLHttpRequest()

      xhr.open(
        'GET',
        'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
        location.location.lat() +
        ',' +
        location.location.lng() +
        '&key=' +
        par_KEYGOOGLEMAPS
      )
      xhr.send()
      xhr.responseType = 'json'
      xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          const data = xhr.response
          callback(data.results, 'OK')
        } else {
          console.log(`Error: ${xhr.status}`)
        }
      }
    } else {
      if (location.hasOwnProperty('address')) {
        this.geocoder = new google.maps.Geocoder()
        this.geocoder.geocode(
          { address: location.address },
          (results, status) => {
            if (status === 'OK') {
              var resu = results[0]
              var resultado = [
                {
                  formatted_address: resu.formatted_address,
                  address_components: {
                    short_name: '',
                    long_name: ''
                  },
                  geometry: {
                    location: {
                      lat: parseFloat(resu.geometry.location.lat()),
                      lng: parseFloat(resu.geometry.location.lng())
                    }
                  }
                },
                {
                  formatted_address: '',
                  address_components: {
                    short_name: '',
                    long_name: ''
                  },
                  geometry: {
                    location: { lat: 0, lng: 0 }
                  }
                }
              ]
              callback(resultado, 'OK')
            }
          }
        )
      }
    }
  }
}

class GeocoderApiFy {
  GeocoderApiFy() { }
  geocode(location, callback) {
    if (location.hasOwnProperty('location')) {
      ValidaCache(
        location.location.lat(),
        location.location.lng(),
        function (datosDevueltos) {
          if (datosDevueltos != '') {
            callback(datosDevueltos, 'OK')
            return
          }
        }
      )

      var requestOptions = {
        method: 'GET'
      }

      const xhr = new XMLHttpRequest()
      xhr.open(
        'GET',
        'https://api.geoapify.com/v1/geocode/reverse?lat=' +
        location.location.lat() +
        '&lon=' +
        location.location.lng() +
        '&apiKey=' +
        par_KEYGEOAPIFY
      )
      try {
        xhr.send()
        xhr.responseType = 'json'
        var resultado = ''

        xhr.onload = () => {
          if (xhr.readyState == 4 && xhr.status == 200) {
            // dedalo 20203/06/14 agrego try por problema en cliente visto con mauro.
            try {
              const data = xhr.response
              resultado = [
                {
                  address_components: [
                    {
                      long_name: data.features[0].properties.housenumber,
                      short_name: data.features[0].properties.housenumber,
                      types: ['street_number']
                    },
                    {
                      long_name: data.features[0].properties.street,
                      short_name: data.features[0].properties.street,
                      types: ['route']
                    },
                    {
                      long_name: data.features[0].properties.suburb,
                      short_name: data.features[0].properties.suburb,
                      types: ['neighborhood', 'political']
                    },
                    {
                      long_name: data.features[0].properties.city,
                      short_name: data.features[0].properties.city,
                      types: ['sublocality', 'political']
                    },
                    {
                      long_name: data.features[0].properties.state,
                      short_name: data.features[0].properties.state_code,
                      types: ['administrative_area_level_2', 'political']
                    },
                    {
                      long_name: data.features[0].properties.state,
                      short_name: data.features[0].properties.state_code,
                      types: ['administrative_area_level_1', 'political']
                    },
                    {
                      long_name: data.features[0].properties.country,
                      short_name: data.features[0].properties.country_code,
                      types: ['country', 'political']
                    },
                    {
                      long_name: data.features[0].properties.postcode,
                      short_name: data.features[0].properties.postcode,
                      types: ['postal_code']
                    }
                  ],
                  formatted_address: data.features[0].properties.formatted,
                  geometry: {
                    location: {
                      lat: location.location.lat(),
                      lng: location.location.lng()
                    },
                    location_type: 'ROOFTOP',
                    viewport: {
                      northeast: {
                        lat: '',
                        lng: ''
                      },
                      southwest: {
                        lat: '',
                        lng: ''
                      }
                    }
                  },
                  place_id: data.features[0].properties.place_id,
                  types: ['Feature']
                }
              ]
            } catch (ex) {
              console.log('error al validar cache')
            }

            callback(resultado, 'OK')
          } else {
            resultado = [
              {
                address_components: [
                  {
                    long_name: '',
                    short_name: '',
                    types: ['street_number']
                  },
                  {
                    long_name: '',
                    short_name: '',
                    types: ['route']
                  },
                  {
                    long_name: '',
                    short_name: '',
                    types: ['neighborhood', 'political']
                  },
                  {
                    long_name: '',
                    short_name: '',
                    types: ['sublocality', 'political']
                  },
                  {
                    long_name: '',
                    short_name: '',
                    types: ['administrative_area_level_2', 'political']
                  },
                  {
                    long_name: '',
                    short_name: '',
                    types: ['administrative_area_level_1', 'political']
                  },
                  {
                    long_name: '',
                    short_name: '',
                    types: ['country', 'political']
                  },
                  {
                    long_name: '',
                    short_name: '',
                    types: ['postal_code']
                  }
                ],
                formatted_address: '',
                geometry: {
                  location: {
                    lat: location.location.lat(),
                    lng: location.location.lng()
                  },
                  location_type: 'ROOFTOP',
                  viewport: {
                    northeast: {
                      lat: '',
                      lng: ''
                    },
                    southwest: {
                      lat: '',
                      lng: ''
                    }
                  }
                },
                place_id: 0,
                types: ['Feature']
              }
            ]
            callback(resultado, 'OK')
          }
        }
      } catch (e) { }
    } else {
      if (location.hasOwnProperty('address')) {
        const xhr2 = new XMLHttpRequest()
        xhr2.open(
          'GET',
          'https://api.geoapify.com/v1/geocode/search?text=' +
          location.address +
          '&format=json&apiKey=' +
          par_KEYGEOAPIFY
        )
        try {
          xhr2.send()
          xhr2.responseType = 'json'
          xhr2.onload = () => {
            if (xhr2.readyState == 4 && xhr2.status == 200) {
              const data = xhr2.response
              var resultado = [
                {
                  formatted_address: data.results[0].formatted,
                  address_components: {
                    short_name: data.results[0].street,
                    long_name: data.results[0].street
                  },
                  geometry: {
                    location: {
                      lat: parseFloat(data.results[0].lat),
                      lng: parseFloat(data.results[0].lon)
                    }
                  }
                }
              ]
              callback(resultado, 'OK')
            }
          }
        } catch (e) {
          var resultado = [
            {
              formatted_address: '',
              address_components: {
                short_name: '',
                long_name: ''
              },
              geometry: {
                location: { lat: 0, lng: 0 }
              }
            }
          ]
          callback(resultado, 'OK')
        }
      }
    }
  }
}

class HereApiFy {
  HereApiFy() { }
  geocode(location, callback) {
    if (location.hasOwnProperty('location')) {
      ValidaCache(
        location.location.lat(),
        location.location.lng(),
        function (datosDevueltos) {
          if (datosDevueltos != '') {
            callback(datosDevueltos, 'OK')
            return
          }
        }
      )
      var requestOptions = {
        method: 'GET'
      }
      const xhr = new XMLHttpRequest()
      xhr.open(
        'GET',
        'https://revgeocode.search.hereapi.com/v1/revgeocode?at=' +
        location.location.lat() +
        ',' +
        location.location.lng() +
        '&lang=es-AR&apiKey=' +
        par_KEYHERE
      )
      xhr.send()
      xhr.responseType = 'json'
      xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          const data = xhr.response
          var resultado = [
            {
              address_components: [
                {
                  long_name: data.items[0].address.postalCode,
                  short_name: data.items[0].address.postalCode,
                  types: ['street_number']
                },
                {
                  long_name: data.items[0].address.street,
                  short_name: data.items[0].address.street,
                  types: ['route']
                },
                {
                  long_name: data.items[0].address.district,
                  short_name: data.items[0].address.district,
                  types: ['neighborhood', 'political']
                },
                {
                  long_name: data.items[0].address.city,
                  short_name: data.items[0].address.city,
                  types: ['sublocality', 'political']
                },
                {
                  long_name: data.items[0].address.state,
                  short_name: data.items[0].address.stateCode,
                  types: ['administrative_area_level_2', 'political']
                },
                {
                  long_name: data.items[0].address.state,
                  short_name: data.items[0].address.stateCode,
                  types: ['administrative_area_level_1', 'political']
                },
                {
                  long_name: data.items[0].address.countryName,
                  short_name: data.items[0].address.countryCode,
                  types: ['country', 'political']
                },
                {
                  long_name: data.items[0].address.postalCode,
                  short_name: data.items[0].address.postalCode,
                  types: ['postal_code']
                }
              ],
              formatted_address: data.items[0].address.label,
              geometry: {
                location: {
                  lat: location.location.lat(),
                  lng: location.location.lng()
                },
                location_type: 'ROOFTOP',
                viewport: {
                  northeast: {
                    lat: '',
                    lng: ''
                  },
                  southwest: {
                    lat: '',
                    lng: ''
                  }
                }
              },
              place_id: data.items[0].id,
              types: ['Feature']
            }
          ]
          callback(resultado, 'OK')
        }
      }
    } else {
      if (location.hasOwnProperty('address')) {
        const xhr2 = new XMLHttpRequest()
        xhr2.open(
          'GET',
          'https://geocode.search.hereapi.com/v1/geocode?q=' +
          location.address +
          '&apiKey=' +
          par_KEYHERE
        )
        xhr2.send()
        xhr2.responseType = 'json'
        xhr2.onload = () => {
          if (xhr2.readyState == 4 && xhr2.status == 200) {
            const data = xhr2.response
            var resultado = [
              {
                formatted_address: data.items[0].address.label,
                address_components: {
                  short_name: data.items[0].countryCode,
                  long_name: data.items[0].countryName
                },
                geometry: {
                  location: {
                    lat: parseFloat(data.items[0].position.lat),
                    lng: parseFloat(data.items[0].position.lng)
                  }
                }
              }
            ]
            callback(resultado, 'OK')
          }
        }
      }
    }
  }
}
function isXML(str) {
  var parser = new DOMParser()
  var xmlDoc = parser.parseFromString(str, 'text/xml')
  return xmlDoc.getElementsByTagName('parsererror').length === 0
}
function ValidaCache(lat, lng) {
  var data1 = ''
  var data = ''
  var resultado = ''

  Ext.Ajax.request({
    url: '/rest/Search/GeocoderSearch?Lat=' + lat + '&Lng=' + lng,
    //url: '/rest/Search/GeocoderSearch?Lat=-31.3882122&Lng=-64.2121255',
    method: 'GET',
    async: false,
    success: function (response) {
      data1 = Ext.JSON.decode(response.responseText)
      if (data1.rows == 0) return ''
      /***********Daniel O. Medina 17/04/2023 https://softguard.atlassian.net/browse/DSS-627*/
      if (data1.rows.length == 0) {
        return ''
      } else {
        /****************************** */
        try {
          if (
            data1.rows &&
            data1.rows.length > 0 &&
            data1.rows[0].DataXML != null
          ) {
            if (isXML(data1.rows[0].DataXML)) {
              var parser = new DOMParser()
              var dataXML = data1.rows[0] ? data1.rows[0].DataXML : null
              var xmlDoc = null

              if (dataXML) {
                var parser = new DOMParser()
                xmlDoc = parser.parseFromString(dataXML, 'text/xml')
              }

              var result = xmlDoc.getElementsByTagName('result')[0]
              var place_id = xmlDoc.getElementsByTagName('place_id')[0]
              var nameElement =
                result.getElementsByTagName('formatted_address')[0]

              var formatted_address = nameElement.textContent
              var street_number = ''
              var route = ''
              var neighborhood = ''
              var locality = ''
              var administrative_area_level_2 = ''
              var administrative_area_level_1 = ''
              var country = ''

              const x = xmlDoc.getElementsByTagName('address_component')
              for (let i = 0; i < x.length; i++) {
                const type =
                  x[i].getElementsByTagName('type')[0].childNodes[0].nodeValue
                const long_name =
                  x[i].getElementsByTagName('long_name')[0].childNodes[0]
                    .nodeValue
                switch (type) {
                  case 'street_number':
                    street_number = long_name
                    break
                  case 'route':
                    route = long_name
                    break
                  case 'neighborhood':
                    rouneighborhoodte = long_name
                    break
                  case 'locality':
                    locality = long_name
                    break
                  case 'administrative_area_level_2':
                    administrative_area_level_2 = long_name
                    break
                  case 'administrative_area_level_1':
                    administrative_area_level_1 = long_name
                    break
                  case 'country':
                    country = long_name
                    break
                }
              }

              resultado = [
                {
                  address_components: [
                    {
                      long_name: street_number,
                      short_name: street_number,
                      types: ['street_number']
                    },
                    {
                      long_name: route,
                      short_name: route,
                      types: ['route']
                    },
                    {
                      long_name: rouneighborhoodte,
                      short_name: rouneighborhoodte,
                      types: ['neighborhood', 'political']
                    },
                    {
                      long_name: locality,
                      short_name: locality,
                      types: ['sublocality', 'political']
                    },
                    {
                      long_name: administrative_area_level_2,
                      short_name: administrative_area_level_2,
                      types: ['administrative_area_level_2', 'political']
                    },
                    {
                      long_name: administrative_area_level_1,
                      short_name: administrative_area_level_1,
                      types: ['administrative_area_level_1', 'political']
                    },
                    {
                      long_name: country,
                      short_name: country,
                      types: ['country', 'political']
                    },
                    {
                      long_name: '',
                      short_name: '',
                      types: ['postal_code']
                    }
                  ],
                  formatted_address: nameElement,
                  geometry: {
                    location: {
                      lat: lat,
                      lng: lng
                    },
                    location_type: '',
                    viewport: {
                      northeast: {
                        lat: '',
                        lng: ''
                      },
                      southwest: {
                        lat: '',
                        lng: ''
                      }
                    }
                  },
                  place_id: place_id,
                  types: ['Feature']
                }
              ]
              callback(resultado)
            }
          } else {
            var dataXML = null
            if (data1.rows[0] !== undefined && data1.rows[0] !== null) {
              dataXML = data1.rows[0].DataXML
            }
            var data = null

            if (dataXML) {
              data = Ext.JSON.decode(dataXML)
            }
            resultado = [
              {
                address_components: [
                  {
                    long_name: data.items[0].address.houseNumber,
                    short_name: data.items[0].address.houseNumber,
                    types: ['street_number']
                  },
                  {
                    long_name: data.items[0].address.street,
                    short_name: data.items[0].address.street,
                    types: ['route']
                  },
                  {
                    long_name: data.items[0].address.district,
                    short_name: data.items[0].address.district,
                    types: ['neighborhood', 'political']
                  },
                  {
                    long_name: data.items[0].address.city,
                    short_name: data.items[0].address.city,
                    types: ['sublocality', 'political']
                  },
                  {
                    long_name: data.items[0].address.state,
                    short_name: data.items[0].address.stateCode,
                    types: ['administrative_area_level_2', 'political']
                  },
                  {
                    long_name: data.items[0].address.state,
                    short_name: data.items[0].address.stateCode,
                    types: ['administrative_area_level_1', 'political']
                  },
                  {
                    long_name: data.items[0].address.countryName,
                    short_name: data.items[0].address.countryCode,
                    types: ['country', 'political']
                  },
                  {
                    long_name: data.items[0].address.postalCode,
                    short_name: data.items[0].address.postalCode,
                    types: ['postal_code']
                  }
                ],
                formatted_address: data.items[0].title,
                geometry: {
                  location: {
                    lat: lat,
                    lng: lng
                  },
                  location_type: '',
                  viewport: {
                    northeast: {
                      lat: '',
                      lng: ''
                    },
                    southwest: {
                      lat: '',
                      lng: ''
                    }
                  }
                },
                place_id: data.items[0].id,
                types: ['Feature']
              }
            ]

            callback(resultado)
          }
        } catch (e) {
          console.log('error en validacache')
        }
      }
    }
  })
}
// ImgMapType class
//////////////////////////////////
/*
var Demo = Demo || {};
Demo.ImgMapType = function (theme, backgroundColor) {
    this.name = this._theme = theme;
    this._backgroundColor = backgroundColor;
};

Demo.ImgMapType.prototype.tileSize = new google.maps.Size(256, 256);
Demo.ImgMapType.prototype.minZoom = 0;
Demo.ImgMapType.prototype.maxZoom = 5;

Demo.ImgMapType.prototype.getTile = function (coord, zoom, ownerDocument) {
    var tilesCount = Math.pow(2, zoom);

    if (coord.x >= tilesCount || coord.x < 0 || coord.y >= tilesCount || coord.y < 0) {
        var div = ownerDocument.createElement('div');
        div.style.width = this.tileSize.width + 'px';
        div.style.height = this.tileSize.height + 'px';
        div.style.backgroundColor = this._backgroundColor;
        return div;
    }

    var img = ownerDocument.createElement('IMG');
    img.width = this.tileSize.width;
    img.height = this.tileSize.height;
    img.src = Demo.Utils.GetImageUrl(this._theme + '/tile_' + zoom + '_' + coord.x + '-' + coord.y + '.png');

    return img;
};
*/

/* =====================================================================
 * DSS-1532: polyfill de google.maps.drawing.DrawingManager (removido por
 * Google en Maps JS API v3.65) respaldado en Terra Draw. Vive aca, en el
 * panel que el compilador realmente usa (gmappanel6 = este archivo), como
 * codigo top-level que SI entra al build. Se instala desde apiReady().
 * ===================================================================== */
(function () {

    // Vendorizado en /utils/ del server (los CDN externos estan bloqueados en GCS y clientes).
    var TD_CORE = '/utils/terra-draw.umd.js';
    var TD_GMAP = '/utils/terra-draw-google-maps-adapter.umd.js';

    var tdLoading = false, tdCallbacks = [];

    // el UMD del adapter se cuelga de su PROPIO global (window.terraDrawGoogleMapsAdapter),
    // no de window.terraDraw. Lo resolvemos con fallback por las dudas.
    function tdAdapterClass() {
        return (window.terraDrawGoogleMapsAdapter && window.terraDrawGoogleMapsAdapter.TerraDrawGoogleMapsAdapter)
            || (window.terraDraw && window.terraDraw.TerraDrawGoogleMapsAdapter)
            || null;
    }

    function tdAvailable() {
        return !!(window.terraDraw && window.terraDraw.TerraDraw && tdAdapterClass());
    }

    function loadScript(src, cb) {
        var s = document.createElement('script');
        s.src = src; s.async = true;
        s.onload = cb;
        s.onerror = function () { console.error('DSS-1532: no se pudo cargar Terra Draw: ' + src); };
        document.getElementsByTagName('head')[0].appendChild(s);
    }

    function ensureTerraDraw(cb) {
        if (tdAvailable()) { cb && cb(); return; }
        if (cb) { tdCallbacks.push(cb); }
        if (tdLoading) { return; }
        tdLoading = true;
        loadScript(TD_CORE, function () {
            loadScript(TD_GMAP, function () {
                var cbs = tdCallbacks; tdCallbacks = [];
                cbs.forEach(function (f) { try { f(); } catch (e) { console.error(e); } });
            });
        });
    }

    function bboxCenter(ring) {
        var minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;
        for (var i = 0; i < ring.length; i++) {
            var c = ring[i];
            if (c[0] < minLng) minLng = c[0];
            if (c[0] > maxLng) maxLng = c[0];
            if (c[1] < minLat) minLat = c[1];
            if (c[1] > maxLat) maxLat = c[1];
        }
        return { lat: (minLat + maxLat) / 2, lng: (minLng + maxLng) / 2 };
    }

    // haversine en metros (fallback si no viene radiusKilometers)
    function haversineMeters(aLat, aLng, bLat, bLng) {
        var R = 6378137, toRad = Math.PI / 180;
        var dLat = (bLat - aLat) * toRad, dLng = (bLng - aLng) * toRad;
        var s = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(aLat * toRad) * Math.cos(bLat * toRad) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        return 2 * R * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
    }

    function localeSafe(s) { try { return (typeof window.getLocale === 'function') ? window.getLocale(s) : s; } catch (e) { return s; } }

    // google OverlayType -> Terra Draw mode name
    var TD_MODE = { circle: 'circle', polygon: 'polygon', polyline: 'linestring', marker: 'point' };

    function SgDrawingManager(options) {
        options = options || {};
        this._values = {};
        for (var k in options) { if (options.hasOwnProperty(k)) { this._values[k] = options[k]; } }
        this._map = options.map || null;
        this._mode = options.drawingMode || null;
        this._td = null;
        this._tdReady = false;
        this._controlDiv = null;
        this._buttons = {};
        if (this._map) { this._attach(this._map); }
    }

    SgDrawingManager.prototype.get = function (k) { return this._values[k]; };
    SgDrawingManager.prototype.set = function (k, v) { this._values[k] = v; };

    // setOptions: compat con google.maps.drawing.DrawingManager. Lo usan algunos
    // controllers (toggle de botonera). Mergea opciones y muestra/oculta la botonera
    // segun drawingControl; si viene drawingMode lo aplica.
    SgDrawingManager.prototype.setOptions = function (options) {
        options = options || {};
        for (var k in options) { if (options.hasOwnProperty(k)) { this._values[k] = options[k]; } }
        if (options.drawingControl != null && this._controlDiv) {
            this._controlDiv.style.display = options.drawingControl ? 'flex' : 'none';
        }
        if (options.drawingMode !== undefined) { this.setDrawingMode(options.drawingMode); }
    };

    SgDrawingManager.prototype.setMap = function (map) {
        if (this._map === map) { return; }
        this._detach();
        this._map = map;
        this._values.map = map;
        if (map) { this._attach(map); }
    };

    SgDrawingManager.prototype._attach = function (map) {
        var me = this;
        this._buildControl(map);
        ensureTerraDraw(function () { me._initTerraDraw(map); });
    };

    SgDrawingManager.prototype._initTerraDraw = function (map) {
        var me = this;
        var TD = window.terraDraw;
        var Adapter = tdAdapterClass();
        try {
            this._td = new TD.TerraDraw({
                adapter: new Adapter({ lib: google.maps, map: map, coordinatePrecision: 9 }),
                modes: [
                    new TD.TerraDrawCircleMode(),
                    new TD.TerraDrawPolygonMode(),
                    new TD.TerraDrawLineStringMode(),
                    new TD.TerraDrawPointMode()
                ]
            });
            this._td.start();
            // el adapter de Google avisa por 'ready' (crea un OverlayView async)
            this._td.on('ready', function () {
                me._tdReady = true;
                me._td.setMode('static');
                if (me._mode) { me.setDrawingMode(me._mode); }
            });
            this._td.on('finish', function (id, context) {
                // solo emito cuando el usuario esta en un modo de dibujo (no edicion)
                if (!me._mode) { return; }
                if (context && context.action && context.action !== 'draw') { return; }
                var feat = null;
                try { feat = me._td.getSnapshotFeature ? me._td.getSnapshotFeature(id) : null; } catch (e) { }
                if (!feat) {
                    try {
                        var snap = me._td.getSnapshot() || [];
                        for (var i = 0; i < snap.length; i++) { if (snap[i].id === id) { feat = snap[i]; break; } }
                    } catch (e2) { }
                }
                if (feat) { me._emitFromFeature(feat); }
                // limpio la figura de Terra Draw: dejamos la figura NATIVA en el mapa
                try { me._td.removeFeatures([id]); } catch (e3) { try { me._td.clear(); } catch (e4) { } }
                me._mode = null;
                me._highlightButton(null);
                if (me._tdReady) { me._td.setMode('static'); }
            });
        } catch (e) {
            console.error('DSS-1532: error inicializando Terra Draw', e);
        }
    };

    SgDrawingManager.prototype._emitFromFeature = function (feat) {
        var me = this, props = feat.properties || {}, geom = feat.geometry;
        if (!geom) { return; }
        var overlay, type;

        var isCircle = (props.mode === 'circle') || (props.radiusKilometers != null);
        if (isCircle && geom.type === 'Polygon') {
            type = 'circle';
            var ring = geom.coordinates[0];
            var center = bboxCenter(ring);
            var radius = (props.radiusKilometers != null)
                ? props.radiusKilometers * 1000
                : haversineMeters(center.lat, center.lng, ring[0][1], ring[0][0]);
            overlay = new google.maps.Circle(this._merge({
                center: new google.maps.LatLng(center.lat, center.lng),
                radius: radius,
                map: me._map
            }, me._values.circleOptions));
            overlay.radius = radius; // los controllers leen newShape.radius
        } else if (geom.type === 'Polygon') {
            type = 'polygon';
            var pcoords = geom.coordinates[0].slice();
            // GeoJSON cierra el anillo (primer==ultimo): saco el de cierre
            if (pcoords.length > 1) { pcoords.pop(); }
            overlay = new google.maps.Polygon(this._merge({
                paths: pcoords.map(function (c) { return new google.maps.LatLng(c[1], c[0]); }),
                map: me._map
            }, me._values.polygonOptions));
        } else if (geom.type === 'LineString') {
            type = 'polyline';
            overlay = new google.maps.Polyline(this._merge({
                path: geom.coordinates.map(function (c) { return new google.maps.LatLng(c[1], c[0]); }),
                map: me._map
            }, me._values.polylineOptions));
        } else if (geom.type === 'Point') {
            // marker -> markercomplete (compat con flujo de rutas)
            var mk = new google.maps.Marker(this._merge({
                position: new google.maps.LatLng(geom.coordinates[1], geom.coordinates[0]),
                map: me._map
            }, me._values.markerOptions));
            google.maps.event.trigger(me, 'markercomplete', mk);
            return;
        } else {
            return;
        }
        overlay.type = type;
        google.maps.event.trigger(me, 'overlaycomplete', { type: type, overlay: overlay });
    };

    SgDrawingManager.prototype._merge = function (base, extra) {
        if (extra) { for (var k in extra) { if (extra.hasOwnProperty(k)) { base[k] = extra[k]; } } }
        return base;
    };

    SgDrawingManager.prototype.setDrawingMode = function (mode) {
        this._mode = mode;
        this._highlightButton(mode);
        if (!this._td || !this._tdReady) { return; } // se aplica en 'ready'
        var tdMode = TD_MODE[mode];
        try { this._td.setMode(tdMode || 'static'); } catch (e) { console.error(e); }
        google.maps.event.trigger(this, 'drawingmode_changed');
    };

    SgDrawingManager.prototype._buildControl = function (map) {
        var me = this;
        if (this._values.drawingControl === false) { return; }
        var modes = (this._values.drawingControlOptions && this._values.drawingControlOptions.drawingModes) || [];
        if (!modes.length) { return; } // readOnly: sin botonera
        var div = document.createElement('div');
        div.style.cssText = 'margin:8px; display:flex; gap:4px;';
        var labels = { circle: 'Círculo', polygon: 'Polígono', polyline: 'Línea', marker: 'Punto' };
        modes.forEach(function (m) {
            if (!TD_MODE[m]) { return; }
            var b = document.createElement('button');
            b.type = 'button';
            b.innerHTML = localeSafe(labels[m] || m);
            b.style.cssText = 'padding:5px 10px; cursor:pointer; background:#fff; border:1px solid #bbb; border-radius:3px; font:12px sans-serif; box-shadow:0 1px 3px rgba(0,0,0,.2);';
            b.onclick = function () { me.setDrawingMode(me._mode === m ? null : m); };
            me._buttons[m] = b;
            div.appendChild(b);
        });
        this._controlDiv = div;
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(div);
    };

    SgDrawingManager.prototype._highlightButton = function (mode) {
        for (var k in this._buttons) {
            if (!this._buttons.hasOwnProperty(k)) { continue; }
            var on = (k === mode);
            this._buttons[k].style.background = on ? '#1E90FF' : '#fff';
            this._buttons[k].style.color = on ? '#fff' : '#000';
        }
    };

    SgDrawingManager.prototype._detach = function () {
        if (this._td) { try { this._td.stop(); } catch (e) { } this._td = null; }
        if (this._controlDiv && this._map) {
            try {
                var arr = this._map.controls[google.maps.ControlPosition.TOP_CENTER];
                for (var i = 0; i < arr.getLength(); i++) { if (arr.getAt(i) === this._controlDiv) { arr.removeAt(i); break; } }
            } catch (e) { }
        }
        this._controlDiv = null;
        this._buttons = {};
        this._tdReady = false;
    };

    // expongo y polyfilleo google.maps.drawing
    window.SgDrawingManager = SgDrawingManager;
    window.ensureTerraDraw = ensureTerraDraw;
    window.installSgDrawingPolyfill = function () {
        if (!window.google || !google.maps) { return false; }
        if (!google.maps.drawing) { google.maps.drawing = {}; }
        if (!google.maps.drawing.OverlayType) {
            google.maps.drawing.OverlayType = { MARKER: 'marker', POLYGON: 'polygon', POLYLINE: 'polyline', CIRCLE: 'circle', RECTANGLE: 'rectangle' };
        }
        // el DrawingManager nativo ya no existe -> lo reemplazo por el nuestro
        google.maps.drawing.DrawingManager = SgDrawingManager;
        return true;
    };


    // NOTA: NO se auto-instala con un poller de setTimeout. En SmartPanics (build
    // Cordova) ese poller mantenia vivo el event loop del slicer de temas (phantomjs)
    // y el slicer avanzaba a definir stores de 'common' que llaman getLocale() top-level
    // (ej. ActionTypeStore.js), inexistente en phantomjs -> rompia el build.
    // La instalacion se dispara explicitamente desde el panel/controller (onMapReady),
    // que solo corre en navegador real cuando google.maps ya cargo.
})();
Ext.define('Ext.ux.GMapPanel6', {
  extend: 'Ext.Component',

  alias: 'widget.gmappanel6',

  requires: ['Ext.window.MessageBox'],
  border: !1,
  listeners: {
    resize: function () {
      if (typeof arguments[1] != 'object') this.onResize(arguments)
    }
  },
  respErrors: [
    {
      code: 'UNKNOWN_ERROR',
      msg: getLocale(
        'A geocoding or directions request could not be successfully processed, yet the exact reason for the failure is not known.'
      )
    },
    {
      code: 'ERROR',
      msg: getLocale('There was a problem contacting the Google servers.')
    },
    {
      code: 'ZERO_RESULTS',
      msg: getLocale(
        'The request did not encounter any errors but returns zero results.'
      )
    },
    {
      code: 'INVALID_REQUEST',
      msg: getLocale('This request was invalid.')
    },
    {
      code: 'REQUEST_DENIED',
      msg: getLocale(
        'The webpage is not allowed to use the geocoder for some reason.'
      )
    },
    {
      code: 'OVER_QUERY_LIMIT',
      msg: getLocale(
        'The webpage has gone over the requests limit in too short a period of time.'
      )
    }
  ],
  locationTypes: [
    {
      level: 4,
      code: 'ROOFTOP',
      msg: getLocale(
        'The returned result is a precise geocode for which we have location information accurate down to street address precision.'
      )
    },
    {
      level: 3,
      code: 'RANGE_INTERPOLATED',
      msg: getLocale(
        'The returned result reflects an approximation (usually on a road) interpolated between two precise points (such as intersections). Interpolated results are generally returned when rooftop geocodes are unavailable for a street address.'
      )
    },
    {
      level: 2,
      code: 'GEOMETRIC_CENTER',
      msg: getLocale(
        'The returned result is the geometric center of a result such as a polyline (for example, a street) or polygon (region).'
      )
    },
    {
      level: 1,
      code: 'APPROXIMATE',
      msg: getLocale('The returned result is approximate.')
    }
  ],
  respErrorTitle: getLocale('Error'),
  geoErrorMsgUnable: getLocale('Unable to Locate the Address you provided'),
  geoErrorTitle: getLocale('Address Location Error'),
  geoErrorMsgAccuracy: getLocale(
    'The address provided has a low accuracy.<br><br>"{0}" Accuracy.<br><br>{1}'
  ),
  gmapType: 'map',
  mapReady: !1,
  zoomLevel: 5,
  geocoderKeyMissing: false,
  yaw: 180,
  pitch: 0,
  displayGeoErrors: !1,
  minGeoAccuracy: 'ROOFTOP',
  mapDefined: !1,
  mapDefinedGMap: !1,
  isTrafficEnabled: false,
  trafficLayer: null,
  trafficLabel: getLocale('Tráfico'),
  initComponent: function () {
    /*
        this.addEvents(
            'mapready',
            'apiready'
        );
        */

    Ext.applyIf(this, {
      markers: [],
      cache: {
        marker: [],
        polyline: [],
        infowindow: [],
        circle: []
      }
    })

    this.callParent()

    // Varias instancias de gmappanel6 se construyen en simultaneo al iniciar la app
    // (SerTecController.initview crea todos los tabs de una, deferredRender solo difiere
    // el pintado en DOM, no la construccion). Sin esta cola, cada instancia inyecta su
    // propio <script>, y solo la ultima en resolver "gana" el callback global.
    if (window.google && window.google.maps) {
      this.on('afterrender', this.apiReady, this)
    } else if (window.__gmapsLoading) {
      window.__gmapsLoadingCallbacks.push(Ext.Function.bind(this.apiReady, this))
    } else {
      window.__gmapsLoading = true
      window.__gmapsLoadingCallbacks = [Ext.Function.bind(this.apiReady, this)]
      window.gmapapiready = function () {
        window.__gmapsLoadingCallbacks.forEach(function (cb) { cb() })
      }

      //var script = '//maps.google.com/maps/api/js?v=3.17&callback=gmapapiready&libraries=drawing,visualization';
      // DSS-1532: Google removio la libreria 'drawing' (DrawingManager) en v3.65.
      // El dibujo de geocercas lo da el polyfill (Terra Draw).
      // DSS-1537: Google decomisiono HeatmapLayer (unica clase de 'visualization' que usa MapGuard)
      //           en v3.65; cargar 'visualization' instala un getter que TIRA al load. Como el
      //           HeatMap ahora va por polyfill propio, se saca la libreria por completo.
      var script = '//maps.google.com/maps/api/js?callback=gmapapiready'

      if (
        _UserData &&
        _UserData &&
        _UserData.metadata &&
        _UserData.metadata.language
      ) {
        script += '&language=' + _UserData.metadata.language.slice(0, 2)
      }

      if (par_KEYGOOGLEMAPS) {
        this.key = par_KEYGOOGLEMAPS
      }

      if (this.key) {
        script = script + '&key=' + this.key
      }
      this.buildScriptTag(script)

      //var zoom = 'http://gmaps-utility-library.googlecode.com/svn/trunk/dragzoom/release/src/dragzoom.js';
      //this.buildScriptTag(zoom);
    }
  },
  apiReady: function () {
    // DSS-1532: instalo el polyfill de google.maps.drawing (Terra Draw) y precargo
    // la libreria, antes de que cualquier vista de geocercas use DrawingManager.
    if (typeof installSgDrawingPolyfill === 'function') { installSgDrawingPolyfill(); }
    if (typeof ensureTerraDraw === 'function') { ensureTerraDraw(); }
    //this.buildScriptTag( "/js/Trackguard/OverlappingFeatureSpiderfier.js" );
    //this.buildScriptTag( "/js/Trackguard/OverlappingFeatureSpiderfiermap" );

    //this.buildScriptTag( "https://jawj.github.io/OverlappingMarkerSpiderfier/bin/oms.min.js" );

    if (
      (par_LABELMOVILTRACKVIEW == 1 &&
        (this.buildScriptTag('/js/Trackguard/markerwithlabel.js'),
          this.buildScriptTag('/js/Trackguard/maplabel.js')),
        this.rendered)
    )
      Ext.defer(
        function () {
          var t = [],
            i,
            r,
            n
          for (i in google.maps.MapTypeId) t.push(google.maps.MapTypeId[i])
          if (
            (t.push('OSM'),
              (this.gmap = new google.maps.Map(this.getEl().dom, {
                zoom: this.zoomLevel,
                fullscreenControl: !1,
                mapTypeControlOptions: {
                  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                  mapTypeIds: t
                }
              })),
              (r = this.gmap),
              this.gmap.mapTypes.set(
                'OSM',
                new google.maps.ImageMapType({
                  getTileUrl: function (n, t) {
                    return (
                      '//a.tile.openstreetmap.org/' +
                      t +
                      '/' +
                      n.x +
                      '/' +
                      n.y +
                      '.png'
                    )
                  },
                  tileSize: new google.maps.Size(256, 256),
                  alt: getLocale('Open Streetmap'),
                  name: getLocale('OpenStreet'),
                  maxZoom: 18
                })
              ),
              UiApplicationMetadata.MapType &&
              UiApplicationMetadata.MapType == 'CUSTOM')
          ) {
            t.push('CUSTOM')
            var u = new google.maps.LatLngBounds(
              new google.maps.LatLng(-85.051129, -180),
              new google.maps.LatLng(85.051129, 179.990161)
            ),
              f = 0,
              e = 5
            this.gmap.mapTypes.set(
              'CUSTOM',
              new google.maps.ImageMapType({
                getTileUrl: function (n, t) {
                  var o = r.getProjection(),
                    i = Math.pow(2, t),
                    s = 256 / i,
                    h = 256 / i,
                    c = new google.maps.LatLngBounds(
                      o.fromPointToLatLng(
                        new google.maps.Point(n.x * s, (n.y + 1) * h)
                      ),
                      o.fromPointToLatLng(
                        new google.maps.Point((n.x + 1) * s, n.y * h)
                      )
                    ),
                    l = n.y,
                    a = n.x
                  return n.x >= i || n.x < 0 || n.y >= i || n.y < 0
                    ? '/custommap/none.png'
                    : n.x >= 0 && u.intersects(c) && f <= t && t <= e
                      ? '/custommap/tile_' + t + '_' + a + '-' + l + '.png'
                      : '/custommap/none.png'
                },
                tileSize: new google.maps.Size(256, 256),
                isPng: !0,
                alt: getLocale('Custom'),
                name: getLocale('Custom'),
                maxZoom: 5,
                minZoom: 2,
                opacity: 1
              })
            )
            this.gmap.setMapTypeId('CUSTOM')
            this.gmap.setOptions({
              mapTypeControl: !1
            })
          }
          this.mapDefined = !0
          this.mapDefinedGMap = !0
          google.maps.event.addListenerOnce(
            this.getMap(),
            'tilesloaded',
            Ext.Function.bind(this.onMapReady, this)
          )
          google.maps.event.addListener(
            this.getMap(),
            'dragend',
            Ext.Function.bind(this.dragEnd, this)
          )
          google.maps.event.addListener(
            this.getMap(),
            'zoom_changed',
            Ext.Function.bind(this.zoom_changed, this)
          )
          typeof this.setCenter == 'object'
            ? (typeof this.setCenter.geoCodeAddr == 'string'
              ? this.geoCodeLookup(
                this.setCenter.geoCodeAddr,
                this.setCenter.marker,
                !1,
                !0,
                this.setCenter.listeners
              )
              : (this.gmapType === 'map' &&
                ((n = new google.maps.LatLng(
                  this.setCenter.lat,
                  this.setCenter.lng
                )),
                  this.getMap().setCenter(n, this.zoomLevel),
                  (this.lastCenter = n)),
                typeof this.setCenter.marker == 'object' &&
                typeof n == 'object' &&
                this.addMarker(
                  n,
                  this.setCenter.marker,
                  this.setCenter.marker.clear,
                  !0,
                  this.setCenter.listeners
                )),
              this.gmapType === 'panorama' &&
              this.getMap().setLocationAndPOV(
                new google.maps.LatLng(
                  this.setCenter.lat,
                  this.setCenter.lng
                ),
                {
                  yaw: this.yaw,
                  pitch: this.pitch,
                  zoom: this.zoomLevel
                }
              ))
            : (_UserData &&
              _UserData.metadata &&
              _UserData.metadata.provincia &&
              _UserData.metadata.provincia.nombre != '' &&
              (par_NOMBREPAIS =
                _UserData.metadata.provincia.nombre + ' ' + par_NOMBREPAIS),
              this.geoCodeLookup(par_NOMBREPAIS, undefined, !1, !0))
        },
        200,
        this
      )
    else this.on('afterrender', this.apiReady, this)
    google.maps.Polyline.prototype.getBounds ||
      (google.maps.Polyline.prototype.getBounds = function () {
        var n = new google.maps.LatLngBounds()
        return (
          this.getPath().forEach(function (t) {
            n.extend(t)
          }),
          n
        )
      })
  },
  afterRender: function () {
    this.callParent(arguments)
  },
  buildScriptTag: function (n) {
    var t = document.createElement('script'),
      i = document.getElementsByTagName('head')[0]
    return (t.type = 'text/javascript'), (t.src = n), i.appendChild(t)
  },
  onMapReady: function () {
    return (
      google.maps.Polygon.prototype.getBounds ||
      (google.maps.Polygon.prototype.getBounds = function () {
        for (
          var n,
          r = new google.maps.LatLngBounds(),
          u = this.getPaths(),
          t,
          i = 0;
          i < u.getLength();
          i++
        )
          for (t = u.getAt(i), n = 0; n < t.getLength(); n++)
            r.extend(t.getAt(n))

        return r
      }),
      this.getGeocoder(),
      this.addMapControls(),
      this.addOptions(),
      this.addMarkers(this.markers),
      this.addMapListeners(),
      par_MAPTYPEDSK && this.getMap().setMapTypeId(par_MAPTYPEDSK),
      UiApplicationMetadata.MapType &&
      UiApplicationMetadata.MapType == 'CUSTOM' &&
      (this.getMap().setMapTypeId('CUSTOM'), (this.freezoom = !0)),
      (this.mapReady = !0),
      this.fireEvent('mapready', this, this.getMap()),
      this.createTrafficControl(this.getMap())
    )
  },
  createTrafficControl: function (map) {
    this.trafficLayer = new google.maps.TrafficLayer()

    const centerControlDiv = document.createElement('div')
    const centerControl = this.createTrafficButton()
    centerControlDiv.appendChild(centerControl)
    // .TOP_CENTER
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv)
  },
  createTrafficButton: function () {
    const controlButton = document.createElement('button')

    controlButton.style.backgroundColor = '#fff'
    controlButton.style.border = '2px solid #fff'
    controlButton.style.borderRadius = '3px'
    controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
    controlButton.style.color = 'rgb(25,25,25)'
    controlButton.style.cursor = 'pointer'
    controlButton.style.fontFamily = 'Roboto,Arial,sans-serif'
    controlButton.style.fontSize = '16px'
    controlButton.style.lineHeight = '38px'
    controlButton.style.margin = '8px 11px 22px'
    controlButton.style.padding = '0 5px'
    controlButton.style.textAlign = 'center'
    controlButton.textContent = this.trafficLabel
    controlButton.title = 'Mostrar trafico'
    controlButton.type = 'button'

    controlButton.addEventListener('click', () => {
      this.setTrafficMap()
    })

    return controlButton
  },
  setTrafficMap: function () {
    this.isTrafficEnabled = !this.isTrafficEnabled
    this.trafficLayer.setMap(this.isTrafficEnabled ? this.getMap() : null)
  },
  addMapListeners: function () {
    this.maplisteners &&
      Ext.iterate(
        this.maplisteners,
        function (n, t) {
          google.maps.event.addListener(
            this.getMap(),
            n,
            Ext.Function.bind(t, this)
          )
        },
        this
      )
  },
  onResize: function () {
    this.callParent(arguments)
    typeof this.getMap() == 'object' &&
      (google.maps.event.trigger(this.getMap(), 'resize'), this.zoom_changed())
  },
  setSize: function () {
    this.callParent(arguments)
    Ext.isObject(this.getMap()) &&
      (google.maps.event.trigger(this.getMap(), 'resize'),
        this.lastCenter &&
        this.getMap().setCenter(this.lastCenter, this.zoomLevel))
  },
  dragEnd: function () {
    this.lastCenter = this.getMap().getCenter()
    this.fireEvent('manualcenter', this)
  },
  zoom_changed: function () {
    var n
    if (this.freezoom) return !0
    var t = this.getMap(),
      i = -360,
      r = t.getZoom()
    i < 0 && (i += 360)
    n = Math.round(Math.log(this.getWidth() / 256) / Math.LN2)
    r <= n && n > 0 && isFinite(n) && !this.forceZoom && t.setZoom(n + 1)
    this.forceZoom = !1
  },
  getMap: function () {
    return this.gmap
  },
  getCenter: function () {
    return this.getMap().getCenter()
  },
  getCenterLatLng: function () {
    var n = this.getCenter();
    var lat = n && n.lat && n.lat() ? n.lat() : 0;
    var lng = n && n.lng && n.lng() ? n.lng() : 0;
    return {
      lat,
      lng
    }
  },
  addMarkers: function (n) {
    var t, i
    if (Ext.isArray(n))
      for (t = 0; t < n.length; t++)
        n[t] &&
          (typeof n[t].geoCodeAddr == 'string'
            ? this.geoCodeLookup(
              n[t].geoCodeAddr,
              n[t],
              !1,
              n[t].setCenter,
              n[t].listeners
            )
            : ((i = new google.maps.LatLng(n[t].lat, n[t].lng)),
              this.addMarker(i, n[t], !1, n[t].setCenter, n[t].listeners)))
  },
  addMarker: function (n, t, i, r, u) {
    var f
    if (
      (Ext.applyIf(t, {}),
        i === !0 && this.clearMarkers(),
        r === !0 &&
        (this.getMap().setCenter(n, this.zoomLevel), (this.lastCenter = n)),
        (f =
          typeof MarkerWithLabel == 'function'
            ? new MarkerWithLabel(
              Ext.apply(t, {
                position: n
              })
            )
            : new google.maps.Marker(
              Ext.apply(t, {
                position: n,
                optimized: !1
              })
            )),
        t.infoWindow && this.createInfoWindow(t.infoWindow, n, f),
        this.cache.marker.push(f),
        f.setMap(this.getMap()),
        typeof u == 'object')
    )
      for (evt in u) google.maps.event.addListener(f, evt, u[evt])
    return t.record && (t.record.marker = f), f
  },
  addPolyline: function (n, t) {
    var r = new google.maps.MVCArray(),
      t = t
        ? t
        : {
          strokeColor: '#FF0000',
          strokeOpacity: 1,
          strokeWeight: 2
        },
      i
    Ext.each(
      n,
      function (n) {
        r.push(new google.maps.LatLng(n.lat, n.lng))
      },
      this
    )
    i = new google.maps.Polyline(
      Ext.apply(
        {
          path: r
        },
        t
      )
    )
    this.cache.polyline.push(i)
    i.setMap(this.getMap())
  },
  createInfoWindow: function (n, t, i) {
    var u = 'click',
      f = this,
      r = new google.maps.InfoWindow({
        content: n.content,
        position: t,
        disableAutoPan: n.disableAutoPan
      })
    return (
      n.listener && (u = n.listener),
      i &&
      google.maps.event.addListener(i, u, function () {
        f.hideAllInfoWindows()
        r.open(f.getMap(), i)
      }),
      this.cache.infowindow.push(r),
      r
    )
  },
  hideAllInfoWindows: function () {
    if (this.cache != undefined) {
      for (var n = 0; n < this.cache.infowindow.length; n++)
        this.cache.infowindow[n].close()
    }
  },
  clearMarkers: function () {
    this.hideAllInfoWindows()
    this.hideMarkers()
    this.hideCircle()
    this.hidePolylines()
  },
  hidePolylines: function () {
    Ext.each(this.cache.polyline, function (n) {
      n.setMap(null)
    })
  },
  hideMarkers: function () {
    Ext.each(this.cache.marker, function (n) {
      n.setMap(null)
    })
  },
  hideCircle: function () {
    Ext.each(this.cache.circle, function (n) {
      n.setMap(null)
    })
  },
  showMarkers: function () {
    Ext.each(
      this.cache.marker,
      function (n) {
        n.setMap(this.getMap())
      },
      this
    )
  },
  addMapControls: function () {
    var n = this.getMap()
    if (this.gmapType === 'map')
      if (Ext.isArray(this.mapControls))
        for (i = 0; i < this.mapControls.length; i++)
          this.addMapControl(this.mapControls[i])
      else
        typeof this.mapControls == 'string'
          ? this.addMapControl(this.mapControls)
          : typeof this.mapControls == 'object' &&
          this.getMap().add_control(this.mapControls)
    this.getMap().setOptions({
      fullscreenControl: !1
    })
  },
  addMapControl: function (n) {
    var t = window[n]
    typeof t == 'function' && this.getMap().addControl(new t())
  },
  addOptions: function () {
    this.getMap().setOptions(this.mapConfOpts)
  },
  addOption: function (n) {
    var t = this.getMap()[n]
    typeof t == 'function' && this.getMap()[n]()
  },
  geoCodeLookup: function (n, t, i, r, u) {
    try {
      this.geocoder || (this.geocoder = new google.maps.Geocoder())
      if (this.geocoder && !this.geocoderKeyMissing) {
        try {
          this.geocoder.geocode(
            {
              address: n
            },
            Ext.Function.bind(this.addAddressToMap, this, [n, t, i, r, u], !0)
          );
        } catch (e) {
          console.log('Error en geocode google maps')
        }
      }
    } catch (error) {
      console.log('Error en geocode google maps');
    }
  },
  getGeocoder: function () {
    //return new GoogleGeoCode();

    //var
    if (par_GEOCODINGPROVIDER == null) {
      par_GEOCODINGPROVIDER = 1
    }
    if (par_GEOCODINGPROVIDER == 1) {
      //return this.geocoder || ( this.geocoder = new google.maps.Geocoder ),
      //    this.geocoder
      return new GoogleGeoCode()
    }
    if (par_GEOCODINGPROVIDER == 2) {
      return new GeocoderApiFy()
    }
    if (par_GEOCODINGPROVIDER == 3) {
      return new HereApiFy()
    }
  },

  centerOnClientLocation: function () {
    this.getClientLocation(function (n) {
      var t = new google.maps.LatLng(n.latitude, n.longitude)
      this.getMap().setCenter(t, this.zoomLevel)
      this.lastCenter = t
    })
  },
  getClientLocation: function (n, t) {
    t || (t = Ext.emptyFn)
    this.clientGeo ||
      (this.clientGeo = google.gears.factory.create('beta.geolocation'))
    geo.getCurrentPosition(Ext.Function.bind(n, this), t)
  },
  addAddressToMap: function (n, t, i, r, u, f, e) {
    var s

    try {
      if (n && t === 'OK') {
        var o = n[0].geometry.location,
          h = this.getLocationTypeInfo(n[0].geometry.location_type, 'level'),
          c = this.getLocationTypeInfo(this.minGeoAccuracy, 'level')
        h === 0
          ? this.geoErrorMsg(this.geoErrorTitle, this.geoErrorMsgUnable)
          : ((point = new google.maps.LatLng(o.lat(), o.lng())),
            f &&
            (this.getMap().setCenter(point, this.zoomLevel),
              (this.lastCenter = point)),
            typeof r == 'object' &&
            (r.title || (r.title = n.formatted_address),
              (s = this.addMarker(point, r, u, !1, e)),
              r.callback && r.callback.call(this, s, point)))
      } else if (t == 'REQUEST_DENIED') {
        this.geocoderKeyMissing = true
        this.getMap().setCenter(new google.maps.LatLng(0, 0), this.zoomLevel)
      } else this.geoCodeLookup(getParametro('NOMBREPAIS'), undefined, !1, !0)
    } catch (error) {
      console.log('Error en addAddressToMap google maps')
    }
  },
  geoErrorMsg: function (n, t) {
    this.displayGeoErrors && Ext.MessageBox.alert(n, t)
  },
  respErrorMsg: function (n) {
    Ext.each(
      this.respErrors,
      function (t) {
        n == t.code && Ext.MessageBox.alert(this.respErrorTitle, t.msg)
      },
      this
    )
  },
  getLocationTypeInfo: function (n, t) {
    var i = 0
    return (
      Ext.each(this.locationTypes, function (r) {
        r.code === n && (i = r[t])
      }),
      i
    )
  }
})
