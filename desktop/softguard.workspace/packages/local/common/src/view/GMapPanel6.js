var par_MAPTYPEDSK;
var par_NOMBREPAIS;
var par_KEYGOOGLEMAPS;
var par_LABELMOVILTRACKVIEW = getParametro('LABELMOVILTRACKVIEW');
var par_GEOCODINGPROVIDER;
var par_KEYGEOAPIFY;
var par_KEYHERE;

par_MAPTYPEDSK = getParametro('MAPTYPEDSK')
par_NOMBREPAIS = getParametro('NOMBREPAIS')


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
    // par_KEYGOOGLEMAPS = "AIzaSyD5Gmz5ibTIUDFeIlAjY1FwysQC1DM09Yc";
} catch (e) {
    console.error(e);
    par_KEYGOOGLEMAPS = "";
}

var loadingGoogleApi = false;

class GoogleGeoCode {
    GoogleGeoCode() {

    }
    geocode(location, callback) {
        if (location.hasOwnProperty('location')) {
            ValidaCache(location.location.lat(), location.location.lng(), function (datosDevueltos) {
                if (datosDevueltos != "") {
                    callback(datosDevueltos, "OK");
                }
            });
            var requestOptions = {
                method: 'GET',
            };

            const xhr = new XMLHttpRequest();

            xhr.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + location.location.lat() + "," + location.location.lng() + "&key=" + par_KEYGOOGLEMAPS);
            xhr.send();
            xhr.responseType = "json";
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const data = xhr.response;
                    callback(data.results, "OK")
                } else {
                    console.log();
                }
            };

        }
        else {
            if (location.hasOwnProperty('address')) {
                this.geocoder = new google.maps.Geocoder;
                this.geocoder.geocode({ address: location.address }, (results, status) => {
                    if (status === "OK") {
                        var resu = results[0];
                        var resultado = [{
                            formatted_address: resu.formatted_address,
                            address_components: {
                                short_name: '',
                                long_name: '',
                            },
                            geometry: {
                                location: { lat: parseFloat(resu.geometry.location.lat()), lng: parseFloat(resu.geometry.location.lng()) },
                            }
                        },
                        {
                            formatted_address: '',
                            address_components: {
                                short_name: '',
                                long_name: '',
                            },
                            geometry: {
                                location: { lat: 0, lng: 0 },
                            }
                        }];
                        callback(resultado, "OK");

                    }
                });
            }
        }
    }
}

class GeocoderApiFy {
    GeocoderApiFy() {

    }
    geocode(location, callback) {
        if (location.hasOwnProperty('location')) {
            ValidaCache(location.location.lat(), location.location.lng(), function (datosDevueltos) {
                if (datosDevueltos != "") {
                    callback(datosDevueltos, "OK");
                    return;
                }
            });

            var requestOptions = {
                method: 'GET',
            };


            const xhr = new XMLHttpRequest();
            xhr.open("GET", "https://api.geoapify.com/v1/geocode/reverse?lat=" + location.location.lat() + "&lon=" + location.location.lng() + "&apiKey=" + par_KEYGEOAPIFY);
            try {
                xhr.send();
                xhr.responseType = "json";
                var resultado = "";

                xhr.onload = () => {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        // dedalo 20203/06/14 agrego try por problema en cliente visto con mauro.
                        try {
                            const data = xhr.response;
                            resultado = [
                                {
                                    address_components: [
                                        {
                                            long_name: data.features[0].properties.housenumber,
                                            short_name: data.features[0].properties.housenumber,
                                            types: [
                                                "street_number"
                                            ]
                                        },
                                        {
                                            long_name: data.features[0].properties.street,
                                            short_name: data.features[0].properties.street,
                                            types: [
                                                "route"
                                            ]
                                        },
                                        {
                                            long_name: data.features[0].properties.suburb,
                                            short_name: data.features[0].properties.suburb,
                                            types: [
                                                "neighborhood",
                                                "political"
                                            ]
                                        },
                                        {
                                            long_name: data.features[0].properties.city,
                                            short_name: data.features[0].properties.city,
                                            types: [
                                                "sublocality",
                                                "political"
                                            ]
                                        },
                                        {
                                            long_name: data.features[0].properties.state,
                                            short_name: data.features[0].properties.state_code,
                                            types: [
                                                "administrative_area_level_2",
                                                "political"
                                            ]
                                        },
                                        {
                                            long_name: data.features[0].properties.state,
                                            short_name: data.features[0].properties.state_code,
                                            types: [
                                                "administrative_area_level_1",
                                                "political"
                                            ]
                                        },
                                        {
                                            long_name: data.features[0].properties.country,
                                            short_name: data.features[0].properties.country_code,
                                            types: [
                                                "country",
                                                "political"
                                            ]
                                        },
                                        {
                                            long_name: data.features[0].properties.postcode,
                                            short_name: data.features[0].properties.postcode,
                                            types: [
                                                "postal_code"
                                            ]
                                        }
                                    ],
                                    formatted_address: data.features[0].properties.formatted,
                                    geometry: {
                                        location: {
                                            lat: location.location.lat(),
                                            lng: location.location.lng()
                                        },
                                        location_type: "ROOFTOP",
                                        viewport: {
                                            northeast: {
                                                lat: "",
                                                lng: ""
                                            },
                                            southwest: {
                                                lat: "",
                                                lng: ""
                                            }
                                        }
                                    },
                                    place_id: data.features[0].properties.place_id,
                                    types: [
                                        "Feature"
                                    ]
                                }
                            ];
                        }
                        catch (e) {
                            console.log('error al validar cache');
                        }

                        callback(resultado, "OK")
                    } else {
                        resultado = [
                            {
                                address_components: [
                                    {
                                        long_name: "",
                                        short_name: "",
                                        types: [
                                            "street_number"
                                        ]
                                    },
                                    {
                                        long_name: "",
                                        short_name: "",
                                        types: [
                                            "route"
                                        ]
                                    },
                                    {
                                        long_name: "",
                                        short_name: "",
                                        types: [
                                            "neighborhood",
                                            "political"
                                        ]
                                    },
                                    {
                                        long_name: "",
                                        short_name: "",
                                        types: [
                                            "sublocality",
                                            "political"
                                        ]
                                    },
                                    {
                                        long_name: "",
                                        short_name: "",
                                        types: [
                                            "administrative_area_level_2",
                                            "political"
                                        ]
                                    },
                                    {
                                        long_name: "",
                                        short_name: "",
                                        types: [
                                            "administrative_area_level_1",
                                            "political"
                                        ]
                                    },
                                    {
                                        long_name: "",
                                        short_name: "",
                                        types: [
                                            "country",
                                            "political"
                                        ]
                                    },
                                    {
                                        long_name: "",
                                        short_name: "",
                                        types: [
                                            "postal_code"
                                        ]
                                    }
                                ],
                                formatted_address: "",
                                geometry: {
                                    location: {
                                        lat: location.location.lat(),
                                        lng: location.location.lng()
                                    },
                                    location_type: "ROOFTOP",
                                    viewport: {
                                        northeast: {
                                            lat: "",
                                            lng: ""
                                        },
                                        southwest: {
                                            lat: "",
                                            lng: ""
                                        }
                                    }
                                },
                                place_id: 0,
                                types: [
                                    "Feature"
                                ]
                            }
                        ];
                        callback(resultado, "OK");
                    }
                };
            }
            catch (e) {

            }

        }
        else {
            if (location.hasOwnProperty('address')) {
                const xhr2 = new XMLHttpRequest();
                xhr2.open("GET", "https://api.geoapify.com/v1/geocode/search?text=" + location.address + "&format=json&apiKey=" + par_KEYGEOAPIFY);
                try {
                    const dataResponse = data && data.results && data.results[0];
                    xhr2.send();
                    xhr2.responseType = "json";
                    xhr2.onload = () => {
                        if (xhr2.readyState == 4 && xhr2.status == 200) {
                            const data = xhr2.response;
                            var resultado = [{
                                formatted_address: dataResponse.formatted,
                                address_components: {
                                    short_name: dataResponse.street,
                                    long_name: dataResponse.street,
                                },
                                geometry: {
                                    location: { lat: parseFloat(dataResponse.lat), lng: parseFloat(dataResponse.lon) },
                                }
                            }];
                            callback(resultado, "OK")
                        } else {
                            console.log();
                        }
                    };
                }
                catch (e) {
                    var resultado = [{
                        formatted_address: '',
                        address_components: {
                            short_name: '',
                            long_name: '',
                        },
                        geometry: {
                            location: { lat: 0, lng: 0 },
                        }
                    }];
                    callback(resultado, "OK")
                }
            }
        }
    }
}

class HereApiFy {
    HereApiFy() {

    }
    geocode(location, callback) {
        if (location.hasOwnProperty('location')) {
            ValidaCache(location.location.lat(), location.location.lng(), function (datosDevueltos) {
                if (datosDevueltos != "") {
                    callback(datosDevueltos, "OK");
                    return;
                }
            });
            var requestOptions = {
                method: 'GET',
            };
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "https://revgeocode.search.hereapi.com/v1/revgeocode?at=" + location.location.lat() + "," + location.location.lng() + "&lang=es-AR&apiKey=" + par_KEYHERE);
            xhr.send();
            xhr.responseType = "json";
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    const data = xhr.response;
                    const dataResponse = data && data.items && data.items[0];
                    var resultado = [
                        {
                            address_components: [
                                {
                                    long_name: dataResponse.address.postalCode,
                                    short_name: dataResponse.address.postalCode,
                                    types: [
                                        "street_number"
                                    ]
                                },
                                {
                                    long_name: dataResponse.address.street,
                                    short_name: dataResponse.address.street,
                                    types: [
                                        "route"
                                    ]
                                },
                                {
                                    long_name: dataResponse.address.district,
                                    short_name: dataResponse.address.district,
                                    types: [
                                        "neighborhood",
                                        "political"
                                    ]
                                },
                                {
                                    long_name: dataResponse.address.city,
                                    short_name: dataResponse.address.city,
                                    types: [
                                        "sublocality",
                                        "political"
                                    ]
                                },
                                {
                                    long_name: dataResponse.address.state,
                                    short_name: dataResponse.address.stateCode,
                                    types: [
                                        "administrative_area_level_2",
                                        "political"
                                    ]
                                },
                                {
                                    long_name: dataResponse.address.state,
                                    short_name: dataResponse.address.stateCode,
                                    types: [
                                        "administrative_area_level_1",
                                        "political"
                                    ]
                                },
                                {
                                    long_name: dataResponse.address.countryName,
                                    short_name: dataResponse.address.countryCode,
                                    types: [
                                        "country",
                                        "political"
                                    ]
                                },
                                {
                                    long_name: dataResponse.address.postalCode,
                                    short_name: dataResponse.address.postalCode,
                                    types: [
                                        "postal_code"
                                    ]
                                }
                            ],
                            formatted_address: dataResponse.address.label,
                            geometry: {
                                location: {
                                    lat: location.location.lat(),
                                    lng: location.location.lng()
                                },
                                location_type: "ROOFTOP",
                                viewport: {
                                    northeast: {
                                        lat: "",
                                        lng: ""
                                    },
                                    southwest: {
                                        lat: "",
                                        lng: ""
                                    }
                                }
                            },
                            place_id: dataResponse.id,
                            types: [
                                "Feature"
                            ]
                        }
                    ];
                    callback(resultado, "OK")
                } else {
                    console.log();
                }
            };

        }
        else {
            if (location.hasOwnProperty('address')) {
                const xhr2 = new XMLHttpRequest();
                xhr2.open("GET", "https://geocode.search.hereapi.com/v1/geocode?q=" + location.address + "&apiKey=" + par_KEYHERE);
                xhr2.send();
                xhr2.responseType = "json";
                xhr2.onload = () => {
                    if (xhr2.readyState == 4 && xhr2.status == 200) {
                        const data = xhr2.response;
                        const dataResponse = data && data.items && data.items[0];
                        var resultado = [{
                            formatted_address: dataResponse.address.label,
                            address_components: {
                                short_name: dataResponse.countryCode,
                                long_name: dataResponse.countryName,
                            },
                            geometry: {
                                location: { lat: parseFloat(dataResponse.position.lat), lng: parseFloat(dataResponse.position.lng) },
                            }
                        }];
                        callback(resultado, "OK")
                    } else {
                        console.log();
                    }
                };
            }
        }
    }
}
function isXML(str) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(str, "text/xml");
    return xmlDoc.getElementsByTagName("parsererror").length === 0;
}
function ValidaCache(lat, lng) {
    var data1 = "";
    var data = "";
    var resultado = "";

    Ext.Ajax.request({
        url: '/Rest/Search/GeocoderSearch?Lat=' + lat + '&Lng=' + lng,
        //url: '/rest/Search/GeocoderSearch?Lat=-31.3882122&Lng=-64.2121255',
        method: 'GET',
        async: false,
        success: function (response) {
            data1 = Ext.JSON.decode(response.responseText);
            if (data1.rows == 0)
                return "";
            /***********Daniel O. Medina 17/04/2023 https://softguard.atlassian.net/browse/DSS-627*/
            if (data1.rows.length == 0) {
                return "";
            } else {
                /****************************** */
                try {
                    if (isXML(data1.rows[0] ? data1.rows[0].DataXML : "")) {

                        var parser = new DOMParser();
                        var xmlDoc = parser.parseFromString(data1.rows[0] ? data1.rows[0].DataXML : "", "text/xml");

                        var result = xmlDoc.getElementsByTagName("result")[0];
                        var place_id = xmlDoc.getElementsByTagName("place_id")[0];
                        var nameElement = result.getElementsByTagName("formatted_address")[0];
                        var street_number = "";
                        var route = "";
                        var neighborhood = "";
                        var locality = "";
                        var administrative_area_level_2 = "";
                        var administrative_area_level_1 = "";
                        var country = "";

                        const x = xmlDoc.getElementsByTagName("address_component");
                        for (let i = 0; i < x.length; i++) {
                            const type = x[i].getElementsByTagName("type")[0].childNodes[0].nodeValue;
                            const long_name = x[i].getElementsByTagName("long_name")[0].childNodes[0].nodeValue;
                            switch (type) {
                                case "street_number":
                                    street_number = long_name;
                                    break;
                                case "route":
                                    route = long_name;
                                    break;
                                case "neighborhood":
                                    rouneighborhoodte = long_name;
                                    break;
                                case "locality":
                                    locality = long_name;
                                    break;
                                case "administrative_area_level_2":
                                    administrative_area_level_2 = long_name;
                                    break;
                                case "administrative_area_level_1":
                                    administrative_area_level_1 = long_name;
                                    break;
                                case "country":
                                    country = long_name;
                                    break;
                            }
                        }

                        resultado = [
                            {
                                address_components: [
                                    {
                                        long_name: street_number,
                                        short_name: street_number,
                                        types: [
                                            "street_number"
                                        ]
                                    },
                                    {
                                        long_name: route,
                                        short_name: route,
                                        types: [
                                            "route"
                                        ]
                                    },
                                    {
                                        long_name: rouneighborhoodte,
                                        short_name: rouneighborhoodte,
                                        types: [
                                            "neighborhood",
                                            "political"
                                        ]
                                    },
                                    {
                                        long_name: locality,
                                        short_name: locality,
                                        types: [
                                            "sublocality",
                                            "political"
                                        ]
                                    },
                                    {
                                        long_name: administrative_area_level_2,
                                        short_name: administrative_area_level_2,
                                        types: [
                                            "administrative_area_level_2",
                                            "political"
                                        ]
                                    },
                                    {
                                        long_name: administrative_area_level_1,
                                        short_name: administrative_area_level_1,
                                        types: [
                                            "administrative_area_level_1",
                                            "political"
                                        ]
                                    },
                                    {
                                        long_name: country,
                                        short_name: country,
                                        types: [
                                            "country",
                                            "political"
                                        ]
                                    },
                                    {
                                        long_name: "",
                                        short_name: "",
                                        types: [
                                            "postal_code"
                                        ]
                                    }
                                ],
                                formatted_address: nameElement,
                                geometry: {
                                    location: {
                                        lat: lat,
                                        lng: lng
                                    },
                                    location_type: "",
                                    viewport: {
                                        northeast: {
                                            lat: "",
                                            lng: ""
                                        },
                                        southwest: {
                                            lat: "",
                                            lng: ""
                                        }
                                    }
                                },
                                place_id: place_id,
                                types: [
                                    "Feature"
                                ]
                            }
                        ];
                        callback(resultado);
                    }
                    else {
                        data = Ext.JSON.decode(data1.rows[0] ? data1.rows[0].DataXML : "");
                        resultado = [
                            {
                                address_components: [
                                    {
                                        long_name: data.items[0].address.houseNumber,
                                        short_name: data.items[0].address.houseNumber,
                                        types: [
                                            "street_number"
                                        ]
                                    },
                                    {
                                        long_name: data.items[0].address.street,
                                        short_name: data.items[0].address.street,
                                        types: [
                                            "route"
                                        ]
                                    },
                                    {
                                        long_name: data.items[0].address.district,
                                        short_name: data.items[0].address.district,
                                        types: [
                                            "neighborhood",
                                            "political"
                                        ]
                                    },
                                    {
                                        long_name: data.items[0].address.city,
                                        short_name: data.items[0].address.city,
                                        types: [
                                            "sublocality",
                                            "political"
                                        ]
                                    },
                                    {
                                        long_name: data.items[0].address.state,
                                        short_name: data.items[0].address.stateCode,
                                        types: [
                                            "administrative_area_level_2",
                                            "political"
                                        ]
                                    },
                                    {
                                        long_name: data.items[0].address.state,
                                        short_name: data.items[0].address.stateCode,
                                        types: [
                                            "administrative_area_level_1",
                                            "political"
                                        ]
                                    },
                                    {
                                        long_name: data.items[0].address.countryName,
                                        short_name: data.items[0].address.countryCode,
                                        types: [
                                            "country",
                                            "political"
                                        ]
                                    },
                                    {
                                        long_name: data.items[0].address.postalCode,
                                        short_name: data.items[0].address.postalCode,
                                        types: [
                                            "postal_code"
                                        ]
                                    }
                                ],
                                formatted_address: data.items[0].title,
                                geometry: {
                                    location: {
                                        lat: lat,
                                        lng: lng
                                    },
                                    location_type: "",
                                    viewport: {
                                        northeast: {
                                            lat: "",
                                            lng: ""
                                        },
                                        southwest: {
                                            lat: "",
                                            lng: ""
                                        }
                                    }
                                },
                                place_id: data.items[0].id,
                                types: [
                                    "Feature"
                                ]
                            }
                        ];

                        callback(resultado);
                    }
                }
                catch (e) {
                    console.log('error en validacache')
                }
            }

        }
    });

}
/* =====================================================================
 * DSS-1532: reemplazo del google.maps.drawing.DrawingManager (deprecado
 * por Google en Maps JS API v3.65, mayo 2026) por un wrapper respaldado
 * en Terra Draw (https://terradraw.io).
 *
 * Diseño: se hace un POLYFILL de google.maps.drawing. Como Google solo
 * removio la herramienta de dibujo (DrawingManager) pero google.maps.Circle
 * y google.maps.Polygon siguen existiendo, el wrapper captura el dibujo con
 * Terra Draw y EMITE figuras NATIVAS (Circle/Polygon/Polyline/Marker). Asi
 * los controllers de geocercas no cambian: siguen recibiendo en
 * 'overlaycomplete' una google.maps.Circle real con .getCenter()/.radius, etc.
 * El mapeo circulo<->poligono GeoJSON queda encapsulado aca, reutilizable.
 * ===================================================================== */
(function () {

    // Vendorizado en /utils/ del server (los CDN externos estan bloqueados en GCS y clientes).
    var TD_CORE = '/utils/terra-draw.umd.js';
    var TD_GMAP = '/utils/terra-draw-google-maps-adapter.umd.js';

    var tdLoading = false, tdCallbacks = [];

    function tdAvailable() {
        return !!(window.terraDraw && window.terraDraw.TerraDraw && window.terraDraw.TerraDrawGoogleMapsAdapter);
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

    function localeSafe(s) { try { return (typeof getLocale === 'function') ? getLocale(s) : s; } catch (e) { return s; } }

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
        try {
            this._td = new TD.TerraDraw({
                adapter: new TD.TerraDrawGoogleMapsAdapter({ lib: google.maps, map: map, coordinatePrecision: 9 }),
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
            b.textContent = localeSafe(labels[m] || m);
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

})();

/* ============================================================================
 * DSS-1537 — Polyfill de google.maps.visualization.HeatmapLayer
 * ----------------------------------------------------------------------------
 * El polyfill (window.installSgHeatmapPolyfill) se MOVIO a un archivo propio:
 *   apps/SgAppMapGuardWeb/resources/SgHeatmapPolyfill.js
 * cargado via el array "js" del app.json (como MarkerClusterer.js), porque el
 * build de Sencha NO incluia el IIFE suelto que vivia aca.
 * Aca solo queda la llamada en apiReady() (mas abajo), protegida con typeof,
 * asi otras apps que usen este GMapPanel6 sin el polyfill no se rompen.
 * ==========================================================================*/

/* ImgMapType class
        //////////////////////////////////
        */

Ext.define('Ext.ux.GMapPanel6', {
    extend: 'Ext.Component',

    alias: 'widget.gmappanel6',

    requires: ['Ext.window.MessageBox'],

    border: false,
    listeners: {
        resize: function () {
            //prueba dia 16/08/2016 (problemas de callstack, no para disparar resize el mapa)
            if (typeof arguments[1] !== "object") {
                this.onResize(arguments);
            }
        }
    },
    respErrors: [{
        code: 'UNKNOWN_ERROR',
        msg: getLocale('A geocoding or directions request could not be successfully processed, yet the exact reason for the failure is not known.')
    }, {
        code: 'ERROR',
        msg: getLocale('There was a problem contacting the Google servers.')
    }, {
        code: 'ZERO_RESULTS',
        msg: getLocale('The request did not encounter any errors but returns zero results.')
    }, {
        code: 'INVALID_REQUEST',
        msg: getLocale('This request was invalid.')
    }, {
        code: 'REQUEST_DENIED',
        msg: getLocale('The webpage is not allowed to use the geocoder for some reason.')
    }, {
        code: 'OVER_QUERY_LIMIT',
        msg: getLocale('The webpage has gone over the requests limit in too short a period of time.')
    }],

    locationTypes: [{
        level: 4,
        code: 'ROOFTOP',
        msg: getLocale('The returned result is a precise geocode for which we have location information accurate down to street address precision.')
    }, {
        level: 3,
        code: 'RANGE_INTERPOLATED',
        msg: getLocale('The returned result reflects an approximation (usually on a road) interpolated between two precise points (such as intersections). Interpolated results are generally returned when rooftop geocodes are unavailable for a street address.')
    }, {
        level: 2,
        code: 'GEOMETRIC_CENTER',
        msg: getLocale('The returned result is the geometric center of a result such as a polyline (for example, a street) or polygon (region).')
    }, {
        level: 1,
        code: 'APPROXIMATE',
        msg: getLocale('The returned result is approximate.')
    }],

    respErrorTitle: getLocale('Error'),

    geoErrorMsgUnable: getLocale('Unable to Locate the Address you provided'),

    geoErrorTitle: getLocale('Address Location Error'),

    geoErrorMsgAccuracy: getLocale('The address provided has a low accuracy.<br><br>"{0}" Accuracy.<br><br>{1}'),


    gmapType: 'map',
    mapReady: false,
    zoomLevel: 2,
    yaw: 180,
    pitch: 0,

    displayGeoErrors: false,

    minGeoAccuracy: 'ROOFTOP',

    mapDefined: false,
    // private
    mapDefinedGMap: false,
    initComponent: function () {



        Ext.applyIf(this, {
            markers: [],
            cache: {
                marker: [],
                polyline: [],
                infowindow: [],
                circle: []
            }
        });

        this.callParent();

        // Varias instancias de gmappanel6 se construyen en simultaneo al iniciar la app
        // (SerTecController.initview crea todos los tabs de una, deferredRender solo difiere
        // el pintado en DOM, no la construccion). Sin esta cola, cada instancia inyecta su
        // propio <script>, y solo la ultima en resolver "gana" el callback global.
        if (window.google && window.google.maps) {
            this.on('afterrender', this.apiReady, this);
        } else if (window.__gmapsLoading) {
            window.__gmapsLoadingCallbacks.push(Ext.Function.bind(this.apiReady, this));
        } else {
            window.__gmapsLoading = true;
            window.__gmapsLoadingCallbacks = [Ext.Function.bind(this.apiReady, this)];
            window.gmapapiready = function () {
                window.__gmapsLoadingCallbacks.forEach(function (cb) { cb(); });
            };
            //var script = '//maps.google.com/maps/api/js?v=3.17&callback=gmapapiready&libraries=drawing,visualization';
            // DSS-1532: Google removio 'drawing' (DrawingManager) en v3.65 -> geocercas por Terra Draw.
            // DSS-1537: Google decomisiono HeatmapLayer (unica clase de 'visualization' que usa MapGuard)
            //           en v3.65; cargar 'visualization' instala un getter que TIRA al load. Como el
            //           HeatMap ahora va por polyfill propio (mas abajo), saco la libreria por completo.
            var script = '//maps.google.com/maps/api/js?callback=gmapapiready';

            if (_UserData && _UserData && _UserData.metadata && _UserData.metadata.language) {
                script += '&language=' + _UserData.metadata.language.slice(0, 2);
            }

            if (par_KEYGOOGLEMAPS) {
                this.key = par_KEYGOOGLEMAPS;
            }

            if (this.key) {
                script = script + '&key=' + this.key;
            }
            this.buildScriptTag(script);


            //var zoom = 'http://gmaps-utility-library.googlecode.com/svn/trunk/dragzoom/release/src/dragzoom.js';
            //this.buildScriptTag(zoom);
        }

    },
    apiReady: function () {
        // DSS-1532: instalo el polyfill de google.maps.drawing (Terra Draw) apenas
        // esta disponible google.maps, y precargo la libreria para que este lista
        // cuando el usuario abra el form de geocercas.
        if (typeof installSgDrawingPolyfill === 'function') { installSgDrawingPolyfill(); }
        if (typeof ensureTerraDraw === 'function') { ensureTerraDraw(); }
        // DSS-1537: Google decomisiono google.maps.visualization.HeatmapLayer (mayo 2026);
        // instalo el polyfill propio (canvas) para que el HeatMap de MapGuard siga funcionando.
        if (typeof installSgHeatmapPolyfill === 'function') { installSgHeatmapPolyfill(); }

        if (par_LABELMOVILTRACKVIEW == 1) {
            //this.buildScriptTag('/handler/markerwithlabel');
        }

        if (this.rendered) {

            Ext.defer(function () {

                var mapTypeIds = [];
                for (var type in google.maps.MapTypeId) {
                    mapTypeIds.push(google.maps.MapTypeId[type]);
                }


                mapTypeIds.push("OSM");

                this.gmap = new google.maps.Map(this.getEl().dom, {
                    zoom: this.zoomLevel,
                    //mapTypeId: google.maps.MapTypeId.TERRAIN, 
                    //mapTypeId: "OSM",
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                        //style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        mapTypeIds: mapTypeIds
                    }
                });

                var map = this.gmap;


                this.gmap.mapTypes.set("OSM", new google.maps.ImageMapType({
                    getTileUrl: function (coord, zoom) {
                        return "//a.tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
                    },
                    tileSize: new google.maps.Size(256, 256),
                    alt: getLocale("Open Streetmap"),
                    name: getLocale("OpenStreet"),
                    maxZoom: 18
                }));


                if (UiApplicationMetadata.MapType && UiApplicationMetadata.MapType == "CUSTOM") {
                    mapTypeIds.push("CUSTOM");
                    var mapBounds = new google.maps.LatLngBounds(
                        new google.maps.LatLng(-85.051129, -180.000000),
                        new google.maps.LatLng(85.051129, 179.990161));
                    var mapMinZoom = 0;
                    var mapMaxZoom = 5;
                    this.gmap.mapTypes.set("CUSTOM", new google.maps.ImageMapType({
                        getTileUrl: function (coord, zoom) {
                            var proj = map.getProjection();
                            var z2 = Math.pow(2, zoom);
                            var tileXSize = 256 / z2;
                            var tileYSize = 256 / z2;
                            var tileBounds = new google.maps.LatLngBounds(
                                proj.fromPointToLatLng(new google.maps.Point(coord.x * tileXSize, (coord.y + 1) * tileYSize)),
                                proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * tileXSize, coord.y * tileYSize))
                            );
                            var y = coord.y;
                            var x = coord.x;
                            //var x = coord.x >= 0 ? coord.x : z2 + coord.x;
                            if (coord.x >= z2 || coord.x < 0 || coord.y >= z2 || coord.y < 0) {
                                return "/custommap/none.png";
                            }
                            else if (coord.x >= 0 && mapBounds.intersects(tileBounds) && (mapMinZoom <= zoom) && (zoom <= mapMaxZoom))
                                return "/custommap/tile_" + zoom + "_" + x + "-" + y + ".png";
                            else
                                return "/custommap/none.png";
                        },
                        tileSize: new google.maps.Size(256, 256),
                        isPng: true,
                        alt: getLocale("Custom"),
                        name: getLocale("Custom"),
                        maxZoom: 5,
                        minZoom: 2,
                        opacity: 1.0
                    }));
                    this.gmap.setMapTypeId('CUSTOM');
                    this.gmap.setOptions({ mapTypeControl: false });
                }
                this.mapDefined = true;
                this.mapDefinedGMap = true;

                google.maps.event.addListenerOnce(this.getMap(), 'tilesloaded', Ext.Function.bind(this.onMapReady, this));
                google.maps.event.addListener(this.getMap(), 'dragend', Ext.Function.bind(this.dragEnd, this));
                google.maps.event.addListener(this.getMap(), 'zoom_changed', Ext.Function.bind(this.zoom_changed, this));

                if (typeof this.setCenter === 'object') {
                    if (typeof this.setCenter.geoCodeAddr === 'string') {
                        this.geoCodeLookup(this.setCenter.geoCodeAddr, this.setCenter.marker, false, true, this.setCenter.listeners);
                    } else {
                        if (this.gmapType === 'map') {
                            var point = new google.maps.LatLng(this.setCenter.lat, this.setCenter.lng);
                            this.getMap().setCenter(point, this.zoomLevel);
                            this.lastCenter = point;
                        }
                        if (typeof this.setCenter.marker === 'object' && typeof point === 'object') {
                            this.addMarker(point, this.setCenter.marker, this.setCenter.marker.clear, true, this.setCenter.listeners);
                        }
                    }
                    if (this.gmapType === 'panorama') {
                        this.getMap().setLocationAndPOV(new google.maps.LatLng(this.setCenter.lat, this.setCenter.lng), { yaw: this.yaw, pitch: this.pitch, zoom: this.zoomLevel });
                    }
                } else {

                    if (_UserData && _UserData.metadata && _UserData.metadata.provincia && _UserData.metadata.provincia.nombre != '') {
                        par_NOMBREPAIS = _UserData.metadata.provincia.nombre
                    }
                    this.geoCodeLookup(par_NOMBREPAIS, undefined, false, true);
                    //this.centerOnClientLocation();
                }
            }, 200, this); // Ext.defer

        } else {
            this.on('afterrender', this.apiReady, this);
        }

        // agrego getBounds a polyline
        if (!google.maps.Polyline.prototype.getBounds)
            google.maps.Polyline.prototype.getBounds = function () {
                var bounds = new google.maps.LatLngBounds();
                this.getPath().forEach(function (latlng) { bounds.extend(latlng); });
                return bounds;
            }

    },
    // private
    afterRender: function () {
        /*
        var wh = this.ownerCt.getSize();
        Ext.applyIf(this, wh);
          */

        this.callParent(arguments);
    },
    // private
    buildScriptTag: function (filename, callback) {
        var script = document.createElement('script'),
            head = document.getElementsByTagName("head")[0];
        script.type = "text/javascript";
        script.src = filename;

        return head.appendChild(script);
    },


    // private
    onMapReady: function () {
        if (!google.maps.Polygon.prototype.getBounds) {
            google.maps.Polygon.prototype.getBounds = function (latLng) {
                var bounds = new google.maps.LatLngBounds();
                var paths = this.getPaths();
                var path;
                for (var p = 0; p < paths.getLength(); p++) {
                    path = paths.getAt(p);
                    for (var i = 0; i < path.getLength(); i++) {
                        bounds.extend(path.getAt(i));
                    }
                }
                return bounds;
            }
        }
        this.addMapControls();
        this.addOptions();

        this.addMarkers(this.markers);
        this.addMapListeners();



        if (par_MAPTYPEDSK) {
            this.getMap().setMapTypeId(par_MAPTYPEDSK);
        }

        if (UiApplicationMetadata.MapType && UiApplicationMetadata.MapType == "CUSTOM") {
            this.getMap().setMapTypeId("CUSTOM");
            this.freezoom = true;
        }

        this.mapReady = true;
        // SerTecMapGpsController y otros escuchan 'mapready' como unico disparador
        // para cargar posiciones/geocercas; sin este evento se quedan esperando
        // para siempre, sin error en consola.
        this.fireEvent('mapready', this, this.getMap());
        return this;
    },
    // private
    addMapListeners: function () {
        if (this.maplisteners) {
            Ext.iterate(this.maplisteners, function (key, val) {
                google.maps.event.addListener(this.getMap(), key, Ext.Function.bind(val, this));
            }, this);
        }
    },
    // private
    onResize: function (w, h) {
        this.callParent(arguments);
        // check for the existance of the google map in case the onResize fires too early
        if (typeof this.getMap() == 'object') {
            google.maps.event.trigger(this.getMap(), 'resize');
            this.zoom_changed();
            /*if (this.lastCenter){
              this.getMap().setCenter(this.lastCenter, this.zoomLevel);
            }*/
        }

    },
    // private
    setSize: function (width, height, animate) {
        this.callParent(arguments);
        // check for the existance of the google map in case setSize is called too early
        if (Ext.isObject(this.getMap())) {
            google.maps.event.trigger(this.getMap(), 'resize');
            if (this.lastCenter) {
                this.getMap().setCenter(this.lastCenter, this.zoomLevel);
            }
        }

    },
    // private
    dragEnd: function () {
        this.lastCenter = this.getMap().getCenter();
        this.fireEvent('manualcenter', this);
    },

    zoom_changed: function () {
        // no hago nada
        if (this.freezoom)
            return true;

        var gmap = this.getMap();
        var GLOBE_WIDTH = 256; // a constant in Google's map projection
        var west = 180;
        var east = -180;
        var angle = east - west;
        var lastzoom = gmap.getZoom();


        if (angle < 0) {
            angle += 360;
        }
        var maxzoom = Math.round(Math.log(this.getWidth() / GLOBE_WIDTH) / Math.LN2);
        if (lastzoom <= maxzoom && maxzoom > 0 && isFinite(maxzoom) && !this.forceZoom) {
            gmap.setZoom(maxzoom + 1);
        }
        this.forceZoom = false;
    },

    getMap: function () {

        return this.gmap;

    },

    getCenter: function () {

        return this.getMap().getCenter();

    },

    getCenterLatLng: function () {

        var ll = this.getCenter();
        return { lat: ll.lat(), lng: ll.lng() };

    },

    addMarkers: function (markers) {
        if (Ext.isArray(markers)) {
            for (var i = 0; i < markers.length; i++) {
                if (markers[i]) {
                    if (typeof markers[i].geoCodeAddr == 'string') {
                        this.geoCodeLookup(markers[i].geoCodeAddr, markers[i], false, markers[i].setCenter, markers[i].listeners);
                    } else {
                        var mkr_point = new google.maps.LatLng(markers[i].lat, markers[i].lng);
                        //console.log(mkr_point, i);
                        this.addMarker(mkr_point, markers[i], false, markers[i].setCenter, markers[i].listeners);
                    }
                }
            }
        }

    },

    addMarker: function (point, marker, clear, center, listeners) {

        Ext.applyIf(marker, {});

        if (clear === true) {
            this.clearMarkers();
        }
        if (center === true) {
            this.getMap().setCenter(point, this.zoomLevel)
            this.lastCenter = point;
        }


        if (typeof (MarkerWithLabel) == 'function') {
            var mark = new MarkerWithLabel(Ext.apply(marker, {
                position: point
            }));
        } else {
            var mark = new google.maps.Marker(Ext.apply(marker, {
                position: point,
                optimized: false
            }));
        }

        if (marker.infoWindow) {
            this.createInfoWindow(marker.infoWindow, point, mark);
        }

        this.cache.marker.push(mark);
        mark.setMap(this.getMap());

        if (typeof listeners === 'object') {
            for (evt in listeners) {
                google.maps.event.addListener(mark, evt, listeners[evt]);
            }
        }

        if (marker.record) {
            marker.record.marker = mark;
        }

        //console.log(mark);
        return mark;

    },

    addPolyline: function (points, linestyle) {

        var plinepnts = new google.maps.MVCArray, pline, linestyle = linestyle ? linestyle : {
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        };

        Ext.each(points, function (point) {
            plinepnts.push(new google.maps.LatLng(point.lat, point.lng));
        }, this);

        var pline = new google.maps.Polyline(Ext.apply({
            path: plinepnts
        }, linestyle));

        this.cache.polyline.push(pline);

        pline.setMap(this.getMap());

    },

    createInfoWindow: function (inwin, point, marker) {
        var listener = 'click';
        var me = this, infoWindow = new google.maps.InfoWindow({
            content: inwin.content,
            position: point,
            disableAutoPan: inwin.disableAutoPan
        });

        if (inwin.listener) { listener = inwin.listener };

        if (marker) {
            google.maps.event.addListener(marker, listener, function () {
                me.hideAllInfoWindows();
                infoWindow.open(me.getMap(), marker);
            });
        }

        this.cache.infowindow.push(infoWindow);

        return infoWindow;

    },
    // private
    hideAllInfoWindows: function () {
        for (var i = 0; i < this.cache.infowindow.length; i++) {
            this.cache.infowindow[i].close();
        }
    },
    // private
    clearMarkers: function () {
        this.hideAllInfoWindows();
        this.hideMarkers();
        this.hideCircle();
        this.hidePolylines();
    },

    // private
    hidePolylines: function () {
        Ext.each(this.cache.polyline, function (mrk) {
            mrk.setMap(null);
        });
    },

    // private
    hideMarkers: function () {
        Ext.each(this.cache.marker, function (mrk) {
            mrk.setMap(null);
        });
    },// private
    hideCircle: function () {
        Ext.each(this.cache.circle, function (mrk) {
            mrk.setMap(null);
        });
    },
    // private
    showMarkers: function () {
        Ext.each(this.cache.marker, function (mrk) {
            mrk.setMap(this.getMap());
        }, this);
    },
    // private
    addMapControls: function () {
        var map = this.getMap();

        if (this.gmapType === 'map') {
            if (Ext.isArray(this.mapControls)) {
                for (i = 0; i < this.mapControls.length; i++) {
                    this.addMapControl(this.mapControls[i]);
                }
            } else if (typeof this.mapControls === 'string') {
                this.addMapControl(this.mapControls);
            } else if (typeof this.mapControls === 'object') {
                this.getMap().add_control(this.mapControls);
            }
        }

    },

    addMapControl: function (mc) {

        var mcf = window[mc];
        if (typeof mcf === 'function') {
            this.getMap().addControl(new mcf());
        }

    },
    // private
    addOptions: function () {
        this.getMap().setOptions(this.mapConfOpts);
    },

    addOption: function (mo) {

        var mof = this.getMap()[mo];
        if (typeof mof === 'function') {
            this.getMap()[mo]();
        }

    },

    geoCodeLookup: function (n, t, i, r, u) {
        this.geocoder || (this.geocoder = this.getGeocoder());
        if (this.geocoder && !this.geocoderKeyMissing) {
            this.geocoder.geocode({
                address: n
            }, Ext.Function.bind(this.addAddressToMap, this, [n, t, i, r, u], !0))
        }

    },
    getGeocoder: function () {
        //return new GoogleGeoCode();

        //var
        if (par_GEOCODINGPROVIDER == null) {
            par_GEOCODINGPROVIDER = 1;
        }
        if (par_GEOCODINGPROVIDER == 1) {
            //return this.geocoder || ( this.geocoder = new google.maps.Geocoder ),
            //    this.geocoder
            return new GoogleGeoCode();
        }
        if (par_GEOCODINGPROVIDER == 2) {
            return new GeocoderApiFy();
        }
        if (par_GEOCODINGPROVIDER == 3) {
            return new HereApiFy();
        }

    },

    // private 
    centerOnClientLocation: function () {
        this.getClientLocation(function (loc) {
            var point = new google.maps.LatLng(loc.latitude, loc.longitude);
            this.getMap().setCenter(point, this.zoomLevel);
            this.lastCenter = point;
        });
    },
    // private
    getClientLocation: function (fn, errorFn) {
        if (!errorFn) {
            errorFn = Ext.emptyFn;
        }
        if (!this.clientGeo) {
            this.clientGeo = google.gears.factory.create('beta.geolocation');
        }
        geo.getCurrentPosition(Ext.Function.bind(fn, this), errorFn);
    },
    // private
    addAddressToMap: function (response, status, addr, marker, clear, center, listeners) {
        if (!response || status !== 'OK') {
            this.respErrorMsg(status);
        } else {
            var place = response[0].geometry.location,
                accuracy = this.getLocationTypeInfo(response[0].geometry.location_type, 'level'),
                reqAccuracy = this.getLocationTypeInfo(this.minGeoAccuracy, 'level');
            if (accuracy === 0) {
                this.geoErrorMsg(this.geoErrorTitle, this.geoErrorMsgUnable);
            } else {/*
                        if (accuracy < reqAccuracy) {
                            this.geoErrorMsg(this.geoErrorTitle, Ext.String.format(this.geoErrorMsgAccuracy, response[0].geometry.location_type, this.getLocationTypeInfo(response[0].geometry.location_type,'msg')));
                            console.log(accuracy,reqAccuracy)
                        }else{*/
                point = new google.maps.LatLng(place.lat(), place.lng());
                if (center) {
                    this.getMap().setCenter(point, this.zoomLevel);
                    this.lastCenter = point;
                }
                if (typeof marker === 'object') {
                    if (!marker.title) {
                        marker.title = response.formatted_address;
                    }
                    var mkr = this.addMarker(point, marker, clear, false, listeners);
                    if (marker.callback) {
                        marker.callback.call(this, mkr, point);
                    }
                }
                //}
            }
        }

    },
    // private
    geoErrorMsg: function (title, msg) {
        if (this.displayGeoErrors) {
            Ext.MessageBox.alert(title, msg);
        }
    },
    // private
    respErrorMsg: function (code) {
        Ext.each(this.respErrors, function (obj) {
            if (code == obj.code) {
                Ext.MessageBox.alert(this.respErrorTitle, obj.msg);
            }
        }, this);
    },
    // private
    getLocationTypeInfo: function (location_type, property) {
        var val = 0;
        Ext.each(this.locationTypes, function (itm) {
            if (itm.code === location_type) {
                val = itm[property];
            }
        });
        return val;
    }
});